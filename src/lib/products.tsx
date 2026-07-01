import { useState } from "react";
import { useNavigate } from "react-router";
import { X, Check, ShoppingBag, Star, Loader2 } from "lucide-react";
import soapberryImg from "../../imports/Soapberry_Heritage.png";
import citrusImg from "../../imports/Citrus_Harvest.png";
import leraLogo from "../../imports/LERA__Eco-Dissolvable_Cleaning_Sheet.png";
import { useAuth } from "../../lib/auth-context";
import { createOrder } from "../../lib/firestore";
import { LERA_WHATSAPP_NUMBER, openWhatsApp, reserveWhatsAppWindow } from "../../lib/whatsapp";

const UNS = (id: string) => `https://images.unsplash.com/${id}?w=600&h=800&fit=crop&auto=format`;

// Photo per product id — actual photos take priority over CSS flat lay
const productPhotos: Record<number, string> = {
  1: citrusImg,
  2: UNS("photo-1709575832758-1292590197fa"),
  3: soapberryImg,
  4: UNS("photo-1779206727993-7012ece9461f"),
  5: UNS("photo-1690983323399-a7848f09bfb9"),
  6: UNS("photo-1548808889-bbbd02e9096d"),
  7: UNS("photo-1610450949065-1f2841536c88"),
  8: UNS("photo-1623171404570-1d196759fe20"),
};

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

type Dot = {
  x: string; y: string; w: number; h: number;
  bg: string; radius?: string; rotate?: string;
  opacity?: number; border?: string;
};

type Product = {
  id: number; name: string; family: string;
  from: string; to: string;
  tagline: string; desc: string;
  notes: string[]; benefit: string;
  price: string; sheets: number;
  marbleBg: string; dots: Dot[];
};

