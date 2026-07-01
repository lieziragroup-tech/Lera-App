import { Link } from "react-router";
import { useState, useEffect } from "react";
import leraLogo from "../../imports/LERA__Eco-Dissolvable_Cleaning_Sheet.png";
import { ProductFlatlay, productVisuals } from "../components/ProductFlatlay";
import { ArrowRight, Leaf, ChevronRight, Star, Recycle, BarChart3, Award, Bot, Users } from "lucide-react";
import { Reveal } from "../components/ui/reveal";
import { motion } from "motion/react";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const platformFeatures = [
  { name: "Carbon Impact Tracker", desc: "Monitor real-time resource savings and emissions reduced.", Icon: BarChart3, href: "/platform" },
  { name: "Circular Return System", desc: "Scan QR on empty packaging and earn reward points.", Icon: Recycle, href: "/circular-return" },
  { name: "Impact Passport", desc: "Annual digital impact report — yours to download and share.", Icon: Award, href: "/impact-passport" },
  { name: "Carbon Club", desc: "Community challenges, levels, and sustainability leaderboards.", Icon: Users, href: "/carbon-club" },
  { name: "AI Eco Assistant", desc: "Smart guidance for an eco-conscious lifestyle.", Icon: Bot, href: "/ai-assistant" },
  { name: "Eco Community Hub", desc: "Connect with fellow green advocates across Indonesia.", Icon: Leaf, href: "/platform" },
];

const stats = [
  { value: "2.4M", unit: "ton CO₂", label: "Emisi berkurang" },
  { value: "850K", unit: "kg plastik", label: "Plastik dihindari" },
  { value: "120K+", unit: "pengguna", label: "Anggota aktif" },
  { value: "98%", unit: "biodegradable", label: "Bahan alami" },
];

const steps = [
  { step: "01", title: "Pilih Lembaranmu", desc: "Pilih dari Seasonal Harvest Collection — 8 aroma botanis unik dari panen terbaik Nusantara." },
  { step: "02", title: "Larutkan & Bersihkan", desc: "Teteskan satu lembar ke air atau oleskan langsung. Larut seketika menjadi busa lembut nan efektif." },
  { step: "03", title: "Kembalikan & Raih Poin", desc: "Scan QR pada kemasan kosong via Circular Return System dan tukarkan poin untuk reward menarik." },
];

const testimonials = [
  { name: "Anindya Kusuma", role: "Sustainability Advocate, Jakarta", text: "LERA mengubah cara saya melihat kebersihan. Tidak ada lagi rasa bersalah membuang botol plastik setiap minggu.", rating: 5, scent: "Jasmine Bloom" },
  { name: "Bagas Prasetyo", role: "Content Creator, Yogyakarta", text: "Impact Passport-nya sangat memotivasi. Saya bisa melihat persis berapa CO₂ yang sudah saya hemat tahun ini.", rating: 5, scent: "Coffee Revival" },
  { name: "Ratih Wulandari", role: "Dokter Keluarga, Bandung", text: "Formulanya lembut untuk kulit sensitif anakku dan bahan-bahannya benar-benar natural. Total game changer!", rating: 5, scent: "Coconut Breeze" },
];

