import { Link } from "react-router";
import { ArrowRight, BarChart3, Recycle, Award, Users, Bot, Leaf, Check } from "lucide-react";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const features = [
  {
    id: "carbon-tracker",
    icon: BarChart3,
    name: "Carbon Impact Tracker",
    tagline: "Lihat dampakmu secara real-time",
    desc: "Dashboard interaktif yang menampilkan penghematan sumber daya setiap kali kamu menggunakan LERA dibandingkan sabun cair konvensional. Data diperbarui secara otomatis.",
    capabilities: [
      "Estimasi CO₂ berkurang per penggunaan",
      "Akumulasi plastik yang dihindari (gram & botol)",
      "Penghematan air dibanding sabun konvensional",
      "Grafik tren bulanan dan tahunan",
      "Perbandingan dengan rata-rata nasional",
    ],
    href: "/platform",
    color: "from-emerald-600 to-teal-700",
    light: "bg-emerald-50",
    accent: "text-emerald-700",
  },
  {
    id: "circular-return",
    icon: Recycle,
    name: "Circular Return System",
    tagline: "Kembalikan. Dapatkan poin. Ulangi.",
    desc: "Sistem berbasis pemindaian QR code yang memberikan insentif nyata kepada pengguna yang mengembalikan kemasan kosong ke mitra drop-point atau via jasa penjemputan.",
    capabilities: [
      "Scan QR di kemasan kosong untuk verifikasi",
      "Poin reward otomatis ke akun LERA",
      "200+ drop-point di seluruh Indonesia",
      "Opsi pickup dari rumah (kota tertentu)",
      "Tukar poin untuk refill gratis atau diskon",
    ],
    href: "/circular-return",
    color: "from-amber-600 to-orange-700",
    light: "bg-amber-50",
    accent: "text-amber-700",
  },
  {
    id: "impact-passport",
    icon: Award,
    name: "LERA Impact Passport",
    tagline: "Dampakmu, tercatat selamanya",
    desc: "Laporan dampak pribadi tahunan berbentuk digital yang dapat diunduh dan dibagikan. Setiap kontribusi pengguna diverifikasi dan terdokumentasi secara resmi.",
    capabilities: [
      "Laporan tahunan dalam format PDF premium",
      "Badge dan sertifikat dampak lingkungan",
      "Kartu dampak shareable untuk media sosial",
      "Timeline aktivitas sepanjang tahun",
      "Akumulasi multi-tahun dari bergabung pertama",
    ],
    href: "/impact-passport",
    color: "from-violet-600 to-purple-700",
    light: "bg-violet-50",
    accent: "text-violet-700",
  },
  {
    id: "carbon-club",
    icon: Users,
    name: "Carbon Club",
    tagline: "Berkelanjutan lebih seru bersama",
    desc: "Komunitas gamifikasi dengan tantangan mingguan, sistem level keanggotaan, dan leaderboard yang membuat perjalanan berkelanjutan menjadi motivatif dan menyenangkan.",
    capabilities: [
      "5 level keanggotaan: Seedling → Forest Guardian",
      "Tantangan mingguan & misi komunitas",
      "Leaderboard nasional dan regional",
      "Reward eksklusif per level",
      "Forum diskusi dan berbagi tips",
    ],
    href: "/carbon-club",
    color: "from-blue-600 to-indigo-700",
    light: "bg-blue-50",
    accent: "text-blue-700",
  },
  {
    id: "ai-assistant",
    icon: Bot,
    name: "AI Eco Assistant",
    tagline: "Asisten cerdasmu untuk hidup hijau",
    desc: "Asisten berbasis AI yang memberikan panduan personal tentang gaya hidup ramah lingkungan, rekomendasi produk, dan kalkulasi dampak berdasarkan kebiasaan penggunamu.",
    capabilities: [
      "Rekomendasi produk berdasarkan kebutuhan",
      "Kalkulator dampak karbon personal",
      "Tips gaya hidup sustainable yang dipersonalisasi",
      "Edukasi bahan dan formula LERA",
      "Jawaban instant 24/7",
    ],
    href: "/ai-assistant",
    color: "from-rose-600 to-pink-700",
    light: "bg-rose-50",
    accent: "text-rose-700",
  },
  {
    id: "eco-community",
    icon: Leaf,
    name: "Eco Community Hub",
    tagline: "Terhubung dengan sesama pejuang hijau",
    desc: "Platform sosial untuk berbagi pencapaian, berkolaborasi dalam kampanye lingkungan, dan terhubung dengan komunitas konsumen sadar se-Indonesia.",
    capabilities: [
      "Feed cerita dan pencapaian anggota",
      "Kolaborasi kampanye dan event lingkungan",
      "Program kemitraan dengan brand eco lainnya",
      "Koneksi dengan komunitas lokal",
      "Workshop dan webinar eksklusif",
    ],
    href: "/platform",
    color: "from-green-600 to-emerald-700",
    light: "bg-green-50",
    accent: "text-green-700",
  },
];

