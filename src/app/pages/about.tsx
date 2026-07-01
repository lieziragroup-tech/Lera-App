import { Link } from "react-router";
import { ArrowRight, Leaf, Globe, Heart, Recycle, Shield, Zap, Award } from "lucide-react";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const values = [
  { icon: Leaf, title: "Alami Sepenuhnya", desc: "Setiap bahan dipilih karena keamanannya bagi kulit dan lingkungan. Tidak ada bahan kimia keras, tidak ada kompromi." },
  { icon: Recycle, title: "Ekonomi Sirkular", desc: "Dari kemasan yang dapat diisi ulang hingga sistem pengembalian berbasis QR, kami merancang ulang siklus hidup produk konsumen." },
  { icon: Globe, title: "Dampak Terukur", desc: "Impact Passport kami memastikan setiap kontribusi pengguna terdokumentasi secara transparan, bukan sekadar klaim." },
  { icon: Heart, title: "Komunitas Pertama", desc: "Carbon Club kami mengubah keberlanjutan dari kewajiban menjadi gerakan sosial yang menyenangkan dan memberdayakan." },
  { icon: Shield, title: "Bahan Lokal", desc: "Kami bermitra langsung dengan petani dan komunitas adat Indonesia untuk sumber bahan yang etis dan berkelanjutan." },
  { icon: Zap, title: "Inovasi Teknologi", desc: "Sebagai climate-tech consumer brand, kami mengintegrasikan AI dan data untuk membuat dampak lingkungan terasa nyata dan personal." },
];

const milestones = [
  { year: "2022", event: "LERA didirikan di Bandung dengan visi menciptakan produk pembersih tanpa plastik dari bahan lokal Indonesia." },
  { year: "2023", event: "Peluncuran 3 varian pertama: Citrus Harvest, Jasmine Bloom, dan Coconut Breeze. 5.000 pengguna awal dalam 3 bulan." },
  { year: "2024", event: "Ekspansi ke 8 varian Seasonal Harvest Collection. Diluncurkannya platform digital dengan Carbon Impact Tracker." },
  { year: "2026", event: "Mencapai 120.000 pengguna aktif. Peluncuran Circular Return System dan LERA Impact Passport. Ekspansi ke Asia Tenggara." },
];

const team = [
  { name: "Nur Aeni", role: "Team Leader & Product Research Lead", bio: "Mengarahkan visi dan pengembangan produk ramah lingkungan dari awal hingga akhir.", photo: "photo-1531746020798-e6953c6e8e04" },
  { name: "Muhamad Anugrah Putra", role: "Sustainability & Environmental Impact Lead", bio: "Berfokus pada strategi keberlanjutan dan memastikan setiap langkah mengurangi jejak karbon.", photo: "photo-1507003211169-0a1dd7228f2d" },
  { name: "Elsa Syahrany", role: "Business Development & Marketing Lead", bio: "Menggerakkan pertumbuhan bisnis dan menyebarkan kesadaran kampanye lingkungan secara luas.", photo: "photo-1487412720507-e7ab37603c6f" },
  { name: "Raihan Husni M.", role: "Research & Product Development", bio: "Meneliti dan memformulasikan bahan botanis terbaik untuk memberikan hasil yang maksimal.", photo: "photo-1500648767791-00dcc994a43e" },
  { name: "Rafi Musyaffa Ahmad", role: "Digital Platform & AI Developer", bio: "Membangun teknologi dan infrastruktur digital untuk mengukur dampak secara real-time.", photo: "photo-1519085360753-af0119f7cbe7" },
];

export function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="py-32 relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(44,85,69,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(184,115,51,0.08) 0%, transparent 60%), #F4EFE6" }}
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">Tentang LERA</p>
            <h1 style={serif} className="text-5xl md:text-6xl font-semibold text-foreground leading-tight mb-6">
              Kami Percaya<br />
              <em className="not-italic text-primary">Bersih Tidak Harus Mencemari.</em>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              LERA lahir dari satu pertanyaan sederhana: mengapa kita harus menghasilkan limbah plastik untuk membersihkan diri? Kami membangun jawabannya dari tanah Indonesia.
            </p>
            <Link to="/products" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-all hover:gap-3">
              Lihat Produk Kami <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted">
              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&h=700&fit=crop&auto=format" alt="Sustainable nature" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-5 shadow-lg">
              <div style={serif} className="text-3xl font-bold text-primary mb-1">SDG 12</div>
              <div className="text-xs text-muted-foreground">Responsible Consumption<br />& Production</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-background/40 mb-4">Misi Kami</p>
              <h2 style={serif} className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
                Menjadi Climate-Tech Consumer Brand Terdepan di Asia Tenggara
              </h2>
              <p className="text-background/60 leading-relaxed mb-6">
                LERA berkomitmen mendukung SDG 12 PBB melalui integrasi produk fisik yang ramah lingkungan dengan platform digital berbasis data yang memungkinkan setiap pengguna mengukur dan memaksimalkan dampak positifnya.
              </p>
              <p className="text-background/60 leading-relaxed">
                Kami tidak hanya menjual produk — kami membangun ekosistem konsumsi bertanggung jawab yang mengubah kebiasaan sehari-hari menjadi kontribusi nyata bagi kelestarian planet.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Ton CO₂ berkurang", value: "2.4M" },
                { label: "Botol plastik dihindari", value: "3.8M" },
                { label: "Petani lokal bermitra", value: "240+" },
                { label: "Kota di Indonesia", value: "47" },
              ].map((s) => (
                <div key={s.label} className="bg-background/8 rounded-2xl p-6">
                  <div style={serif} className="text-3xl font-bold text-background mb-1">{s.value}</div>
                  <div className="text-xs text-background/50 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">Nilai-Nilai Kami</p>
            <h2 style={serif} className="text-4xl font-semibold text-foreground">Yang Kami Junjung Tinggi</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-2xl p-7 hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 style={serif} className="text-lg font-semibold text-foreground mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-secondary/40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">Perjalanan Kami</p>
            <h2 style={serif} className="text-4xl font-semibold text-foreground">Dari Ide ke Gerakan</h2>
          </div>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-8 relative">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 z-10">
                    <Award className="w-4 h-4 text-primary-foreground" />
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="pb-10">
                  <div style={serif} className="text-2xl font-bold text-primary mb-2">{m.year}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">Tim Kami</p>
            <h2 style={serif} className="text-4xl font-semibold text-foreground">Orang-Orang di Balik LERA</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((t) => (
              <div key={t.name} className="text-center w-full sm:w-[45%] md:w-[30%]">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-muted mx-auto mb-5">
                  <img src={`https://images.unsplash.com/${t.photo}?w=200&h=200&fit=crop&auto=format`} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div style={serif} className="text-lg font-semibold text-foreground mb-1">{t.name}</div>
                <div className="text-xs font-medium text-accent mb-3">{t.role}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 style={serif} className="text-4xl font-semibold mb-6">Bersama, Kita Bisa Mengubah Industri</h2>
          <p className="text-primary-foreground/65 mb-10 leading-relaxed">Setiap lembar LERA yang Anda gunakan adalah bukti bahwa konsumsi yang bertanggung jawab bukan sekadar pilihan — itu adalah masa depan.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-primary rounded-full font-medium hover:bg-primary-foreground/90 transition-all hover:gap-3">
            Mulai Perjalanan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
