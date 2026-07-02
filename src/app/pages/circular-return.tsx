import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, QrCode, MapPin, Gift, Truck, Check, Leaf, Package, Loader2, PartyPopper } from "lucide-react";
import { useAuth } from "../../lib/auth-context";
import { createReturn, type ReturnSize } from "../../lib/firestore";
import { LERA_WHATSAPP_NUMBER, openWhatsApp, reserveWhatsAppWindow } from "../../lib/whatsapp";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const steps = [
  {
    step: "01",
    icon: Package,
    title: "Habiskan Lembaranmu",
    desc: "Gunakan semua lembaran LERA hingga habis. Kemasan kosong tetap memiliki nilai — jangan dibuang!",
    detail: "Kemasan LERA terbuat dari material food-grade yang bisa digunakan hingga 50 kali pengisian ulang.",
  },
  {
    step: "02",
    icon: QrCode,
    title: "Scan QR Code",
    desc: "Buka aplikasi LERA atau website, pilih 'Circular Return', lalu scan QR code di bagian bawah kemasan kosong.",
    detail: "QR code unik per kemasan memastikan setiap pengembalian terverifikasi dan poin teraih tepat ke akunmu.",
  },
  {
    step: "03",
    icon: MapPin,
    title: "Pilih Metode Pengembalian",
    desc: "Antar langsung ke drop-point terdekat atau pesan layanan pickup dari rumah (tersedia di kota tertentu).",
    detail: "200+ drop-point tersebar di minimarket, apotek, dan mitra LERA di seluruh Indonesia.",
  },
  {
    step: "04",
    icon: Gift,
    title: "Dapatkan Poin & Reward",
    desc: "Poin reward langsung masuk ke akun Carbon Club-mu setelah pengembalian terverifikasi.",
    detail: "Poin bisa ditukar untuk refill gratis, diskon pembelian, atau didonasikan ke program lingkungan mitra.",
  },
];

const pointsTable = [
  { action: "Kembalikan 1 kemasan (ukuran S)", points: 15 },
  { action: "Kembalikan 1 kemasan (ukuran M)", points: 20 },
  { action: "Kembalikan 1 kemasan (ukuran L)", points: 30 },
  { action: "Kembalikan 5 kemasan sekaligus", points: 120, bonus: "+20 bonus" },
  { action: "Kembalikan 10 kemasan sekaligus", points: 280, bonus: "+30 bonus" },
  { action: "Kembalikan kemasan teman (referral)", points: 50 },
];

const rewardOptions = [
  { title: "Refill Gratis", desc: "Tukar 200 poin untuk 1 refill varian pilihanmu", icon: "🌿", cost: "200 pts" },
  { title: "Diskon Pembelian", desc: "Diskon 10% untuk pesanan berikutnya", icon: "🏷️", cost: "150 pts" },
  { title: "Upgrade Gratis", desc: "Upgrade ke kemasan lebih besar tanpa biaya tambahan", icon: "📦", cost: "300 pts" },
  { title: "Donasi Lingkungan", desc: "Donasikan ke program penanaman mangrove mitra LERA", icon: "🌳", cost: "100 pts" },
  { title: "LERA Merchandise", desc: "Tote bag atau tumbler eksklusif dari koleksi LERA", icon: "🎁", cost: "500 pts" },
  { title: "Carbon Club Level Up", desc: "Boost poin untuk naik level lebih cepat", icon: "⚡", cost: "50 pts" },
];

const dropPoints = [
  { city: "Jakarta", count: 42, areas: "Jaksel, Jakpus, Jakbar, Jakut, Jaktim" },
  { city: "Bandung", count: 18, areas: "Dago, Cihampelas, Buah Batu, Antapani" },
  { city: "Surabaya", count: 15, areas: "Gubeng, Rungkut, Genteng, Wonokromo" },
  { city: "Yogyakarta", count: 12, areas: "Sleman, Kota Yogya, Bantul, Wates" },
  { city: "Bali", count: 14, areas: "Denpasar, Kuta, Ubud, Seminyak, Sanur" },
  { city: "Medan", count: 10, areas: "Medan Kota, Helvetia, Sunggal, Petisah" },
  { city: "Makassar", count: 8, areas: "Panakkukang, Tamalanrea, Gowa, Rappocini" },
  { city: "Lainnya", count: "81+", areas: "Semarang, Palembang, Balikpapan, dll." },
];

