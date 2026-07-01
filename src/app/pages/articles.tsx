import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Search } from "lucide-react";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const categories = ["Semua", "Sustainability", "Ingredients", "Carbon Club", "How To", "Dampak", "Komunitas"];

const featured = {
  category: "Sustainability",
  title: "Mengapa Industri Pembersih Adalah Sumber Krisis Plastik yang Sering Diabaikan",
  excerpt: "Setiap tahun, lebih dari 500 juta botol sabun cair berakhir di tempat pembuangan sampah Indonesia. LERA hadir dengan solusi yang lebih radikal dari sekadar daur ulang.",
  author: "Sekar Ayu, CSO LERA",
  date: "20 Juni 2026",
  readTime: "8 mnt",
  photo: "photo-1532996122724-e3c029531320",
};

const articles = [
  { category: "Ingredients", title: "Soapberry (Lerak): Rahasia Pembersih Leluhur Jawa", excerpt: "Digunakan selama berabad-abad dalam ritual mandi keluarga kerajaan Jawa, lerak menawarkan kekuatan pembersih luar biasa dari surfaktan alami milik Indonesia sendiri.", date: "12 Jun 2026", readTime: "5 mnt", photo: "photo-1547514701-42782101795e" },
  { category: "Carbon Club", title: "Para Carbon Champion Terbaik Q2 2026", excerpt: "Komunitas kami secara kolektif mencegah 45 ton CO₂ kuartal ini. Inilah kisah-kisah di balik angka tersebut.", date: "8 Jun 2026", readTime: "4 mnt", photo: "photo-1542601906990-b4d3fb778b09" },
  { category: "How To", title: "5 Cara Kreatif Menggunakan LERA yang Belum Kamu Coba", excerpt: "Dari membersihkan noda membandel hingga merawat tanaman kesayangan, lembaran LERA lebih serbaguna dari yang kamu bayangkan.", date: "5 Jun 2026", readTime: "3 mnt", photo: "photo-1518531933037-91b2f5f229cc" },
  { category: "Dampak", title: "LERA Impact Report 2024: 2.4 Juta Ton CO₂ Berkurang", excerpt: "Laporan dampak tahunan pertama LERA mengungkap angka-angka yang lebih besar dari perkiraan awal kami.", date: "1 Jun 2026", readTime: "10 mnt", photo: "photo-1490750967868-88df5691cc3e" },
  { category: "Ingredients", title: "Patchouli dari Sumatera: Lebih dari Sekadar Aroma", excerpt: "Tanaman akar wangi yang tumbuh di lereng gunung berapi Sumatera menyimpan keajaiban kimia yang menjadikannya bahan perawatan kulit premium.", date: "28 Mei 2026", readTime: "6 mnt", photo: "photo-1515694346937-94d85e41e6f0" },
  { category: "Komunitas", title: "Bergabung dengan 1.000 Green Warriors di Jakarta", excerpt: "Tantangan Carbon Club bulan Juli mengajak anggota Jakarta untuk bersama-sama mengurangi 10 ton emisi dalam 30 hari.", date: "25 Mei 2026", readTime: "4 mnt", photo: "photo-1504674900247-0877df9cc836" },
  { category: "How To", title: "Panduan Lengkap Sistem Pengembalian Kemasan LERA", excerpt: "Step-by-step: dari scan QR hingga mendapatkan poin reward. Semua yang perlu kamu tahu tentang Circular Return System kami.", date: "20 Mei 2026", readTime: "5 mnt", photo: "photo-1556909114-f6e7ad7d3136" },
  { category: "Sustainability", title: "Ekonomi Sirkular: Lebih dari Sekadar Daur Ulang", excerpt: "Mengapa model ekonomi linear 'ambil-pakai-buang' tidak lagi bisa dipertahankan, dan bagaimana LERA merancang model alternatifnya.", date: "15 Mei 2026", readTime: "7 mnt", photo: "photo-1500462918059-b1a0cb512f1d" },
];

export function Articles() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === "Semua" || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">Blog & Wawasan</p>
          <h1 style={serif} className="text-5xl md:text-6xl font-semibold text-foreground mb-6">
            Dari Ladang ke Tanganmu
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Cerita tentang bahan-bahan alami, dampak lingkungan, inovasi teknologi, dan komunitas yang bersama-sama membangun masa depan lebih hijau.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-full text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-6">Artikel Pilihan</p>
          <div className="grid md:grid-cols-2 gap-10 items-center bg-card border border-border rounded-3xl overflow-hidden">
            <div className="aspect-video md:aspect-auto md:h-full min-h-64 bg-muted">
              <img
                src={`https://images.unsplash.com/${featured.photo}?w=700&h=500&fit=crop&auto=format`}
                alt={featured.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs font-medium text-accent">{featured.category}</span>
                <span className="text-xs text-muted-foreground">· {featured.date} · {featured.readTime} baca</span>
              </div>
              <h2 style={serif} className="text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-snug">
                {featured.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">{featured.author}</div>
                <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
                  Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground/70 hover:border-primary/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>Tidak ada artikel yang cocok dengan pencarianmu.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {filtered.map((a) => (
                <article key={a.title} className="group cursor-pointer">
                  <div className="aspect-video rounded-xl overflow-hidden bg-muted mb-4">
                    <img
                      src={`https://images.unsplash.com/${a.photo}?w=600&h=340&fit=crop&auto=format`}
                      alt={a.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-xs font-medium text-accent">{a.category}</span>
                    <span className="text-xs text-muted-foreground">· {a.date} · {a.readTime}</span>
                  </div>
                  <h3 style={serif} className="text-lg font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.excerpt}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-foreground text-background">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 style={serif} className="text-3xl font-semibold mb-4">Jangan Lewatkan Cerita Berikutnya</h2>
          <p className="text-background/55 mb-8 text-sm leading-relaxed">Dapatkan artikel terbaru, update produk, dan inspirasi hidup hijau langsung ke inbox-mu.</p>
          <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email kamu"
              className="flex-1 px-4 py-3 rounded-xl bg-background/10 border border-background/20 text-sm text-background placeholder:text-background/35 focus:outline-none focus:border-background/40 transition-colors"
            />
            <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/80 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