const products: Product[] = [
  {
    id: 1, name: "Citrus Harvest", family: "Citrus",
    from: "#F4A835", to: "#D4621A",
    tagline: "Bright. Invigorating. Pure.",
    desc: "Cold-pressed citrus oils from highland orchards of Jawa Barat. Each sheet releases a burst of sweet orange, bergamot, and fresh lemon zest — the perfect morning ritual for an energized start.",
    notes: ["Sweet Orange", "Bergamot", "Lemon Zest"], benefit: "Deep cleansing + mood-lifting",
    price: "Rp 45.000", sheets: 30,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #FFF0C0 0%, #FDDEA0 40%, #F8CC80 100%)",
    dots: [
      { x: "66%", y: "18%", w: 52, h: 52, bg: "#FF9028", radius: "50%" },
      { x: "66%", y: "18%", w: 36, h: 36, bg: "#FFAD40", radius: "50%", opacity: 0.7 },
      { x: "66%", y: "18%", w: 18, h: 18, bg: "#FFD060", radius: "50%", opacity: 0.5 },
      { x: "76%", y: "54%", w: 38, h: 38, bg: "#F0D820", radius: "50%", opacity: 0.95 },
      { x: "76%", y: "54%", w: 26, h: 26, bg: "#F8EC40", radius: "50%", opacity: 0.7 },
      { x: "58%", y: "68%", w: 20, h: 20, bg: "#FF8018", radius: "50%", opacity: 0.85 },
      { x: "68%", y: "38%", w: 30, h: 12, bg: "#5A9828", radius: "50%", rotate: "25deg", opacity: 0.85 },
      { x: "80%", y: "28%", w: 22, h: 9, bg: "#4A8820", radius: "50%", rotate: "-15deg", opacity: 0.75 },
      { x: "52%", y: "76%", w: 9, h: 9, bg: "#F09020", radius: "50%", opacity: 0.6 },
      { x: "62%", y: "80%", w: 7, h: 7, bg: "#ECA020", radius: "50%", opacity: 0.5 },
    ]
  },
  {
    id: 2, name: "Lemongrass Refresh", family: "Herbal",
    from: "#7BB87A", to: "#4A8A50",
    tagline: "Fresh. Clean. Revitalizing.",
    desc: "Steam-distilled lemongrass from the fertile highlands of Jawa Tengah. Crisp and herbaceous, this sheet purifies and revitalizes — a clean slate for body and mind.",
    notes: ["Lemongrass", "Green Tea", "Spearmint"], benefit: "Antibacterial + refreshing",
    price: "Rp 42.000", sheets: 30,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #E8F8E0 0%, #D0ECC0 40%, #B8E0A0 100%)",
    dots: [
      { x: "62%", y: "12%", w: 9, h: 65, bg: "#8DC860", radius: "6px", rotate: "12deg", opacity: 0.9 },
      { x: "70%", y: "8%",  w: 8, h: 72, bg: "#7AB850", radius: "6px", rotate: "-8deg", opacity: 0.85 },
      { x: "78%", y: "14%", w: 7, h: 58, bg: "#9AD870", radius: "6px", rotate: "22deg", opacity: 0.8 },
      { x: "55%", y: "10%", w: 6, h: 50, bg: "#6AAA48", radius: "6px", rotate: "-18deg", opacity: 0.75 },
      { x: "65%", y: "62%", w: 32, h: 13, bg: "#4A9030", radius: "50%", rotate: "30deg", opacity: 0.9 },
      { x: "74%", y: "72%", w: 26, h: 11, bg: "#3A8020", radius: "50%", rotate: "-22deg", opacity: 0.85 },
      { x: "56%", y: "70%", w: 22, h: 10, bg: "#5AA838", radius: "50%", rotate: "12deg", opacity: 0.9 },
      { x: "80%", y: "52%", w: 18, h: 18, bg: "#B8E890", radius: "50%", opacity: 0.65 },
      { x: "82%", y: "64%", w: 13, h: 13, bg: "#A8D880", radius: "50%", opacity: 0.55 },
      { x: "78%", y: "78%", w: 10, h: 10, bg: "#C0F0A0", radius: "50%", opacity: 0.5 },
    ]
  },
  {
    id: 3, name: "Soapberry Heritage", family: "Earthy",
    from: "#C4956A", to: "#8B5E3C",
    tagline: "Traditional. Gentle. Grounding.",
    desc: "Lerak (soapberry) has been the cleansing secret of Javanese royalty for centuries. This heritage formula offers extraordinary lather from Indonesia's own natural surfactant — gentle enough for daily use.",
    notes: ["Lerak Extract", "Warm Earth", "Sandalwood"], benefit: "Natural surfactant + skin-gentle",
    price: "Rp 48.000", sheets: 30,
    marbleBg: "", dots: []
  },
  {
    id: 4, name: "Patchouli Essence", family: "Earthy",
    from: "#9B7BB0", to: "#5E3E72",
    tagline: "Deep. Resinous. Grounding.",
    desc: "Patchouli from Sumatera's volcanic highlands carries a rich, earthy depth that calms the senses. A luxuriously grounding wash for mindful moments and meditative rituals.",
    notes: ["Dark Patchouli", "Vetiver", "Cedar"], benefit: "Stress-relieving + conditioning",
    price: "Rp 50.000", sheets: 30,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #F0E8F8 0%, #E0D0F0 40%, #C8B8E0 100%)",
    dots: [
      { x: "62%", y: "18%", w: 42, h: 22, bg: "#4A3060", radius: "50%", rotate: "25deg", opacity: 0.85 },
      { x: "72%", y: "40%", w: 36, h: 18, bg: "#5A3870", radius: "50%", rotate: "-18deg", opacity: 0.8 },
      { x: "58%", y: "55%", w: 30, h: 16, bg: "#3A2050", radius: "50%", rotate: "12deg", opacity: 0.75 },
      { x: "74%", y: "60%", w: 24, h: 13, bg: "#6040A0", radius: "50%", rotate: "-30deg", opacity: 0.7 },
      { x: "74%", y: "20%", w: 6, h: 52, bg: "#7A6048", radius: "4px", rotate: "18deg", opacity: 0.6 },
      { x: "82%", y: "28%", w: 4, h: 40, bg: "#6A5038", radius: "4px", rotate: "-12deg", opacity: 0.5 },
      { x: "60%", y: "72%", w: 12, h: 12, bg: "#302040", radius: "50%", opacity: 0.85 },
      { x: "68%", y: "76%", w: 9, h: 9,  bg: "#402858", radius: "50%", opacity: 0.75 },
      { x: "75%", y: "72%", w: 7, h: 7,  bg: "#302040", radius: "50%", opacity: 0.65 },
      { x: "56%", y: "78%", w: 8, h: 8,  bg: "#503870", radius: "50%", opacity: 0.6 },
    ]
  },
  {
    id: 5, name: "Coffee Revival", family: "Spiced",
    from: "#8B6040", to: "#4E2C12",
    tagline: "Bold. Energizing. Awakening.",
    desc: "Arabica coffee grounds from the slopes of Gunung Gayo in Aceh lend this sheet its invigorating character. Wake up your skin and your senses with every rich, exfoliating wash.",
    notes: ["Aceh Arabica", "Cardamom", "Vanilla"], benefit: "Exfoliating + energizing",
    price: "Rp 45.000", sheets: 30,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #F5EDE0 0%, #E8D8C0 40%, #D8C0A0 100%)",
    dots: [
      { x: "62%", y: "22%", w: 24, h: 14, bg: "#3A1808", radius: "50%", rotate: "30deg" },
      { x: "74%", y: "30%", w: 20, h: 12, bg: "#4A2010", radius: "50%", rotate: "-22deg" },
      { x: "67%", y: "44%", w: 22, h: 13, bg: "#3A1808", radius: "50%", rotate: "45deg", opacity: 0.9 },
      { x: "78%", y: "52%", w: 18, h: 11, bg: "#4A2818", radius: "50%", rotate: "-36deg", opacity: 0.9 },
      { x: "60%", y: "58%", w: 20, h: 12, bg: "#3A1808", radius: "50%", rotate: "15deg", opacity: 0.85 },
      { x: "72%", y: "66%", w: 16, h: 10, bg: "#5A3020", radius: "50%", rotate: "-25deg", opacity: 0.8 },
      { x: "56%", y: "72%", w: 14, h: 8,  bg: "#6A8840", radius: "50%", rotate: "20deg", opacity: 0.85 },
      { x: "80%", y: "40%", w: 11, h: 7,  bg: "#5A7830", radius: "50%", rotate: "-10deg", opacity: 0.75 },
      { x: "82%", y: "18%", w: 5,  h: 58, bg: "#7A6038", radius: "4px", rotate: "15deg", opacity: 0.7 },
      { x: "86%", y: "22%", w: 4,  h: 45, bg: "#8A7048", radius: "4px", rotate: "-8deg", opacity: 0.55 },
    ]
  },
  {
    id: 6, name: "Coconut Breeze", family: "Tropical",
    from: "#D4C8B8", to: "#A89880",
    tagline: "Light. Nourishing. Tropical.",
    desc: "Cold-pressed virgin coconut oil from the coconut islands of Sulawesi creates a creamy, nourishing lather that leaves skin silky-smooth and naturally hydrated throughout the day.",
    notes: ["Virgin Coconut", "Sea Salt", "Ylang Ylang"], benefit: "Ultra-moisturizing + gentle",
    price: "Rp 40.000", sheets: 30,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #FFFDF5 0%, #F8F2E0 40%, #F0E8C8 100%)",
    dots: [
      { x: "66%", y: "20%", w: 52, h: 52, bg: "#7A5028", radius: "50%", opacity: 0.9 },
      { x: "66%", y: "20%", w: 38, h: 38, bg: "#D8C090", radius: "50%" },
      { x: "66%", y: "20%", w: 26, h: 26, bg: "#F0E4C8", radius: "50%" },
      { x: "66%", y: "20%", w: 14, h: 14, bg: "#FAF0E0", radius: "50%" },
      { x: "77%", y: "58%", w: 38, h: 38, bg: "#6A4020", radius: "50%", opacity: 0.85 },
      { x: "77%", y: "58%", w: 26, h: 26, bg: "#C8AC78", radius: "50%" },
      { x: "77%", y: "58%", w: 16, h: 16, bg: "#E8D8B0", radius: "50%" },
      { x: "55%", y: "68%", w: 11, h: 11, bg: "#EEEcE4", radius: "3px", rotate: "30deg", border: "1px solid #C8C0A8", opacity: 0.9 },
      { x: "62%", y: "74%", w: 9,  h: 9,  bg: "#F0EEE6", radius: "3px", rotate: "15deg", border: "1px solid #C0B8A0", opacity: 0.8 },
      { x: "70%", y: "72%", w: 7,  h: 7,  bg: "#EEEAE0", radius: "3px", rotate: "45deg", border: "1px solid #C8C0A8", opacity: 0.7 },
      { x: "80%", y: "30%", w: 20, h: 20, bg: "#FFF8C0", radius: "50%", opacity: 0.9 },
      { x: "84%", y: "42%", w: 14, h: 14, bg: "#FFF4B0", radius: "50%", opacity: 0.8 },
    ]
  },
  {
    id: 7, name: "Cocoa Harmony", family: "Sweet",
    from: "#9A6030", to: "#3E1E08",
    tagline: "Warm. Indulgent. Harmonious.",
    desc: "Raw cacao from the rainforests of Kalimantan brings natural antioxidants and a deep, comforting warmth. Indulgence without compromise — for those who believe cleansing should be a pleasure.",
    notes: ["Raw Cacao", "Tonka Bean", "Warm Musk"], benefit: "Antioxidant-rich + nourishing",
    price: "Rp 47.000", sheets: 30,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #F5E8D0 0%, #E8D0B0 40%, #D8B888 100%)",
    dots: [
      { x: "62%", y: "22%", w: 21, h: 14, bg: "#3A1808", radius: "40%", rotate: "28deg" },
      { x: "72%", y: "32%", w: 17, h: 12, bg: "#4A2010", radius: "40%", rotate: "-22deg" },
      { x: "64%", y: "46%", w: 19, h: 13, bg: "#3A1808", radius: "40%", rotate: "44deg", opacity: 0.9 },
      { x: "76%", y: "54%", w: 15, h: 10, bg: "#5A2818", radius: "40%", rotate: "-34deg", opacity: 0.9 },
      { x: "60%", y: "60%", w: 17, h: 11, bg: "#3A1808", radius: "40%", rotate: "16deg", opacity: 0.85 },
      { x: "70%", y: "68%", w: 13, h: 9,  bg: "#5A3020", radius: "40%", rotate: "-26deg", opacity: 0.8 },
      { x: "78%", y: "18%", w: 30, h: 54, bg: "#4A2808", radius: "50%", rotate: "20deg", opacity: 0.65 },
      { x: "55%", y: "74%", w: 25, h: 12, bg: "#4A2808", radius: "50%", rotate: "28deg", opacity: 0.9 },
      { x: "80%", y: "70%", w: 16, h: 16, bg: "#B87040", radius: "50%", opacity: 0.4 },
      { x: "52%", y: "65%", w: 10, h: 10, bg: "#3A1808", radius: "40%", rotate: "10deg", opacity: 0.75 },
    ]
  },
  {
    id: 8, name: "Jasmine Bloom", family: "Floral",
    from: "#E8A5B0", to: "#B85870",
    tagline: "Delicate. Feminine. Timeless.",
    desc: "Hand-picked jasmine sambac from the flower farms of Jawa Timur, harvested at dawn when the fragrance peaks. A timeless floral for every evening ritual — delicate, lasting, and truly Indonesian.",
    notes: ["Jasmine Sambac", "Rose Water", "White Peony"], benefit: "Skin-brightening + calming",
    price: "Rp 50.000", sheets: 30,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #FFF5F8 0%, #FFE8EE 40%, #FFD8E8 100%)",
    dots: [
      { x: "64%", y: "16%", w: 24, h: 30, bg: "#FFFEF6", radius: "50% 50% 50% 0", rotate: "28deg", opacity: 0.95, border: "1px solid #F0E0D0" },
      { x: "74%", y: "22%", w: 21, h: 27, bg: "#FFFEF6", radius: "50% 50% 50% 0", rotate: "-18deg", opacity: 0.9, border: "1px solid #F0E0D0" },
      { x: "80%", y: "36%", w: 19, h: 25, bg: "#FFFEF6", radius: "50% 50% 50% 0", rotate: "58deg", opacity: 0.9, border: "1px solid #F0E0D0" },
      { x: "72%", y: "50%", w: 17, h: 22, bg: "#FFFCF4", radius: "50% 50% 50% 0", rotate: "-44deg", opacity: 0.85, border: "1px solid #EED8C8" },
      { x: "60%", y: "44%", w: 17, h: 22, bg: "#FFFEF6", radius: "50% 50% 50% 0", rotate: "72deg", opacity: 0.85, border: "1px solid #F0E0D0" },
      { x: "67%", y: "27%", w: 9,  h: 9,  bg: "#F0D038", radius: "50%", opacity: 0.85 },
      { x: "77%", y: "40%", w: 8,  h: 8,  bg: "#ECC028", radius: "50%", opacity: 0.8 },
      { x: "55%", y: "66%", w: 15, h: 15, bg: "#FFD0E0", radius: "50%", opacity: 0.8 },
      { x: "64%", y: "73%", w: 11, h: 11, bg: "#FFC0D8", radius: "50%", opacity: 0.7 },
      { x: "74%", y: "69%", w: 13, h: 13, bg: "#FFD0E0", radius: "50%", opacity: 0.75 },
      { x: "79%", y: "62%", w: 32, h: 20, bg: "#FFB0C0", radius: "50%", rotate: "24deg", opacity: 0.45 },
    ]
  },
];