const sizeLabels: Record<ReturnSize, string> = {
  S: "Ukuran S — 15 pts/kemasan",
  M: "Ukuran M — 20 pts/kemasan",
  L: "Ukuran L — 30 pts/kemasan",
};

export function CircularReturn() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [size, setSize] = useState<ReturnSize>("M");
  const [qty, setQty] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ points: number; co2Saved: number } | null>(null);

  const handleSubmitReturn = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setError("");
    setSubmitting(true);

    // Reserve the tab before any await so the popup isn't blocked.
    const waWindow = reserveWhatsAppWindow();

    try {
      const userName = user.displayName || user.email || "Pelanggan LERA";
      const returnEntry = await createReturn({ uid: user.uid, userName, size, qty });

      const message = `Halo LERA! ♻️ Saya ingin mengajukan pengembalian kemasan:\n\n📦 Ukuran: ${size} x${qty}\n⭐ Poin: +${returnEntry.points}\n👤 Atas nama: ${userName}\n🆔 ID Pengembalian: ${returnEntry.id}\n\nMohon info drop-point terdekat atau jadwal pickup-nya. Terima kasih! 🌿`;

      openWhatsApp(waWindow, LERA_WHATSAPP_NUMBER, message);
      setSuccess({ points: returnEntry.points, co2Saved: returnEntry.co2Saved });
      setQty(1);
    } catch (err) {
      console.error("Return submission failed:", err);
      waWindow?.close();
      setError("Gagal mengajukan pengembalian. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 25% 60%, rgba(44,85,69,0.18) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(184,115,51,0.1) 0%, transparent 55%), #F4EFE6" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/6 text-xs font-medium text-primary mb-6">
            <QrCode className="w-3 h-3" />
            Ekonomi Sirkular dalam Aksi
          </div>
          <h1 style={serif} className="text-5xl md:text-6xl font-semibold text-foreground mb-6 leading-tight">
            Circular Return System
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            Kemasan kosongmu bukan sampah — itu adalah tiket reward. Scan, kembalikan, dan dapatkan poin untuk ditukar dengan refill gratis atau reward lainnya.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-all hover:gap-3">
              Mulai dengan LERA <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">Prosesnya Mudah</p>
            <h2 style={serif} className="text-4xl font-semibold text-foreground">Cara Kerja Circular Return</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="bg-card border border-border rounded-2xl p-7 relative overflow-hidden">
                <div style={serif} className="absolute top-4 right-6 text-7xl font-bold text-border/50 select-none">
                  {s.step}
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 relative z-10">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 style={serif} className="text-xl font-semibold text-foreground mb-3 relative z-10">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4 relative z-10">{s.desc}</p>
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 relative z-10">
                  <p className="text-xs text-primary/80 leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit a Return — real transaction */}
      <section className="py-24 bg-secondary/40">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">Ajukan Sekarang</p>
            <h2 style={serif} className="text-4xl font-semibold text-foreground">Kembalikan Kemasanmu</h2>
          </div>

          <div className="bg-card border border-border rounded-2xl p-7">
            {success ? (
              <div className="text-center py-6">
                <PartyPopper className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 style={serif} className="text-xl font-semibold text-foreground mb-2">Pengajuan Terkirim!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Kamu mendapatkan <span className="font-semibold text-primary">+{success.points} poin</span> dan menghemat{" "}
                  <span className="font-semibold text-primary">{success.co2Saved} kg CO₂</span>. Cek riwayatnya di dashboard-mu.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setSuccess(null)}
                    className="px-5 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
                  >
                    Ajukan Lagi
                  </button>
                  <Link
                    to="/dashboard"
                    className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Lihat di Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-4 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Ukuran Kemasan</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.keys(sizeLabels) as ReturnSize[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => setSize(s)}
                          className={`py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                            size === s
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-foreground/70 hover:border-primary/40"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{sizeLabels[size]}</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Jumlah Kemasan</label>
                    <div className="flex items-center border border-border rounded-xl overflow-hidden w-fit">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2.5 text-sm hover:bg-muted transition-colors">−</button>
                      <span className="px-5 py-2.5 text-sm font-medium border-x border-border">{qty}</span>
                      <button onClick={() => setQty(qty + 1)} className="px-4 py-2.5 text-sm hover:bg-muted transition-colors">+</button>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitReturn}
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Memproses...
                      </>
                    ) : (
                      <>Ajukan via WhatsApp</>
                    )}
                  </button>
                  <p className="text-xs text-center text-muted-foreground">
                    {user
                      ? "Poin akan tersimpan di dashboard-mu, lalu kamu diarahkan ke WhatsApp untuk atur drop-point/pickup."
                      : "Masuk dulu ke akunmu untuk mengajukan pengembalian."}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Points Table */}
      <section className="py-24 bg-secondary/40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">Tabel Poin</p>
            <h2 style={serif} className="text-4xl font-semibold text-foreground">Berapa Poin yang Kamu Dapatkan?</h2>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-6 py-4 bg-primary/5 border-b border-border">
              <div className="grid grid-cols-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                <span>Aksi</span>
                <span className="text-right">Poin</span>
              </div>
            </div>
            {pointsTable.map((p, i) => (
              <div
                key={p.action}
                className={`px-6 py-4 grid grid-cols-2 items-center ${i < pointsTable.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{p.action}</span>
                </div>
                <div className="text-right">
                  <span style={serif} className="text-lg font-bold text-primary">+{p.points}</span>
                  {p.bonus && <span className="text-xs text-accent ml-1.5 font-medium">{p.bonus}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reward Options */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">Tukar Poinmu</p>
            <h2 style={serif} className="text-4xl font-semibold text-foreground">Reward yang Bisa Kamu Raih</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {rewardOptions.map((r) => (
              <div key={r.title} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
                <div className="text-3xl mb-4">{r.icon}</div>
                <div className="flex items-start justify-between mb-2">
                  <h3 style={serif} className="text-lg font-semibold text-foreground">{r.title}</h3>
                  <span className="text-xs font-bold text-primary bg-primary/8 px-2.5 py-1 rounded-full shrink-0 ml-2">{r.cost}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drop Points */}
      <section className="py-24 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-background/40 mb-3">Jaringan Kami</p>
            <h2 style={serif} className="text-4xl font-semibold mb-3">200+ Drop-Point di Indonesia</h2>
            <p className="text-background/55 text-sm">Temukan drop-point LERA terdekat di kotamu. Tersedia di minimarket, apotek, dan mitra resmi kami.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {dropPoints.map((d) => (
              <div key={d.city} className="border border-background/15 rounded-2xl p-5 hover:border-background/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <span style={serif} className="font-semibold text-lg">{d.city}</span>
                </div>
                <div style={serif} className="text-3xl font-bold text-accent mb-1">{d.count}</div>
                <div className="text-xs text-background/40 leading-relaxed">{d.areas}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-background/70" />
            </div>
            <div>
              <div className="text-sm font-semibold text-background mb-0.5">Layanan Pickup Rumah</div>
              <div className="text-xs text-background/50">Tersedia di Jakarta, Bandung, Surabaya, dan Yogyakarta. Minimum 3 kemasan per pickup. Jadwalkan via aplikasi.</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-secondary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Leaf className="w-10 h-10 text-primary/30 mx-auto mb-6" />
          <h2 style={serif} className="text-4xl font-semibold text-foreground mb-5">
            Mulai Siklus Hijaumu
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Setiap kemasan yang kamu kembalikan adalah satu langkah lebih jauh dari ekonomi linear menuju masa depan sirkular.
          </p>
          <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all hover:gap-3">
            Dapatkan LERA-mu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
