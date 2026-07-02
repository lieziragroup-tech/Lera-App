import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Trophy, Leaf, Flame, Target, Users, Star, Check } from "lucide-react";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const levels = [
  { name: "Seedling", min: 0, max: 500, icon: "🌱", color: "from-lime-400 to-green-500", perks: ["Akses dashboard dasar", "Notifikasi tantangan mingguan"] },
  { name: "Sprout", min: 500, max: 2000, icon: "🌿", color: "from-green-400 to-emerald-600", perks: ["Diskon 5% setiap pembelian", "Badge digital Sprout", "Akses forum komunitas"] },
  { name: "Sapling", min: 2000, max: 5000, icon: "🌳", color: "from-teal-400 to-cyan-600", perks: ["Diskon 10%", "1 refill gratis per bulan", "Early access produk baru", "Badge Sapling"] },
  { name: "Canopy", min: 5000, max: 10000, icon: "🌲", color: "from-emerald-600 to-green-800", perks: ["Diskon 15%", "2 refill gratis per bulan", "Priority customer support", "Undangan event eksklusif"] },
  { name: "Forest Guardian", min: 10000, max: Infinity, icon: "🏕️", color: "from-green-800 to-teal-900", perks: ["Diskon 20%", "Refill gratis unlimited", "Co-creation produk baru", "Ambassador LERA resmi", "Impact Passport premium"] },
];

const challenges = [
  { title: "Zero Plastic Week", desc: "Gunakan LERA selama 7 hari berturut-turut tanpa membeli sabun plastik.", points: 150, deadline: "5 hari lagi", participants: 2840, difficulty: "Medium", icon: "🎯" },
  { title: "Refer & Grow", desc: "Ajak 3 teman bergabung LERA dan verifikasi pembelian pertama mereka.", points: 300, deadline: "14 hari lagi", participants: 1220, difficulty: "Hard", icon: "👥" },
  { title: "Carbon Log Sprint", desc: "Catat 30 penggunaan berturut-turut di Carbon Impact Tracker.", points: 200, deadline: "21 hari lagi", participants: 4560, difficulty: "Easy", icon: "📊" },
  { title: "Community Share", desc: "Bagikan Impact Passport-mu di media sosial dan tag @leraid.", points: 80, deadline: "Permanen", participants: 8920, difficulty: "Easy", icon: "📱" },
  { title: "First Return", desc: "Kembalikan kemasan LERA pertamamu melalui Circular Return System.", points: 120, deadline: "Permanen", participants: 15600, difficulty: "Easy", icon: "♻️" },
  { title: "Botanical Explorer", desc: "Coba dan review minimal 5 varian dari Seasonal Harvest Collection.", points: 250, deadline: "30 hari lagi", participants: 780, difficulty: "Medium", icon: "🌿" },
];

const leaderboard = [
  { rank: 1, name: "Anindya K.", city: "Jakarta", points: 12840, level: "Forest Guardian", icon: "🏕️" },
  { rank: 2, name: "Bagas P.", city: "Yogyakarta", points: 11200, level: "Forest Guardian", icon: "🏕️" },
  { rank: 3, name: "Citra M.", city: "Surabaya", points: 9750, level: "Canopy", icon: "🌲" },
  { rank: 4, name: "Dani R.", city: "Bandung", points: 8320, level: "Canopy", icon: "🌲" },
  { rank: 5, name: "Eka S.", city: "Bali", points: 7890, level: "Canopy", icon: "🌲" },
  { rank: 6, name: "Farah N.", city: "Medan", points: 6540, level: "Sapling", icon: "🌳" },
  { rank: 7, name: "Galih W.", city: "Semarang", points: 5210, level: "Sapling", icon: "🌳" },
  { rank: 8, name: "Hana L.", city: "Makassar", points: 4890, level: "Sapling", icon: "🌳" },
];

const difficultyColor: Record<string, string> = {
  Easy: "text-green-600 bg-green-50",
  Medium: "text-amber-600 bg-amber-50",
  Hard: "text-red-600 bg-red-50",
};

