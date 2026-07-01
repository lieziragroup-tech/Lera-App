import { collection, addDoc, query, where, onSnapshot, serverTimestamp, DocumentData } from "firebase/firestore";
import { db } from "./firebase";

export type OrderItem = { name: string; qty: number; price: number };

export type Order = {
  id: string;
  uid: string;
  userName: string;
  items: OrderItem[];
  total: number;
  co2Saved: number;
  points: number;
  status: "pending_whatsapp" | "confirmed";
  createdAt: Date | null;
};

export type ReturnSize = "S" | "M" | "L";

export type ReturnEntry = {
  id: string;
  uid: string;
  userName: string;
  size: ReturnSize;
  qty: number;
  points: number;
  co2Saved: number;
  createdAt: Date | null;
};

// Estimated impact per unit — used to compute CO2 saved / points earned.
const CO2_PER_ORDER_UNIT_KG = 0.3; // per box purchased, vs. a disposable plastic equivalent
const POINTS_PER_ORDER_UNIT = 15;

const RETURN_POINTS_PER_SIZE: Record<ReturnSize, number> = { S: 15, M: 20, L: 30 };
const RETURN_CO2_PER_SIZE: Record<ReturnSize, number> = { S: 0.15, M: 0.2, L: 0.3 };

function toOrder(id: string, data: DocumentData): Order {
  return {
    id,
    uid: data.uid,
    userName: data.userName,
    items: data.items || [],
    total: data.total || 0,
    co2Saved: data.co2Saved || 0,
    points: data.points || 0,
    status: data.status || "pending_whatsapp",
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
  };
}

function toReturnEntry(id: string, data: DocumentData): ReturnEntry {
  return {
    id,
    uid: data.uid,
    userName: data.userName,
    size: data.size,
    qty: data.qty || 1,
    points: data.points || 0,
    co2Saved: data.co2Saved || 0,
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
  };
}

/** Creates a real order document in Firestore and returns it (with a client-side timestamp for immediate UI use). */
export async function createOrder(params: { uid: string; userName: string; items: OrderItem[] }): Promise<Order> {
  const totalUnits = params.items.reduce((sum, i) => sum + i.qty, 0);
  const total = params.items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const co2Saved = +(totalUnits * CO2_PER_ORDER_UNIT_KG).toFixed(2);
  const points = totalUnits * POINTS_PER_ORDER_UNIT;

  const docRef = await addDoc(collection(db, "orders"), {
    uid: params.uid,
    userName: params.userName,
    items: params.items,
    total,
    co2Saved,
    points,
    status: "pending_whatsapp",
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    uid: params.uid,
    userName: params.userName,
    items: params.items,
    total,
    co2Saved,
    points,
    status: "pending_whatsapp",
    createdAt: new Date(),
  };
}

/** Creates a real packaging-return document in Firestore and returns it. */
export async function createReturn(params: {
  uid: string;
  userName: string;
  size: ReturnSize;
  qty: number;
}): Promise<ReturnEntry> {
  const points = RETURN_POINTS_PER_SIZE[params.size] * params.qty;
  const co2Saved = +(RETURN_CO2_PER_SIZE[params.size] * params.qty).toFixed(2);

  const docRef = await addDoc(collection(db, "returns"), {
    uid: params.uid,
    userName: params.userName,
    size: params.size,
    qty: params.qty,
    points,
    co2Saved,
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    uid: params.uid,
    userName: params.userName,
    size: params.size,
    qty: params.qty,
    points,
    co2Saved,
    createdAt: new Date(),
  };
}

/** Realtime subscription to the signed-in user's orders (newest first). */
export function subscribeUserOrders(uid: string, cb: (orders: Order[]) => void) {
  const q = query(collection(db, "orders"), where("uid", "==", uid));
  return onSnapshot(
    q,
    (snap) => {
      const orders = snap.docs.map((d) => toOrder(d.id, d.data()));
      orders.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      cb(orders);
    },
    (err) => {
      console.error("subscribeUserOrders failed:", err);
      cb([]);
    }
  );
}

/** Realtime subscription to the signed-in user's packaging returns (newest first). */
export function subscribeUserReturns(uid: string, cb: (returns: ReturnEntry[]) => void) {
  const q = query(collection(db, "returns"), where("uid", "==", uid));
  return onSnapshot(
    q,
    (snap) => {
      const returns = snap.docs.map((d) => toReturnEntry(d.id, d.data()));
      returns.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      cb(returns);
    },
    (err) => {
      console.error("subscribeUserReturns failed:", err);
      cb([]);
    }
  );
}
