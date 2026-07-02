import { Link } from "react-router";
import { ArrowRight, Leaf, Droplets, Sparkles, Package, RefreshCw, Check } from "lucide-react";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const mainSteps = [
  {
    step: "01",
    icon: Package,
    title: "Pilih Lembaranmu",
    subtitle: "Seasonal Harvest Collection — 8 Aroma",
    desc: "Setiap kotak LERA berisi 30 lembar pembersih tipis berukuran kartu kredit. Pilih aroma yang sesuai dengan suasana hati atau kebutuhanmu: mulai dari Citrus Harvest yang menyegarkan di pagi hari hingga Jasmine Bloom yang menenangkan sebelum tidur.",
    tips: ["Satu lembar cukup untuk satu penggunaan penuh", "Simpan di tempat kering, jauh dari kelembapan", "Kadaluarsa 24 bulan dari tanggal produksi"],
    img: "photo-1556909114-f6e7ad7d3136",
  },
  {
    step: "02",
    icon: Droplets,
    title: "Larutkan dengan Air",
    subtitle: "Langsung ke kulit atau di tangan basah",
    desc: "Cukup basahi tangan atau area yang ingin dibersihkan, lalu letakkan satu lembar LERA di atas tangan yang basah. Dalam hitungan detik, lembar akan larut sempurna membentuk busa creamy yang kaya dan lembut. Tidak ada yang tersisa, tidak ada sampah.",
    tips: ["Berfungsi baik di air dingin maupun hangat", "Larut dalam 15-20 detik di air bersuhu ruang", "Satu lembar = formula yang setara dengan 5 ml sabun cair"],
    img: "photo-1556075798-4825dfaaf498",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Bersihkan & Rasakan",
    subtitle: "Busa efektif, formula lembut",
    desc: "Formula LERA bekerja efektif membersihkan kotoran dan kuman tanpa merusak lapisan pelindung alami kulit (skin barrier). Kandungan botanis aktif memberikan manfaat tambahan: melembapkan, mencerahkan, atau menenangkan — tergantung varian yang kamu pilih.",
    tips: ["Bilas hingga bersih dengan air mengalir", "Cocok untuk semua jenis kulit termasuk sensitif", "Formula bebas SLS, paraben, dan pewarna sintetis"],
    img: "photo-1515694346937-94d85e41e6f0",
  },
  {
    step: "04",
    icon: RefreshCw,
    title: "Kembalikan & Isi Ulang",
    subtitle: "Circular Return System",
    desc: "Kemasan LERA dirancang untuk digunakan berulang kali. Ketika habis, scan kode QR di bagian bawah kemasan melalui aplikasi LERA. Kamu akan mendapatkan poin reward, kemasan bisa dikembalikan ke mitra drop-point kami, dan kamu bisa isi ulang dengan harga lebih hemat.",
    tips: ["Kemasan dapat digunakan hingga 50 kali pengisian", "Drop-point tersedia di 200+ lokasi di Indonesia", "Poin reward bisa ditukar untuk refill gratis atau diskon"],
    img: "photo-1532996122724-e3c029531320",
  },
];

const useCases = [
  { title: "Cuci Tangan", desc: "1 lembar untuk cuci tangan menyeluruh yang efektif mengangkat kuman dan kotoran.", icon: "🤲" },
  { title: "Mandi", desc: "2-3 lembar untuk mandi penuh. Busa melimpah yang membersihkan dan merawat kulit.", icon: "🚿" },
  { title: "Cuci Muka", desc: "1 lembar untuk membersihkan wajah dengan lembut. Tidak over-drying.", icon: "😊" },
  { title: "Cuci Piring", desc: "Varian khusus tersedia untuk cuci piring. Efektif mengangkat lemak.", icon: "🍽️" },
  { title: "Perjalanan", desc: "Ringan, tidak tumpah, lolos aturan cairan bandara. Teman perjalanan ideal.", icon: "✈️" },
  { title: "Permukaan", desc: "Larutan LERA bisa digunakan untuk membersihkan permukaan meja, wastafel, dan lainnya.", icon: "🧹" },
];

const faqs = [
  { q: "Apakah LERA aman untuk kulit sensitif?", a: "Ya. Formula LERA bebas dari SLS, paraben, pewarna sintetis, dan fragrance buatan. Telah diuji secara dermatologis dan cocok untuk semua jenis kulit." },
  { q: "Berapa lama satu kotak bertahan?", a: "Satu kotak berisi 30 lembar. Untuk pemakaian cuci tangan 2-3 kali sehari, satu kotak bertahan sekitar 10-15 hari. Untuk mandi harian, sekitar 10 hari." },
  { q: "Bisakah LERA digunakan untuk anak-anak?", a: "Ya, beberapa varian seperti Coconut Breeze dan Jasmine Bloom diformulasikan dengan gentle untuk cocok digunakan anak-anak di atas 3 tahun. Selalu awasi penggunaan." },
  { q: "Bagaimana menyimpan lembaran LERA?", a: "Simpan di tempat kering dan sejuk, jauh dari sumber kelembapan langsung. Jangan simpan di kamar mandi yang lembap tanpa wadah tertutup." },
];

export function HowItWorks() {
  return (
    <div className="pt-16">
      <section
        className="py-28"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(44,85,69,0.12) 0%, transparent 60%), #F4EFE6" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">Panduan Penggunaan</p>
          <h1 style={serif} className="text-5xl md:text-6xl font-semibold text-foreground mb-6 leading-tight">
            Cara Kerja LERA
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Dari lembar tipis ke busa lembut yang efektif — panduan lengkap menggunakan LERA untuk kehidupan sehari-hari yang lebih bersih dan lebih hijau.
          </p>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {mainSteps.map((s, i) => (
            <div key={s.step} className={`grid md:grid-cols-2 gap-14 items-center mb-20 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="flex items-center gap-4 mb-6">
                  <div style={serif} className="text-5xl font-bold text-border">{s.step}</div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <h2 style={serif} className="text-3xl font-semibold text-foreground mb-2">{s.title}</h2>
                <p className="text-sm font-medium text-accent mb-5">{s.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed mb-7">{s.desc}</p>
                <ul className="space-y-2">
                  {s.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`aspect-square rounded-2xl overflow-hidden bg-muted ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <img
                  src={`https://images.unsplash.com/${s.img}?w=600&h=600&fit=crop&auto=format`}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">Serba Bisa</p>
            <h2 style={serif} className="text-4xl font-semibold text-foreground">Satu Lembar, Banyak Kegunaan</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {useCases.map((u) => (
              <div key={u.title} className="bg-card border border-border rounded-2xl p-6">
                <div className="text-3xl mb-4">{u.icon}</div>
                <h3 style={serif} className="text-base font-semibold text-foreground mb-2">{u.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">FAQ</p>
            <h2 style={serif} className="text-4xl font-semibold text-foreground">Pertanyaan Umum</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-3">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-foreground text-background">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Leaf className="w-10 h-10 text-background/30 mx-auto mb-6" />
          <h2 style={serif} className="text-4xl font-semibold mb-6">Siap Memulai?</h2>
          <p className="text-background/55 mb-10 leading-relaxed">Bergabunglah dengan ribuan pengguna yang telah merasakan manfaat ganda dari LERA — kulit yang bersih, bumi yang lebih hijau.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all hover:gap-3">
            Pilih Koleksimu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