export function CarbonClub() {
  const [activeTab, setActiveTab] = useState<"challenges" | "levels" | "leaderboard">("challenges");

  return (
    <div className="pt-16">
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 20% 60%, rgba(44,85,69,0.2) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(184,115,51,0.1) 0%, transparent 55%), #F4EFE6" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/6 text-xs font-medium text-primary mb-6">
            <Trophy className="w-3 h-3" />
            Bergabung · Berkompetisi · Berdampak
          </div>
          <h1 style={serif} className="text-5xl md:text-6xl font-semibold text-foreground mb-6 leading-tight">
            Carbon Club
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            Komunitas gamifikasi keberlanjutan LERA. Selesaikan tantangan, naiki level, dan jadilah bagian dari gerakan nyata yang membuat perbedaan terukur bagi iklim Indonesia.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-all hover:gap-3">
              Bergabung Sekarang <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-6 mt-14 max-w-lg mx-auto">
            {[
              { v: "120K+", l: "Anggota aktif" },
              { v: "4.8M", l: "Total poin diraih" },
              { v: "45T", l: "Ton CO₂ dicegah" },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div style={serif} className="text-2xl font-bold text-primary">{v}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-16 z-40 bg-background/90 backdrop-blur-sm border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2">
            {(["challenges", "levels", "leaderboard"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium capitalize transition-all ${
                  activeTab === tab ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-muted"
                }`}
              >
                {tab === "challenges" ? "Tantangan" : tab === "levels" ? "Level" : "Peringkat"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 pb-28">
        <div className="max-w-7xl mx-auto px-6">
          {/* Challenges */}
          {activeTab === "challenges" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 style={serif} className="text-3xl font-semibold text-foreground">Tantangan Aktif</h2>
                  <p className="text-muted-foreground text-sm mt-1">Selesaikan tantangan untuk mendapatkan poin dan naiki level keanggotaan</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {challenges.map((c) => (
                  <div key={c.title} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{c.icon}</div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColor[c.difficulty]}`}>
                        {c.difficulty}
                      </span>
                    </div>
                    <h3 style={serif} className="text-lg font-semibold text-foreground mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{c.desc}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {c.participants.toLocaleString()} peserta</span>
                      <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-orange-500" /> {c.deadline}</span>
                    </div>
                    <button className="w-full flex items-center justify-between px-4 py-2.5 bg-primary/8 hover:bg-primary hover:text-primary-foreground text-primary rounded-xl text-sm font-medium transition-all group">
                      <span>Ikuti Tantangan</span>
                      <span className="flex items-center gap-1 font-bold">
                        +{c.points} pts
                        <Star className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Levels */}
          {activeTab === "levels" && (
            <div>
              <div className="mb-8">
                <h2 style={serif} className="text-3xl font-semibold text-foreground mb-2">Sistem Level Keanggotaan</h2>
                <p className="text-muted-foreground text-sm">Kumpulkan poin dari setiap tantangan, pembelian, dan pengembalian kemasan untuk naik level</p>
              </div>
              <div className="space-y-4">
                {levels.map((l, i) => (
                  <div key={l.name} className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className={`bg-gradient-to-r ${l.color} p-6 text-white`}>
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{l.icon}</div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 style={serif} className="text-xl font-semibold">{l.name}</h3>
                            {i === 0 && <span className="text-xs px-2.5 py-0.5 bg-white/25 rounded-full">Level Awal</span>}
                          </div>
                          <div className="text-white/70 text-sm mt-1">
                            {l.max === Infinity ? `${l.min.toLocaleString()}+ poin` : `${l.min.toLocaleString()} – ${l.max.toLocaleString()} poin`}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-medium text-muted-foreground mb-3 tracking-widest uppercase">Keuntungan</p>
                      <div className="grid md:grid-cols-2 gap-2">
                        {l.perks.map((perk) => (
                          <div key={perk} className="flex items-center gap-2 text-sm text-foreground">
                            <Check className="w-4 h-4 text-primary shrink-0" />
                            {perk}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leaderboard */}
          {activeTab === "leaderboard" && (
            <div>
              <div className="mb-8">
                <h2 style={serif} className="text-3xl font-semibold text-foreground mb-2">Peringkat Carbon Club</h2>
                <p className="text-muted-foreground text-sm">Top contributors bulan Juni 2026</p>
              </div>

              {/* Top 3 */}
              <div className="grid md:grid-cols-3 gap-5 mb-8">
                {leaderboard.slice(0, 3).map((u) => (
                  <div
                    key={u.rank}
                    className={`bg-card border rounded-2xl p-6 text-center ${u.rank === 1 ? "border-amber-300 bg-amber-50/50" : "border-border"}`}
                  >
                    <div className="text-4xl mb-3">{u.rank === 1 ? "🥇" : u.rank === 2 ? "🥈" : "🥉"}</div>
                    <div className="text-3xl mb-2">{u.icon}</div>
                    <div style={serif} className="text-lg font-semibold text-foreground mb-1">{u.name}</div>
                    <div className="text-xs text-muted-foreground mb-3">{u.city}</div>
                    <div style={serif} className="text-2xl font-bold text-primary">{u.points.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">poin</div>
                  </div>
                ))}
              </div>

              {/* Rest */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                {leaderboard.slice(3).map((u, i) => (
                  <div
                    key={u.rank}
                    className={`flex items-center gap-4 px-6 py-4 ${i < leaderboard.slice(3).length - 1 ? "border-b border-border" : ""}`}
                  >
                    <div className="w-8 text-center font-bold text-muted-foreground text-sm">#{u.rank}</div>
                    <div className="text-xl">{u.icon}</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.city} · {u.level}</div>
                    </div>
                    <div style={serif} className="text-lg font-bold text-primary">{u.points.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
