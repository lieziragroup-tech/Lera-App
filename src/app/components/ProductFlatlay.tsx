import soapberryImg from "../../imports/Soapberry_Heritage.png";
import citrusImg from "../../imports/Citrus_Harvest_1.jpeg";
import lemongrassImg from "../../imports/Lemongrass_Refresh.jpeg";
import patchouliImg from "../../imports/Patchouli_Essence.jpeg";
import coffeeImg from "../../imports/Coffee_Revival_1.jpeg";
import cocoaImg from "../../imports/Cocoa_Harmony.jpeg";
import coconutbreezeImg from "../../imports/Coconut_Breeze.jpeg";
import jasminebloomImg from "../../imports/Jasmine_Bloom.jpeg";
import leraLogo from "../../imports/LERA__Eco-Dissolvable_Cleaning_Sheet.png";

const UNS = (id: string, w = 600, h = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

export type Dot = {
  x: string; y: string; w: number; h: number;
  bg: string; radius?: string; rotate?: string;
  opacity?: number; border?: string;
};

export type ProductVisual = {
  id: number;
  name: string;
  family: string;
  from: string;
  to: string;
  price: string;
  tagline?: string;
  photo?: string;   // actual photo URL or import — takes priority over CSS illustration
  marbleBg: string;
  dots: Dot[];
};

export const productVisuals: ProductVisual[] = [
  {
    id: 1, name: "Citrus Harvest", family: "Citrus",
    from: "#F4A835", to: "#D4621A", price: "Rp 45.000", tagline: "Bright. Invigorating. Pure.",
    photo: citrusImg,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #FFF0C0 0%, #FDDEA0 40%, #F8CC80 100%)",
    dots: [
      { x: "66%", y: "18%", w: 52, h: 52, bg: "#FF9028", radius: "50%" },
      { x: "66%", y: "18%", w: 36, h: 36, bg: "#FFAD40", radius: "50%", opacity: 0.7 },
      { x: "66%", y: "18%", w: 18, h: 18, bg: "#FFD060", radius: "50%", opacity: 0.5 },
      { x: "76%", y: "54%", w: 38, h: 38, bg: "#F0D820", radius: "50%", opacity: 0.95 },
      { x: "76%", y: "54%", w: 26, h: 26, bg: "#F8EC40", radius: "50%", opacity: 0.7 },
      { x: "58%", y: "68%", w: 20, h: 20, bg: "#FF8018", radius: "50%", opacity: 0.85 },
      { x: "68%", y: "38%", w: 30, h: 12, bg: "#5A9828", radius: "50%", rotate: "25deg", opacity: 0.85 },
      { x: "80%", y: "28%", w: 22, h: 9,  bg: "#4A8820", radius: "50%", rotate: "-15deg", opacity: 0.75 },
    ],
  },
  {
    id: 2, name: "Lemongrass Refresh", family: "Herbal",
    from: "#7BB87A", to: "#4A8A50", price: "Rp 42.000", tagline: "Fresh. Clean. Revitalizing.",
    photo: lemongrassImg,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #E8F8E0 0%, #D0ECC0 40%, #B8E0A0 100%)",
    dots: [
      { x: "62%", y: "12%", w: 9, h: 65, bg: "#8DC860", radius: "6px", rotate: "12deg", opacity: 0.9 },
      { x: "70%", y: "8%",  w: 8, h: 72, bg: "#7AB850", radius: "6px", rotate: "-8deg", opacity: 0.85 },
      { x: "78%", y: "14%", w: 7, h: 58, bg: "#9AD870", radius: "6px", rotate: "22deg", opacity: 0.8 },
      { x: "65%", y: "62%", w: 32, h: 13, bg: "#4A9030", radius: "50%", rotate: "30deg", opacity: 0.9 },
      { x: "74%", y: "72%", w: 26, h: 11, bg: "#3A8020", radius: "50%", rotate: "-22deg", opacity: 0.85 },
      { x: "80%", y: "52%", w: 18, h: 18, bg: "#B8E890", radius: "50%", opacity: 0.65 },
    ],
  },
  {
    id: 3, name: "Soapberry Heritage", family: "Earthy",
    from: "#C4956A", to: "#8B5E3C", price: "Rp 48.000", tagline: "Traditional. Gentle. Grounding.",
    photo: soapberryImg,
    marbleBg: "", dots: [],
  },
  {
    id: 4, name: "Patchouli Essence", family: "Earthy",
    from: "#9B7BB0", to: "#5E3E72", price: "Rp 50.000", tagline: "Deep. Resinous. Grounding.",
    photo: patchouliImg,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #F0E8F8 0%, #E0D0F0 40%, #C8B8E0 100%)",
    dots: [
      { x: "62%", y: "18%", w: 42, h: 22, bg: "#4A3060", radius: "50%", rotate: "25deg", opacity: 0.85 },
      { x: "72%", y: "40%", w: 36, h: 18, bg: "#5A3870", radius: "50%", rotate: "-18deg", opacity: 0.8 },
      { x: "58%", y: "55%", w: 30, h: 16, bg: "#3A2050", radius: "50%", rotate: "12deg", opacity: 0.75 },
      { x: "74%", y: "20%", w: 6,  h: 52, bg: "#7A6048", radius: "4px", rotate: "18deg", opacity: 0.6 },
      { x: "60%", y: "72%", w: 12, h: 12, bg: "#302040", radius: "50%", opacity: 0.85 },
      { x: "68%", y: "76%", w: 9,  h: 9,  bg: "#402858", radius: "50%", opacity: 0.75 },
    ],
  },
  {
    id: 5, name: "Coffee Revival", family: "Spiced",
    from: "#8B6040", to: "#4E2C12", price: "Rp 45.000", tagline: "Bold. Energizing. Awakening.",
    photo: coffeeImg,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #F5EDE0 0%, #E8D8C0 40%, #D8C0A0 100%)",
    dots: [
      { x: "62%", y: "22%", w: 24, h: 14, bg: "#3A1808", radius: "50%", rotate: "30deg" },
      { x: "74%", y: "30%", w: 20, h: 12, bg: "#4A2010", radius: "50%", rotate: "-22deg" },
      { x: "67%", y: "44%", w: 22, h: 13, bg: "#3A1808", radius: "50%", rotate: "45deg", opacity: 0.9 },
      { x: "78%", y: "52%", w: 18, h: 11, bg: "#4A2818", radius: "50%", rotate: "-36deg", opacity: 0.9 },
      { x: "60%", y: "58%", w: 20, h: 12, bg: "#3A1808", radius: "50%", rotate: "15deg", opacity: 0.85 },
      { x: "56%", y: "72%", w: 14, h: 8,  bg: "#6A8840", radius: "50%", rotate: "20deg", opacity: 0.85 },
      { x: "82%", y: "18%", w: 5,  h: 58, bg: "#7A6038", radius: "4px", rotate: "15deg", opacity: 0.7 },
    ],
  },
  {
    id: 6, name: "Coconut Breeze", family: "Tropical",
    from: "#D4C8B8", to: "#A89880", price: "Rp 40.000", tagline: "Light. Nourishing. Tropical.",
    photo: coconutbreezeImg,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #FFFDF5 0%, #F8F2E0 40%, #F0E8C8 100%)",
    dots: [
      { x: "66%", y: "20%", w: 52, h: 52, bg: "#7A5028", radius: "50%", opacity: 0.9 },
      { x: "66%", y: "20%", w: 38, h: 38, bg: "#D8C090", radius: "50%" },
      { x: "66%", y: "20%", w: 26, h: 26, bg: "#F0E4C8", radius: "50%" },
      { x: "66%", y: "20%", w: 14, h: 14, bg: "#FAF0E0", radius: "50%" },
      { x: "77%", y: "58%", w: 38, h: 38, bg: "#6A4020", radius: "50%", opacity: 0.85 },
      { x: "77%", y: "58%", w: 26, h: 26, bg: "#C8AC78", radius: "50%" },
      { x: "77%", y: "58%", w: 16, h: 16, bg: "#E8D8B0", radius: "50%" },
      { x: "80%", y: "30%", w: 20, h: 20, bg: "#FFF8C0", radius: "50%", opacity: 0.9 },
    ],
  },
  {
    id: 7, name: "Cocoa Harmony", family: "Sweet",
    from: "#9A6030", to: "#3E1E08", price: "Rp 47.000", tagline: "Warm. Indulgent. Harmonious.",
    photo: cocoaImg,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #F5E8D0 0%, #E8D0B0 40%, #D8B888 100%)",
    dots: [
      { x: "62%", y: "22%", w: 21, h: 14, bg: "#3A1808", radius: "40%", rotate: "28deg" },
      { x: "72%", y: "32%", w: 17, h: 12, bg: "#4A2010", radius: "40%", rotate: "-22deg" },
      { x: "64%", y: "46%", w: 19, h: 13, bg: "#3A1808", radius: "40%", rotate: "44deg", opacity: 0.9 },
      { x: "76%", y: "54%", w: 15, h: 10, bg: "#5A2818", radius: "40%", rotate: "-34deg", opacity: 0.9 },
      { x: "78%", y: "18%", w: 30, h: 54, bg: "#4A2808", radius: "50%", rotate: "20deg", opacity: 0.65 },
      { x: "55%", y: "74%", w: 25, h: 12, bg: "#4A2808", radius: "50%", rotate: "28deg", opacity: 0.9 },
    ],
  },
  {
    id: 8, name: "Jasmine Bloom", family: "Floral",
    from: "#E8A5B0", to: "#B85870", price: "Rp 50.000", tagline: "Delicate. Feminine. Timeless.",
    photo: jasminebloomImg,
    marbleBg: "radial-gradient(ellipse at 25% 30%, #FFF5F8 0%, #FFE8EE 40%, #FFD8E8 100%)",
    dots: [
      { x: "64%", y: "16%", w: 24, h: 30, bg: "#FFFEF6", radius: "50% 50% 50% 0", rotate: "28deg", opacity: 0.95, border: "1px solid #F0E0D0" },
      { x: "74%", y: "22%", w: 21, h: 27, bg: "#FFFEF6", radius: "50% 50% 50% 0", rotate: "-18deg", opacity: 0.9, border: "1px solid #F0E0D0" },
      { x: "80%", y: "36%", w: 19, h: 25, bg: "#FFFEF6", radius: "50% 50% 50% 0", rotate: "58deg", opacity: 0.9, border: "1px solid #F0E0D0" },
      { x: "72%", y: "50%", w: 17, h: 22, bg: "#FFFCF4", radius: "50% 50% 50% 0", rotate: "-44deg", opacity: 0.85, border: "1px solid #EED8C8" },
      { x: "67%", y: "27%", w: 9,  h: 9,  bg: "#F0D038", radius: "50%", opacity: 0.85 },
      { x: "55%", y: "66%", w: 15, h: 15, bg: "#FFD0E0", radius: "50%", opacity: 0.8 },
      { x: "74%", y: "69%", w: 13, h: 13, bg: "#FFD0E0", radius: "50%", opacity: 0.75 },
      { x: "79%", y: "62%", w: 32, h: 20, bg: "#FFB0C0", radius: "50%", rotate: "24deg", opacity: 0.45 },
    ],
  },
];

// ── Sub-components ──────────────────────────────────────────────────────────
function TabletStack({ pv, size = 68, gap = 5 }: { pv: ProductVisual; size?: number; gap?: number }) {
  return (
    <div style={{ position: "absolute", left: "6%", top: "50%", transform: "translateY(-50%)" }}>
      <div style={{
        position: "absolute", bottom: -6, left: size * 0.08,
        width: size * 0.84, height: size * 0.18,
        background: "rgba(0,0,0,0.22)", borderRadius: "50%", filter: "blur(7px)"
      }} />
      {[3, 2, 1, 0].map(offset => (
        <div key={offset} style={{
          position: "absolute",
          bottom: offset * gap, left: offset * 1.5,
          width: size, height: size, borderRadius: "50%",
          background: `linear-gradient(140deg, ${pv.from}EE, ${pv.to})`,
          boxShadow: "0 3px 10px rgba(0,0,0,0.28), inset 0 1px 2px rgba(255,255,255,0.35)",
        }}>
          {offset === 0 && (
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: 7, textAlign: "center", gap: 2,
              background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.2) 0%, transparent 60%)"
            }}>
              <img src={leraLogo} alt="LERA" style={{ width: size * 0.42, height: "auto", filter: "brightness(0) invert(1)", opacity: 0.9 }} />
              <div style={{ ...serif, color: "rgba(255,255,255,0.9)", fontSize: size * 0.08, lineHeight: 1.2 }}>
                {pv.name.split(" ").map((w, i) => <div key={i}>{w}</div>)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function GlassJar({ pv, w = 42, h = 58 }: { pv: ProductVisual; w?: number; h?: number }) {
  const dotSize = Math.round(w * 0.22);
  return (
    <div style={{ position: "absolute", right: "6%", top: "50%", transform: "translateY(-50%)", width: w, height: h }}>
      <div style={{ position: "absolute", top: 0, left: "18%", right: "18%", height: 9,
        background: "#BF8858", borderRadius: "4px 4px 0 0", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
      <div style={{ position: "absolute", top: 7, left: "10%", right: "10%", height: 6,
        background: "#C89060", borderRadius: "3px" }} />
      <div style={{
        position: "absolute", top: 11, left: 0, right: 0, bottom: 0,
        background: "rgba(235,250,248,0.55)",
        borderRadius: "5px 5px 10px 10px",
        border: "1.5px solid rgba(160,200,195,0.55)",
        backdropFilter: "blur(3px)",
        boxShadow: "inset 4px 0 8px rgba(255,255,255,0.3), inset -4px 0 8px rgba(0,0,0,0.06)"
      }}>
        <div style={{ position: "absolute", top: 4, left: 5, width: 5, bottom: 7,
          background: "rgba(255,255,255,0.4)", borderRadius: "3px" }} />
        <div style={{ position: "absolute", bottom: 5, left: 4, right: 4,
          display: "flex", flexWrap: "wrap", gap: 2, alignContent: "flex-end" }}>
          {Array(6).fill(0).map((_, n) => (
            <div key={n} style={{
              width: dotSize, height: dotSize, borderRadius: "50%",
              background: `linear-gradient(135deg, ${pv.from}CC, ${pv.to}AA)`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.25)"
            }} />
          ))}
        </div>
        <div style={{
          position: "absolute", top: "20%", left: 3, right: 3,
          background: "rgba(255,255,255,0.82)", borderRadius: 3,
          padding: "2px 3px", textAlign: "center", border: "0.5px solid rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: 5, fontWeight: 700, color: "#2C5545", letterSpacing: "0.5px" }}>🌿LERA</div>
          <div style={{ fontSize: 4, color: "#5A7060", lineHeight: 1.2 }}>{pv.family}</div>
        </div>
      </div>
    </div>
  );
}

// ── Exported ProductFlatlay ─────────────────────────────────────────────────
export function ProductFlatlay({ pv, tabletSize = 68 }: { pv: ProductVisual; tabletSize?: number }) {
  // When a photo is available, show it with a gradient overlay
  if (pv.photo) {
    return (
      <div className="absolute inset-0">
        <img
          src={pv.photo}
          alt={pv.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/15 to-transparent" />
      </div>
    );
  }

  const jarW = Math.round(tabletSize * 0.62);
  const jarH = Math.round(tabletSize * 0.85);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: pv.marbleBg }}>
      {/* Marble highlights */}
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(ellipse at 28% 25%, rgba(255,255,255,0.55) 0%, transparent 45%), radial-gradient(ellipse at 75% 78%, rgba(0,0,0,0.04) 0%, transparent 45%)"
      }} />

      {/* "Edisi Panen Lokal" tag */}
      <div style={{
        position: "absolute", top: 10, right: 10,
        background: "#1A2F18", color: "white",
        padding: "5px 7px", borderRadius: 4, textAlign: "center", lineHeight: 1.4
      }}>
        {["EDISI", "PANEN", "LOKAL"].map(w => (
          <div key={w} style={{ fontSize: 5.5, fontWeight: 700, letterSpacing: 0.8 }}>{w}</div>
        ))}
        <div style={{ fontSize: 4.5, letterSpacing: 0.4, opacity: 0.7 }}>INDONESIA</div>
      </div>

      {/* Botanical dots */}
      {pv.dots.map((d, i) => (
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

      {/* Ingredient bowl */}
      <div style={{
        position: "absolute", left: "14%", bottom: "10%",
        width: 28, height: 28
      }}>
        <div style={{
          width: "100%", height: "100%", borderRadius: "50%",
          background: "linear-gradient(135deg, #E8D8C0, #C8B090)",
          border: "1.5px solid #B09070",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)"
        }}>
          <div style={{
            position: "absolute", top: "20%", left: "15%", right: "15%", bottom: "15%",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${pv.from}88, ${pv.to}66)`
          }} />
        </div>
      </div>

      <TabletStack pv={pv} size={tabletSize} gap={Math.round(tabletSize * 0.073)} />
      <GlassJar pv={pv} w={jarW} h={jarH} />

      {/* Bottom text gradient */}
      <div className="absolute bottom-0 left-0 right-0" style={{
        height: "40%",
        background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)"
      }} />
    </div>
  );
}