export function Platform() {
  return (
    <div className="pt-16">
      <section
        className="py-32 relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(44,85,69,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(184,115,51,0.08) 0%, transparent 60%), #F4EFE6" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">Platform Digital LERA</p>
          <h1 style={serif} className="text-5xl md:text-6xl font-semibold text-foreground mb-6 leading-tight">
            Teknologi untuk<br />
            <em className="not-italic text-primary">Dampak Nyata.</em>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            Enam fitur digital terintegrasi yang mengubah setiap tindakan konsumsimu menjadi data, poin, dan cerita perubahan yang terukur.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {features.map((f) => (
              <span key={f.id} className="px-3.5 py-1.5 bg-card border border-border rounded-full text-xs font-medium text-foreground/70">
                {f.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Banner */}
      <section className="py-10 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-primary-foreground/50 mb-1">Komitmen Global</p>
            <h2 style={serif} className="text-2xl font-semibold">Mendukung UN SDG 12</h2>
            <p className="text-primary-foreground/65 text-sm mt-1">Responsible Consumption & Production</p>
          </div>
          <p className="text-primary-foreground/70 text-sm max-w-md leading-relaxed">
            Platform LERA dirancang secara khusus untuk memberdayakan konsumen Indonesia menuju pola konsumsi yang lebih bertanggung jawab, sejalan dengan target PBB untuk 2030.
          </p>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-16 pb-28">
        <div className="max-w-7xl mx-auto px-6">
          {features.map((f, i) => (
            <div
              key={f.id}
              id={f.id}
              className={`grid md:grid-cols-2 gap-14 items-center py-16 ${i < features.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className={`rounded-3xl overflow-hidden aspect-video flex items-center justify-center bg-gradient-to-br ${f.color}`}>
                  <div className="text-center text-white p-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-5">
                      <f.icon className="w-8 h-8 text-white" />
                    </div>
                    <div style={serif} className="text-2xl font-semibold mb-2">{f.name}</div>
                    <div className="text-white/70 text-sm">{f.tagline}</div>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${f.light} ${f.accent} text-xs font-medium mb-5`}>
                  <f.icon className="w-3.5 h-3.5" />
                  {f.name}
                </div>
                <h2 style={serif} className="text-3xl md:text-4xl font-semibold text-foreground mb-4 leading-snug">
                  {f.tagline}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-7">{f.desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {f.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
                <Link
                  to={f.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all hover:gap-3"
                >
                  Pelajari Lebih <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-24 bg-secondary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">Mulai Sekarang</p>
          <h2 style={serif} className="text-4xl md:text-5xl font-semibold text-foreground mb-6">
            Semua Fitur. Satu Platform.
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Bergabung dan akses seluruh ekosistem digital LERA secara gratis dengan setiap pembelian produk pertamamu.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all hover:gap-3"
          >
            Mulai dengan Koleksi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
