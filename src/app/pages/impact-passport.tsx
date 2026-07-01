import { Download, Share2, Leaf, Droplets, Package, Wind, Calendar, Award, TrendingUp } from "lucide-react";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const passportData = {
  name: "Anindya Kusuma",
  joined: "Maret 2024",
  level: "Forest Guardian",
  year: 2026,
  stats: [
    { label: "CO₂ Berkurang", value: "14.2 kg", icon: Wind, color: "text-emerald-600", bg: "bg-emerald-50", sub: "Setara tidak mengemudi 84 km" },
    { label: "Plastik Dihindari", value: "38 botol", icon: Package, color: "text-blue-600", bg: "bg-blue-50", sub: "Setara 950 gram plastik" },
    { label: "Air Dihemat", value: "124 liter", icon: Droplets, color: "text-cyan-600", bg: "bg-cyan-50", sub: "Dibanding sabun konvensional" },
    { label: "Lembar Digunakan", value: "284 lembar", icon: Leaf, color: "text-green-600", bg: "bg-green-50", sub: "Rata-rata 23 lembar/bulan" },
  ],
  monthlyData: [
    { month: "Jan", co2: 0.8 },
    { month: "Feb", co2: 1.1 },
    { month: "Mar", co2: 0.9 },
    { month: "Apr", co2: 1.4 },
    { month: "Mei", co2: 1.2 },
    { month: "Jun", co2: 1.6 },
    { month: "Jul", co2: 1.3 },
    { month: "Agu", co2: 1.8 },
    { month: "Sep", co2: 1.5 },
    { month: "Okt", co2: 1.7 },
    { month: "Nov", co2: 1.4 },
    { month: "Des", co2: 0.7 },
  ],
  achievements: [
    { title: "First Clean", desc: "Penggunaan LERA pertama", date: "Mar 2024", icon: "🌱" },
    { title: "Week Warrior", desc: "7 hari berturut-turut", date: "Apr 2024", icon: "🔥" },
    { title: "Sprout Level", desc: "Mencapai 500 poin", date: "Mei 2024", icon: "🌿" },
    { title: "Return Champion", desc: "10 pengembalian kemasan", date: "Jul 2024", icon: "♻️" },
    { title: "Canopy Level", desc: "Mencapai 5.000 poin", date: "Nov 2024", icon: "🌲" },
    { title: "Forest Guardian", desc: "Mencapai 10.000 poin", date: "Feb 2026", icon: "🏕️" },
  ],
  timeline: [
    { date: "15 Jun 2026", action: "Scan QR Kemasan — Citrus Harvest", points: "+15 pts" },
    { date: "12 Jun 2026", action: "Selesai: Tantangan Zero Plastic Week", points: "+150 pts" },
    { date: "8 Jun 2026", action: "Pembelian: Jasmine Bloom × 2", points: "+40 pts" },
    { date: "1 Jun 2026", action: "Bonus Bulanan Forest Guardian", points: "+100 pts" },
    { date: "28 Mei 2026", action: "Scan QR Kemasan — Coffee Revival", points: "+15 pts" },
    { date: "20 Mei 2026", action: "Selesai: Tantangan Community Share", points: "+80 pts" },
  ],
};

const maxCo2 = Math.max(...passportData.monthlyData.map((d) => d.co2));

export function ImpactPassport() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section
        className="py-24"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(44,85,69,0.12) 0%, transparent 60%), #F4EFE6" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">Laporan Dampak Pribadi</p>
          <h1 style={serif} className="text-5xl md:text-6xl font-semibold text-foreground mb-6">
            LERA Impact Passport
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Setiap kontribusi lingkunganmu tercatat, terverifikasi, dan terdokumentasi secara resmi dalam laporan dampak pribadi tahunan yang bisa kamu bagikan ke dunia.
          </p>
        </div>
      </section>

      <section className="py-12 pb-28">
        <div className="max-w-4xl mx-auto px-6">
          {/* Passport Card */}
          <div className="bg-gradient-to-br from-primary to-teal-700 rounded-3xl overflow-hidden mb-8 text-primary-foreground shadow-2xl">
            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="text-primary-foreground/50 text-xs font-medium tracking-widest uppercase mb-2">LERA Impact Passport</div>
                  <div style={serif} className="text-3xl font-semibold">{passportData.name}</div>
                  <div className="text-primary-foreground/65 text-sm mt-1">Anggota sejak {passportData.joined} · {passportData.level}</div>
                </div>
                <div className="text-right">
                  <div className="text-primary-foreground/50 text-xs mb-1">Tahun</div>
                  <div style={serif} className="text-4xl font-bold">{passportData.year}</div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {passportData.stats.map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-2xl p-4">
                    <div style={serif} className="text-2xl font-bold mb-1">{s.value}</div>
                    <div className="text-primary-foreground/60 text-xs leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Bar Chart */}
              <div>
                <div className="text-xs text-primary-foreground/50 mb-3 tracking-widest uppercase">CO₂ Berkurang per Bulan (kg)</div>
                <div className="flex items-end gap-1.5 h-16">
                  {passportData.monthlyData.map((d) => (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-white/30 rounded-t"
                        style={{ height: `${(d.co2 / maxCo2) * 48}px`, minHeight: "4px" }}
                      />
                      <div className="text-[10px] text-primary-foreground/40">{d.month}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary-foreground/50" />
                  <span className="text-xs text-primary-foreground/50">Terverifikasi oleh LERA Platform · lera.id</span>
                </div>
                <div className="text-xs text-primary-foreground/40 font-mono">LRPA-2026-{Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-10">
            <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
              <Download className="w-4 h-4" />
              Unduh PDF
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-border text-foreground rounded-xl text-sm font-medium hover:border-primary hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
              Bagikan
            </button>
          </div>

          {/* Detail Stats */}
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {passportData.stats.map((s) => (
              <div key={s.label} className={`${s.bg} rounded-2xl p-5 flex gap-4 items-center`}>
                <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <div style={serif} className="text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <div className="text-xs text-muted-foreground/70 mt-0.5">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="mb-10">
            <h2 style={serif} className="text-2xl font-semibold text-foreground mb-6">Pencapaian</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {passportData.achievements.map((a) => (
                <div key={a.title} className="bg-card border border-border rounded-2xl p-4 text-center">
                  <div className="text-3xl mb-3">{a.icon}</div>
                  <div className="font-semibold text-foreground text-sm mb-1">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.desc}</div>
                  <div className="text-xs text-accent mt-1 font-medium">{a.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h2 style={serif} className="text-2xl font-semibold text-foreground mb-6">Aktivitas Terbaru</h2>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {passportData.timeline.map((t, i) => (
                <div
                  key={t.date + t.action}
                  className={`flex items-center gap-4 px-6 py-4 ${i < passportData.timeline.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-foreground font-medium">{t.action}</div>
                    <div className="text-xs text-muted-foreground">{t.date}</div>
                  </div>
                  <div className="text-sm font-bold text-primary">{t.points}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
