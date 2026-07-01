import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { 
  LayoutDashboard, ShoppingBag, Leaf, Award, User, LogOut, 
  Settings, ChevronRight, BarChart3, Activity 
} from "lucide-react";
import leraLogo from "../../imports/LERA__Eco-Dissolvable_Cleaning_Sheet.png";
import { useAuth } from "../../lib/auth-context";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: ShoppingBag, label: "My Orders", id: "orders" },
  { icon: Leaf, label: "Impact Passport", id: "impact" },
  { icon: Award, label: "Carbon Club", id: "club" },
  { icon: User, label: "Profile", id: "profile" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-[100svh] bg-secondary/30 flex w-full max-w-[100vw] overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border/60 hidden md:flex flex-col sticky top-0 h-screen shrink-0">
        <div className="p-6 border-b border-border/40">
          <Link to="/" className="flex items-center gap-3">
            <img src={leraLogo} alt="LERA" className="h-8 w-auto object-contain" />
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2 px-3">Menu Utama</p>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-border/40">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-xl text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-card/50 backdrop-blur-md sticky top-0 z-10 border-b border-border/40 px-6 sm:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4 md:hidden">
            <Link to="/">
               <img src={leraLogo} alt="LERA" className="h-6 w-auto object-contain" />
            </Link>
          </div>
          <h2 style={serif} className="hidden md:block text-2xl font-semibold text-foreground">
            {sidebarItems.find(i => i.id === activeTab)?.label || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground">
              <Activity className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border/50">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-foreground leading-tight">{displayName}</p>
                <p className="text-xs text-primary font-medium">Forest Guardian</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary overflow-hidden shrink-0 flex items-center justify-center text-primary font-semibold text-sm">
                {initials}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Welcome banner */}
                  <div className="bg-gradient-to-br from-primary/90 to-accent text-primary-foreground rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-64 bg-white/10 blur-3xl rounded-full transform translate-x-1/3"></div>
                    <div className="relative z-10 max-w-lg">
                      <h3 style={serif} className="text-2xl sm:text-3xl font-semibold mb-2">Welcome back, {displayName}!</h3>
                      <p className="text-primary-foreground/80 mb-6 text-sm leading-relaxed">
                        Anda telah bersama LERA selama 4 bulan. Total dampak karbon Anda minggu ini meningkat 12%. Terus lanjutkan kebiasaan baik ini!
                      </p>
                      <button className="bg-white text-primary px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors shadow-sm">
                        Lihat Laporan Lengkap
                      </button>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      { label: "Total Pembelian", value: "8 Kotak", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
                      { label: "CO₂ Dicegah", value: "24.5 kg", icon: BarChart3, color: "text-primary", bg: "bg-primary/10" },
                      { label: "Poin LERA", value: "1,450", icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" }
                    ].map((m, i) => (
                      <div key={i} className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${m.bg} ${m.color} shrink-0`}>
                          <m.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{m.label}</p>
                          <p style={serif} className="text-2xl font-semibold text-foreground">{m.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border/40 flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">Aktivitas Terakhir</h4>
                      <button className="text-sm text-primary font-medium hover:underline">Lihat Semua</button>
                    </div>
                    <div className="divide-y divide-border/40">
                      {[
                        { title: "Pembelian: Citrus Harvest × 2", date: "2 hari yang lalu", amt: "- Rp 90.000" },
                        { title: "Pengembalian Kemasan Berhasil", date: "5 hari yang lalu", amt: "+ 50 Poin" },
                        { title: "Level Up: Forest Guardian", date: "1 minggu yang lalu", amt: "Reward" },
                      ].map((act, i) => (
                        <div key={i} className="p-4 sm:px-6 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-0.5">{act.title}</p>
                            <p className="text-xs text-muted-foreground">{act.date}</p>
                          </div>
                          <div className="text-sm font-semibold text-foreground">{act.amt}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab !== "overview" && (
                <div className="h-96 flex items-center justify-center bg-card rounded-3xl border border-border/50 border-dashed">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Settings className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Modul Belum Tersedia</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Halaman {sidebarItems.find(i => i.id === activeTab)?.label} sedang dalam tahap pengembangan.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}