const articles = [
  { category: "Sustainability", title: "How Eco-Dissolvable Sheets Are Revolutionizing Personal Care", excerpt: "The global plastic crisis has pushed consumers to rethink daily routines. LERA offers a compelling solution.", date: "12 Jun 2026", photo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=380&fit=crop" },
  { category: "Ingredients", title: "Soapberry (Lerak): Indonesia's Ancient Cleansing Secret", excerpt: "Used for centuries in Javanese bathing rituals, lerak offers exceptional cleansing power with zero environmental impact.", date: "8 Jun 2026", photo: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&h=380&fit=crop" },
  { category: "Carbon Club", title: "Meet the Top Carbon Champions of Q2 2026", excerpt: "Our community has collectively prevented 45 tons of CO₂ this quarter. Here are the stories behind the numbers.", date: "1 Jun 2026", photo: "https://images.unsplash.com/photo-1611078513726-11f4d92eb929?w=600&h=380&fit=crop" },
];

export function Home() {
  const [cardOrder, setCardOrder] = useState([0, 1, 2]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCardOrder(prev => [prev[1], prev[2], prev[0]]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section
        className="min-h-[100svh] flex flex-col justify-center relative pt-16"
        style={{ background: "radial-gradient(ellipse at 15% 80%, rgba(44,85,69,0.22) 0%, transparent 52%), radial-gradient(ellipse at 85% 15%, rgba(184,115,51,0.13) 0%, transparent 52%), radial-gradient(ellipse at 55% 55%, rgba(44,85,69,0.07) 0%, transparent 65%), #F4EFE6" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <Reveal direction="down" delay={0.1}>
              <img src={leraLogo} alt="LERA" className="h-16 w-auto object-contain mb-6" />
            </Reveal>
            <Reveal direction="left" delay={0.2}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/6 text-xs font-medium text-primary mb-8 tracking-wide">
                <Leaf className="w-3 h-3" />
                Seasonal Harvest Collection 2026
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.3}>
              <h1 style={serif} className="text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground leading-[1.03] mb-6">
                Clean Flows<br />
                <em className="not-italic text-primary">Naturally.</em>
              </h1>
            </Reveal>
            <Reveal direction="left" delay={0.4}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
                Lembaran pembersih eco-dissolvable dari bahan-bahan botanis pilihan Indonesia. Bebas plastik, biodegradable, dan dirancang untuk gaya hidup sadar lingkungan.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-all hover:gap-3 hover:shadow-xl hover:shadow-primary/20 active:scale-95">
                  Jelajahi Koleksi <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/platform" className="inline-flex items-center gap-2 px-7 py-3.5 border border-border text-foreground rounded-full font-medium text-sm hover:border-primary hover:text-primary transition-all active:scale-95 bg-background/50 backdrop-blur-sm">
                  Platform Digital
                </Link>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.6}>
              <div className="flex gap-10 mt-12 pt-10 border-t border-border">
                {[{ v: "8", u: "Aroma botanis" }, { v: "100%", u: "Biodegradable" }, { v: "6", u: "Fitur digital" }].map(({ v, u }) => (
                  <div key={u}>
                    <div style={serif} className="text-2xl font-semibold text-foreground">{v}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{u}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-2 hidden md:flex items-center justify-center">
            <div className="relative w-80 h-80">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-primary/8 blur-3xl" 
              />
              {cardOrder.map((realIndex, pos) => {
                return (
                  <motion.div 
                    key={realIndex} 
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: pos * 25, top: `${15 + pos * 8}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    whileHover={{ scale: 1.05, x: pos * 25 - 15, zIndex: 10, y: -5 }}
                    className="absolute rounded-2xl shadow-xl overflow-hidden bg-muted cursor-pointer transition-shadow hover:shadow-2xl hover:shadow-primary/30"
                    style={{ width: "70%", height: "50%", left: "5%", zIndex: 3 - pos }}>
                    <ProductFlatlay pv={productVisuals[realIndex]} tabletSize={44} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/15 to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                      <div style={serif} className="text-white text-xs font-semibold leading-tight">{productVisuals[realIndex].name}</div>
                      <div className="text-white/80 text-[10px]">{productVisuals[realIndex].price}</div>
                    </div>
                  </motion.div>
                );
              })}
              <Reveal direction="up" delay={1.2}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="absolute -bottom-4 -right-4 bg-card/90 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl z-20 cursor-default"
                >
                  <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Impact bulan ini</div>
                  <div style={serif} className="text-lg font-semibold text-primary">1.2 kg CO₂ saved</div>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </motion.div>
      </section>

      {/* Ticker */}
      <section className="bg-primary py-4 overflow-hidden border-y border-primary/20">
        <div className="flex gap-10 whitespace-nowrap" style={{ animation: "ticker 40s linear infinite" }}>
          {Array(6).fill(["Biodegradable", "Plastic-Free", "Refill-Friendly", "Low Emission", "Natural Botanicals", "SDG 12", "Carbon Neutral", "Indonesian Harvest"]).flat().map((text, i) => (
            <span key={i} className="text-primary-foreground/80 text-sm font-medium shrink-0 tracking-wide uppercase">
              {text}<span className="mx-6 text-primary-foreground/30">·</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      {/* Stats */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 md:divide-x divide-border">
            {stats.map((s, i) => (
              <Reveal direction="up" delay={i * 0.1} key={s.label}>
                <div className="text-center px-4 md:px-8">
                  <div style={serif} className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-2">{s.value}</div>
                  <div className="text-sm font-medium text-foreground mb-1">{s.unit}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Harvest Collection */}
      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-accent mb-4">Seasonal Harvest Collection</p>
                <h2 style={serif} className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">Alam Terbaik,<br />Dalam Setiap Lembar.</h2>
              </div>
              <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
                Lihat Semua Koleksi <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {productVisuals.map((pv, i) => (
              <Reveal direction="up" delay={0.1 * i} key={pv.id}>
                <Link to="/products" className="group cursor-pointer block">
                  <div className="aspect-[4/5] rounded-3xl relative overflow-hidden mb-4 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/20 bg-muted">
                    <ProductFlatlay pv={pv} tabletSize={60} />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    {/* Family badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-white/95 text-[10px] font-bold tracking-widest uppercase bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {pv.family}
                      </span>
                    </div>
                    {/* Bottom text */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div style={serif} className="text-white text-lg font-semibold leading-tight mb-1">{pv.name}</div>
                      <div className="text-white/80 text-xs font-medium tracking-wide">{pv.price}</div>
                    </div>
                  </div>
                  <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase mb-1">{pv.family}</p>
                  <p className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{pv.name}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* Platform */}
      <section className="py-28 lg:py-36 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full filter blur-[100px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full filter blur-[100px] opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal direction="up">
            <div className="mb-16 max-w-2xl">
              <p className="text-xs font-bold tracking-widest uppercase text-background/40 mb-4">Digital Platform</p>
              <h2 style={serif} className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">Lebih dari Sekadar Produk.</h2>
              <p className="text-background/60 text-lg leading-relaxed">LERA mengintegrasikan teknologi dan ekonomi sirkular ke dalam enam fitur digital yang mengukur dampakmu dan memotivasimu di setiap langkah perjalanan keberlanjutan.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((f, i) => (
              <Reveal direction="up" delay={i * 0.1} key={f.name}>
                <Link to={f.href}>
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group h-full p-8 rounded-3xl border border-background/10 bg-background/5 backdrop-blur-sm hover:border-background/30 hover:bg-background/10 transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-background/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                      <f.Icon className="w-6 h-6 text-background/90 group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 style={serif} className="text-xl font-semibold mb-3">{f.name}</h3>
                    <p className="text-sm text-background/50 leading-relaxed mb-6">{f.desc}</p>
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-background/40 group-hover:text-background transition-colors uppercase">
                      Pelajari lebih <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center mb-20">
              <p className="text-xs font-bold tracking-widest uppercase text-accent mb-4">Mudah & Efektif</p>
              <h2 style={serif} className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">Cara Kerja LERA</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-12 md:gap-10">
            {steps.map((s, i) => (
              <Reveal direction="up" delay={i * 0.2} key={s.step}>
                <div className="relative group">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-border via-border to-transparent z-0 opacity-50" />
                  )}
                  <div style={serif} className="text-7xl md:text-8xl font-bold text-border/50 mb-6 group-hover:text-primary transition-colors duration-500">{s.step}</div>
                  <h3 style={serif} className="text-xl md:text-2xl font-semibold text-foreground mb-4">{s.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-32 lg:py-40 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal direction="up">
            <p className="text-xs font-bold tracking-widest uppercase text-primary-foreground/60 mb-12">Komitmen Kami</p>
            <blockquote style={serif} className="text-3xl md:text-4xl lg:text-5xl font-medium italic leading-tight mb-10">
              "Setiap lembar adalah aksi kecil melawan budaya plastik — dan surat cinta untuk tanah yang menumbuhkannya."
            </blockquote>
            <p className="text-primary-foreground/70 text-sm md:text-base font-medium tracking-wide uppercase">— Pendiri, LERA</p>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 lg:py-36 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-widest uppercase text-accent mb-4">Suara Pengguna</p>
              <h2 style={serif} className="text-4xl md:text-5xl font-semibold text-foreground">Apa Kata Mereka</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Reveal direction="up" delay={i * 0.15} key={t.name}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                >
                  <div className="flex gap-1.5 mb-6">
                    {Array(t.rating).fill(0).map((_, i) => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}
                  </div>
                  <p className="text-base text-foreground/80 leading-relaxed mb-8 italic flex-1">"{t.text}"</p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                    <div>
                      <div className="text-sm font-bold text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{t.role}</div>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full">{t.scent}</div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal direction="up">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-accent mb-4">Cerita & Wawasan</p>
                <h2 style={serif} className="text-4xl md:text-5xl font-semibold text-foreground">Dari Ladang ke Tanganmu</h2>
              </div>
              <Link to="/articles" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
                Semua Artikel <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            {articles.map((a, i) => (
              <Reveal direction="up" delay={i * 0.1} key={a.title}>
                <article className="group cursor-pointer">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-muted mb-6 shadow-sm group-hover:shadow-md transition-all">
                    <img src={a.photo} alt={a.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-md">{a.category}</span>
                    <span className="text-xs font-medium text-muted-foreground">{a.date}</span>
                  </div>
                  <h3 style={serif} className="text-xl font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.excerpt}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 lg:py-40 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <Reveal direction="up">
            <p className="text-xs font-bold tracking-widest uppercase text-accent mb-6">Bergabunglah</p>
            <h2 style={serif} className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">Mulai Perjalanan Bersihmu Hari Ini</h2>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed max-w-xl mx-auto">
              Bergabung dengan 120.000+ konsumen sadar yang telah beralih ke LERA dan membuat dampak nyata bagi planet ini.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all hover:gap-3 shadow-xl shadow-primary/20 active:scale-95">
                Belanja Koleksi <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/platform" className="inline-flex justify-center items-center gap-2 px-8 py-4 border border-border text-foreground rounded-full font-medium hover:border-primary hover:text-primary transition-all bg-background/50 backdrop-blur-sm active:scale-95">
                Jelajahi Platform
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
