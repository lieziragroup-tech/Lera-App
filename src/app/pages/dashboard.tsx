import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import {
  LayoutDashboard, ShoppingBag, Leaf, Award, User, LogOut,
  Settings, BarChart3, Activity, PackageCheck, Recycle, ArrowRight,
} from "lucide-react";
import leraLogo from "../../imports/LERA__Eco-Dissolvable_Cleaning_Sheet.png";
import { useAuth } from "../../lib/auth-context";
import { subscribeUserOrders, subscribeUserReturns, type Order, type ReturnEntry } from "../../lib/firestore";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: ShoppingBag, label: "My Orders", id: "orders" },
  { icon: Leaf, label: "Impact Passport", id: "impact" },
  { icon: Award, label: "Carbon Club", id: "club" },
  { icon: User, label: "Profile", id: "profile" },
  { icon: Settings, label: "Settings", id: "settings" },
];

type ActivityEntry = {
  id: string;
  title: string;
  amt: string;
  createdAt: Date | null;
  kind: "order" | "return";
};

function formatRelativeTime(date: Date | null): string {
  if (!date) return "Baru saja";
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit yang lalu`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam yang lalu`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay} hari yang lalu`;
  const diffWeek = Math.floor(diffDay / 7);
  if (diffWeek < 5) return `${diffWeek} minggu yang lalu`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

const orderStatusLabel: Record<Order["status"], string> = {
  pending_whatsapp: "Menunggu Konfirmasi",
  confirmed: "Terkonfirmasi",
};

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [returns, setReturns] = useState<ReturnEntry[]>([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [returnsLoaded, setReturnsLoaded] = useState(false);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Subscribe to this user's real orders & returns from Firestore in realtime.
  useEffect(() => {
    if (!user) return;

    const unsubOrders = subscribeUserOrders(user.uid, (data) => {
      setOrders(data);
      setOrdersLoaded(true);
    });
    const unsubReturns = subscribeUserReturns(user.uid, (data) => {
      setReturns(data);
      setReturnsLoaded(true);
    });

    return () => {
      unsubOrders();
      unsubReturns();
    };
  }, [user]);

  const dataLoading = !ordersLoaded || !returnsLoaded;

  const totalUnitsPurchased = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.qty, 0),
    0
  );
  const totalCO2 = +(
    orders.reduce((sum, o) => sum + o.co2Saved, 0) + returns.reduce((sum, r) => sum + r.co2Saved, 0)
  ).toFixed(2);
  const totalPoints =
    orders.reduce((sum, o) => sum + o.points, 0) + returns.reduce((sum, r) => sum + r.points, 0);

  const activity: ActivityEntry[] = [
    ...orders.map((o) => ({
      id: o.id,
      title: `Pembelian: ${o.items.map((i) => `${i.name} x${i.qty}`).join(", ")}`,
      amt: `- Rp ${o.total.toLocaleString("id-ID")}`,
      createdAt: o.createdAt,
      kind: "order" as const,
    })),
    ...returns.map((r) => ({
      id: r.id,
      title: `Pengembalian Kemasan ${r.size} x${r.qty}`,
      amt: `+ ${r.points} Poin`,
      createdAt: r.createdAt,
      kind: "return" as const,
    })),
  ].sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));

  const handleLogout = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-[100svh] bg-secondary/30 flex w-full max-w-[100vw] overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border/60 hidden md:flex flex-col sticky top-0 h-screen shrink-0">
        <div className="p-6 border-b border-border/40">
          <Link to="/" className="flex items-center gap-3">
            <img src={leraLogo} alt="LERA" className="h-8 w-auto object-contain" />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2 px-3">Menu Utama</p>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-border/40">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-xl text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-card/50 backdrop-blur-md sticky top-0 z-10 border-b border-border/40 px-6 sm:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4 md:hidden">
            <Link to="/">
              <img src={leraLogo} alt="LERA" className="h-6 w-auto object-contain" />
            </Link>
          </div>
          <h2 style={serif} className="hidden md:block text-2xl font-semibold text-foreground">
            {sidebarItems.find((i) => i.id === activeTab)?.label || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground">
              <Activity className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border/50">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-foreground leading-tight">{displayName}</p>
                <p className="text-xs text-primary font-medium">Forest Guardian</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary overflow-hidden shrink-0 flex items-center justify-center text-primary font-semibold text-sm">
                {initials}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Welcome banner */}
                  <div className="bg-gradient-to-br from-primary/90 to-accent text-primary-foreground rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-64 bg-white/10 blur-3xl rounded-full transform translate-x-1/3"></div>
                    <div className="relative z-10 max-w-lg">
                      <h3 style={serif} className="text-2xl sm:text-3xl font-semibold mb-2">Welcome back, {displayName}!</h3>
                      <p className="text-primary-foreground/80 mb-6 text-sm leading-relaxed">
                        {orders.length + returns.length > 0
                          ? `Kamu sudah melakukan ${orders.length} pembelian dan ${returns.length} pengembalian kemasan bersama LERA. Terus lanjutkan kebiasaan baik ini!`
                          : "Belum ada aktivitas tercatat. Yuk mulai perjalanan hijaumu dengan belanja produk atau mengembalikan kemasan pertamamu."}
                      </p>
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-white text-primary px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors shadow-sm"
                      >
                        Belanja Sekarang <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      { label: "Total Pembelian", value: `${totalUnitsPurchased} Kotak`, icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
                      { label: "CO₂ Dicegah", value: `${totalCO2} kg`, icon: BarChart3, color: "text-primary", bg: "bg-primary/10" },
                      { label: "Poin LERA", value: totalPoints.toLocaleString("id-ID"), icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
                    ].map((m, i) => (
                      <div key={i} className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${m.bg} ${m.color} shrink-0`}>
                          <m.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{m.label}</p>
                          <p style={serif} className="text-2xl font-semibold text-foreground">
                            {dataLoading ? "…" : m.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border/40 flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">Aktivitas Terakhir</h4>
                      {activity.length > 0 && (
                        <button onClick={() => setActiveTab("orders")} className="text-sm text-primary font-medium hover:underline">
                          Lihat Semua
                        </button>
                      )}
                    </div>

                    {dataLoading ? (
                      <div className="p-8 text-center text-sm text-muted-foreground">Memuat aktivitas...</div>
                    ) : activity.length === 0 ? (
                      <div className="p-10 text-center">
                        <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                          <Activity className="w-6 h-6 text-muted-foreground/50" />
                        </div>
                        <p className="text-sm text-muted-foreground">Belum ada aktivitas. Transaksi pertamamu akan muncul di sini.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-border/40">
                        {activity.slice(0, 5).map((act) => (
                          <div key={act.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${act.kind === "order" ? "bg-blue-500/10 text-blue-500" : "bg-primary/10 text-primary"}`}>
                                {act.kind === "order" ? <PackageCheck className="w-4 h-4" /> : <Recycle className="w-4 h-4" />}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground mb-0.5">{act.title}</p>
                                <p className="text-xs text-muted-foreground">{formatRelativeTime(act.createdAt)}</p>
                              </div>
                            </div>
                            <div className="text-sm font-semibold text-foreground shrink-0 ml-3">{act.amt}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-border/40">
                    <h4 className="font-semibold text-foreground">Riwayat Transaksi</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Pembelian produk & pengembalian kemasan, langsung dari Firestore.</p>
                  </div>

                  {dataLoading ? (
                    <div className="p-10 text-center text-sm text-muted-foreground">Memuat riwayat...</div>
                  ) : activity.length === 0 ? (
                    <div className="p-10 text-center">
                      <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                        <ShoppingBag className="w-6 h-6 text-muted-foreground/50" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">Belum ada transaksi</h3>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
                        Belanja produk atau kembalikan kemasan untuk mulai mengumpulkan poin & mengurangi jejak karbonmu.
                      </p>
                      <div className="flex gap-3 justify-center">
                        <Link to="/products" className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                          Belanja Produk
                        </Link>
                        <Link to="/circular-return" className="px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                          Kembalikan Kemasan
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="divide-y divide-border/40">
                      {orders.map((o) => (
                        <div key={o.id} className="p-4 sm:px-6 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                              <PackageCheck className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {o.items.map((i) => `${i.name} x${i.qty}`).join(", ")}
                              </p>
                              <p className="text-xs text-muted-foreground">{formatRelativeTime(o.createdAt)} · +{o.points} poin</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-semibold text-foreground">Rp {o.total.toLocaleString("id-ID")}</p>
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${o.status === "confirmed" ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-600"}`}>
                              {orderStatusLabel[o.status]}
                            </span>
                          </div>
                        </div>
                      ))}
                      {returns.map((r) => (
                        <div key={r.id} className="p-4 sm:px-6 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              <Recycle className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">Pengembalian Kemasan {r.size} x{r.qty}</p>
                              <p className="text-xs text-muted-foreground">{formatRelativeTime(r.createdAt)} · {r.co2Saved} kg CO₂ dihemat</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-semibold text-primary">+{r.points} Poin</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab !== "overview" && activeTab !== "orders" && (
                <div className="h-96 flex items-center justify-center bg-card rounded-3xl border border-border/50 border-dashed">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Settings className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Modul Belum Tersedia</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Halaman {sidebarItems.find((i) => i.id === activeTab)?.label} sedang dalam tahap pengembangan.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