const families = ["All", "Citrus", "Herbal", "Earthy", "Spiced", "Tropical", "Sweet", "Floral"];

// ── Tablet stack component ──────────────────────────────────────────────────
function TabletStack({ p, modalSize = false }: { p: Product; modalSize?: boolean }) {
  const size   = modalSize ? 90 : 68;
  const gap    = modalSize ? 7  : 5;
  const pad    = modalSize ? 10 : 7;
  const font1  = modalSize ? 9  : 6.5;
  const font2  = modalSize ? 7  : 5.5;

  return (
    <div style={{ position: "absolute", left: modalSize ? "7%" : "6%", top: "50%", transform: "translateY(-50%)" }}>
      {/* Shadow */}
      <div style={{
        position: "absolute", bottom: -6, left: size * 0.08,
        width: size * 0.84, height: size * 0.18,
        background: "rgba(0,0,0,0.22)", borderRadius: "50%", filter: "blur(8px)"
      }} />
      {/* 4 tablet layers */}
      {[3, 2, 1, 0].map(offset => (
        <div key={offset} style={{
          position: "absolute",
          bottom: offset * gap,
          left: offset * 1.5,
          width: size, height: size, borderRadius: "50%",
          background: `linear-gradient(140deg, ${p.from}EE, ${p.to})`,
          boxShadow: "0 3px 10px rgba(0,0,0,0.28), inset 0 1px 2px rgba(255,255,255,0.35)",
        }}>
          {offset === 0 && (
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: pad, textAlign: "center", gap: 2,
              background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.2) 0%, transparent 60%)"
            }}>
              <img src={leraLogo} alt="LERA" style={{ width: size * 0.42, height: "auto", filter: "brightness(0) invert(1)", opacity: 0.9 }} />
              <div style={{ ...serif, color: "rgba(255,255,255,0.92)", fontSize: font2, lineHeight: 1.2 }}>
                {p.name.split(" ").map((w, i) => <div key={i}>{w}</div>)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Glass jar component ─────────────────────────────────────────────────────
function GlassJar({ p, modalSize = false }: { p: Product; modalSize?: boolean }) {
  const w = modalSize ? 54 : 42;
  const h = modalSize ? 74 : 58;
  const dotSize = modalSize ? 12 : 9;

  return (
    <div style={{
      position: "absolute", right: modalSize ? "8%" : "6%",
      top: "50%", transform: "translateY(-50%)",
      width: w, height: h
    }}>
      {/* Cork */}
      <div style={{ position: "absolute", top: 0, left: "18%", right: "18%", height: 9,
        background: "#BF8858", borderRadius: "4px 4px 0 0", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
      <div style={{ position: "absolute", top: 7, left: "10%", right: "10%", height: 6,
        background: "#C89060", borderRadius: "3px" }} />
      {/* Jar body */}
      <div style={{
        position: "absolute", top: 11, left: 0, right: 0, bottom: 0,
        background: "rgba(235,250,248,0.55)",
        borderRadius: "5px 5px 10px 10px",
        border: "1.5px solid rgba(160,200,195,0.55)",
        backdropFilter: "blur(3px)",
        boxShadow: "inset 4px 0 8px rgba(255,255,255,0.3), inset -4px 0 8px rgba(0,0,0,0.06)"
      }}>
        {/* Highlight */}
        <div style={{ position: "absolute", top: 4, left: 5, width: 6, bottom: 8,
          background: "rgba(255,255,255,0.45)", borderRadius: "3px" }} />
        {/* Mini tablets inside */}
        <div style={{ position: "absolute", bottom: 6, left: 5, right: 5,
          display: "flex", flexWrap: "wrap", gap: 3, alignContent: "flex-end" }}>
          {Array(modalSize ? 9 : 6).fill(0).map((_, n) => (
            <div key={n} style={{
              width: dotSize, height: dotSize, borderRadius: "50%",
              background: `linear-gradient(135deg, ${p.from}CC, ${p.to}AA)`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.25)"
            }} />
          ))}
        </div>
        {/* LERA label sticker */}
        <div style={{
          position: "absolute", top: "22%", left: 4, right: 4,
          background: "rgba(255,255,255,0.82)",
          borderRadius: 3, padding: "3px 4px", textAlign: "center",
          border: "0.5px solid rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: 5, fontWeight: 700, color: "#2C5545", letterSpacing: "0.5px" }}>🌿LERA</div>
          <div style={{ fontSize: 4, color: "#5A7060", lineHeight: 1.2 }}>{p.family}</div>
        </div>
      </div>
    </div>
  );
}

// ── Main ProductFlatlay component ────────────────────────────────────────────
function ProductFlatlay({ p, modalSize = false }: { p: Product; modalSize?: boolean }) {
  // Use actual photo when available
  const photo = productPhotos[p.id];
  if (photo) {
    return (
      <div className="absolute inset-0">
        <img src={photo} alt={p.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/15 to-transparent" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: p.marbleBg }}>
      {/* Marble texture */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(ellipse at 28% 25%, rgba(255,255,255,0.55) 0%, transparent 45%), radial-gradient(ellipse at 75% 78%, rgba(0,0,0,0.04) 0%, transparent 45%)`
      }} />

      {/* "Edisi Panen Lokal Indonesia" tag */}
      <div style={{
        position: "absolute", top: modalSize ? 14 : 10, right: modalSize ? 14 : 10,
        background: "#1A2F18", color: "white",
        padding: modalSize ? "8px 10px" : "6px 8px",
        borderRadius: 5, textAlign: "center", lineHeight: 1.4
      }}>
        {["EDISI", "PANEN", "LOKAL"].map(w => (
          <div key={w} style={{ fontSize: modalSize ? 7 : 5.5, fontWeight: 700, letterSpacing: 0.8 }}>{w}</div>
        ))}
        <div style={{ fontSize: modalSize ? 6 : 4.5, letterSpacing: 0.4, opacity: 0.7 }}>INDONESIA</div>
      </div>

      {/* Botanical dots */}
      {p.dots.map((d, i) => (
        <div key={i} style={{
          position: "absolute",
          left: d.x, top: d.y,
          width: d.w, height: d.h,
          background: d.bg,
          borderRadius: d.radius || "50%",
          transform: `translate(-50%, -50%) rotate(${d.rotate || "0deg"})`,
          opacity: d.opacity ?? 1,
          border: d.border,
        }} />
      ))}

      {/* Tablet stack */}
      <TabletStack p={p} modalSize={modalSize} />

      {/* Glass jar */}
      <GlassJar p={p} modalSize={modalSize} />

      {/* Small ingredient bowl (ceramic/rattan feel) */}
      <div style={{
        position: "absolute",
        left: modalSize ? "16%" : "14%",
        bottom: modalSize ? "12%" : "10%",
        width: modalSize ? 38 : 28, height: modalSize ? 38 : 28
      }}>
        <div style={{
          width: "100%", height: "100%", borderRadius: "50%",
          background: "linear-gradient(135deg, #E8D8C0, #C8B090)",
          border: "1.5px solid #B09070",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)"
        }}>
          {/* Ingredient inside bowl */}
          <div style={{
            position: "absolute", top: "20%", left: "15%", right: "15%", bottom: "15%",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${p.from}88, ${p.to}66)`
          }} />
        </div>
      </div>

      {/* Bottom gradient for text */}
      <div className="absolute bottom-0 left-0 right-0" style={{
        height: modalSize ? "38%" : "40%",
        background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)"
      }} />
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export function Products() {
  const [activeFamily, setActiveFamily] = useState("All");
  const [selected, setSelected] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!selected) return;

    if (!user) {
      navigate("/login");
      return;
    }

    setCheckoutError("");
    setCheckingOut(true);

    // Reserve the tab synchronously (before any await) so the browser
    // doesn't block the WhatsApp popup once the Firestore write resolves.
    const waWindow = reserveWhatsAppWindow();

    try {
      const price = parseInt(selected.price.replace(/\D/g, ""), 10) || 0;
      const userName = user.displayName || user.email || "Pelanggan LERA";

      const order = await createOrder({
        uid: user.uid,
        userName,
        items: [{ name: selected.name, qty, price }],
      });

      const message = `Halo LERA! 👋 Saya ingin konfirmasi pesanan:\n\n🧴 ${selected.name} x${qty}\n💰 Total: Rp ${order.total.toLocaleString("id-ID")}\n👤 Atas nama: ${userName}\n🆔 ID Pesanan: ${order.id}\n\nMohon info langkah pembayaran & pengirimannya. Terima kasih! 🌿`;

      openWhatsApp(waWindow, LERA_WHATSAPP_NUMBER, message);
      setSelected(null);
      setQty(1);
    } catch (err) {
      console.error("Checkout failed:", err);
      waWindow?.close();
      setCheckoutError("Gagal membuat pesanan. Silakan coba lagi.");
    } finally {
      setCheckingOut(false);
    }
  };

  const filtered = activeFamily === "All" ? products : products.filter((p) => p.family === activeFamily);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 20% 60%, rgba(44,85,69,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(184,115,51,0.1) 0%, transparent 55%), #F4EFE6" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">Koleksi Eksklusif</p>
          <h1 style={serif} className="text-5xl md:text-6xl font-semibold text-foreground mb-6 leading-tight">
            Seasonal Harvest Collection
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Delapan aroma edisi terbatas terinspirasi dari musim panen bahan-bahan alami lokal Indonesia terbaik — dari citrus pegunungan hingga jasmine fajar.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 sticky top-16 z-40 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 flex-wrap">
            {families.map((f) => (
              <button key={f} onClick={() => setActiveFamily(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFamily === f ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground/70 hover:border-primary/40"
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <div key={p.id} className="group cursor-pointer" onClick={() => { setSelected(p); setQty(1); }}>
                <div className="aspect-[3/4] rounded-2xl relative overflow-hidden mb-3 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl bg-muted">
                  <ProductFlatlay p={p} />
                  {/* Product info overlay (always visible) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <div style={serif} className="text-white text-base font-semibold leading-tight mb-0.5">{p.name}</div>
                    <div className="text-white/65 text-[11px] italic mb-1.5">{p.tagline}</div>
                    <div className="text-white font-semibold text-sm">{p.price}</div>
                  </div>
                  {/* Family badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-white/90 text-[10px] font-semibold tracking-widest uppercase bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      {p.family}
                    </span>
                  </div>
                  {/* Hover CTA */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-4 py-2 bg-white/95 text-foreground text-xs font-semibold rounded-full shadow-lg">
                      Lihat Detail
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{p.family}</p>
                <p className="text-sm font-semibold text-foreground">{p.name}</p>
                <p className="text-xs text-primary font-medium mt-0.5">{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full md:max-w-3xl bg-card rounded-t-3xl md:rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              {/* Visual — flat lay illustration */}
              <div className="h-72 md:h-auto md:min-h-[500px] relative bg-muted">
                <ProductFlatlay p={selected} modalSize />
                {/* Family badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="text-white/90 text-xs font-semibold tracking-widest uppercase bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {selected.family}
                  </span>
                </div>
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                  <div style={serif} className="text-white text-3xl font-semibold mb-2 leading-tight">{selected.name}</div>
                  <div className="text-white/70 text-sm italic">{selected.tagline}</div>
                </div>
              </div>

              {/* Info */}
              <div className="p-7 flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 style={serif} className="text-2xl font-semibold text-foreground mb-1">{selected.name}</h2>
                    <div className="flex gap-1">
                      {Array(5).fill(0).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                      <span className="text-xs text-muted-foreground ml-1">(4.9)</span>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} className="p-2 hover:bg-muted rounded-xl transition-colors">
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{selected.desc}</p>

                <div className="mb-5">
                  <p className="text-xs font-medium text-muted-foreground mb-2 tracking-wide uppercase">Catatan Aroma</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.notes.map((n) => (
                      <span key={n} className="px-3 py-1 bg-primary/8 text-primary text-xs rounded-full font-medium">{n}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-medium text-muted-foreground mb-2 tracking-wide uppercase">Manfaat Utama</p>
                  {[selected.benefit, "100% biodegradable & natural", "Kemasan refillable, bebas plastik"].map((b) => (
                    <div key={b} className="flex items-center gap-2 text-sm text-foreground mt-1.5">
                      <Check className="w-4 h-4 text-primary shrink-0" />{b}
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div style={serif} className="text-2xl font-semibold text-foreground">Rp {(parseInt(selected.price.replace(/\D/g, "")) * qty).toLocaleString("id-ID")}</div>
                    <div className="text-xs text-muted-foreground">{selected.sheets} lembar / kotak</div>
                  </div>
                  {checkoutError && (
                    <div className="mb-3 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                      {checkoutError}
                    </div>
                  )}
                  <div className="flex gap-3 items-center mb-4">
                    <div className="flex items-center border border-border rounded-xl overflow-hidden">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2.5 text-sm hover:bg-muted transition-colors">−</button>
                      <span className="px-4 py-2.5 text-sm font-medium border-x border-border">{qty}</span>
                      <button onClick={() => setQty(qty + 1)} className="px-4 py-2.5 text-sm hover:bg-muted transition-colors">+</button>
                    </div>
                    <button
                      onClick={handleCheckout}
                      disabled={checkingOut}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {checkingOut ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Memproses...
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          Checkout via WhatsApp
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    {user
                      ? "Pesanan akan tersimpan di dashboard-mu, lalu kamu diarahkan ke WhatsApp untuk konfirmasi pembayaran & pengiriman."
                      : "Masuk dulu ke akunmu untuk checkout — kamu akan diarahkan ke halaman login."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <section className="py-16 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: "🌿", title: "100% Natural & Biodegradable", desc: "Semua bahan terurai secara alami dalam 28 hari di lingkungan kompos." },
              { icon: "♻️", title: "Refill-Friendly Packaging", desc: "Kemasan dirancang untuk diisi ulang ratusan kali. Scan QR untuk poin reward." },
              { icon: "🇮🇩", title: "Sourced from Indonesia", desc: "Semua bahan botanis bersumber dari petani lokal Indonesia dengan praktik etis." },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-2xl p-7">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 style={serif} className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
