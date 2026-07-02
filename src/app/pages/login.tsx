import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { Leaf, Mail, Lock, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

function getLoginErrorMessage(code: string) {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email atau password salah.";
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/too-many-requests":
      return "Terlalu banyak percobaan. Coba lagi beberapa saat lagi.";
    default:
      return "Gagal masuk. Silakan coba lagi.";
  }
}

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (!cred.user.emailVerified) {
        await auth.signOut();
        setError("Akun Anda belum terverifikasi. Silakan klik link aktivasi yang telah dikirim ke email Anda.");
        return;
      }
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(getLoginErrorMessage(err?.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
        <Link 
          to="/" 
          className="fixed top-6 left-6 md:top-8 md:left-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary text-sm font-medium text-muted-foreground hover:text-foreground transition-all z-50"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>

        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground mb-8 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              <Leaf className="w-7 h-7" />
            </Link>
            <h1 style={serif} className="text-4xl font-bold text-foreground mb-3">Selamat Datang Kembali.</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Lanjutkan langkah kecilmu menuju masa depan rendah karbon bersama LERA.
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-5 py-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-start gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-secondary/50 border border-border rounded-xl focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 text-foreground"
                  placeholder="halo@bumi.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
                <Link to="#" className="text-xs font-medium text-primary hover:underline">Lupa Password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-secondary/50 border border-border rounded-xl focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 text-foreground"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-4 mt-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Sedang Masuk...
                </>
              ) : (
                <>
                  Masuk ke Akun <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Belum bergabung? <Link to="/signup" viewTransition className="text-primary font-semibold hover:underline">Daftar sekarang</Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex w-1/2 relative bg-[#1A3326] overflow-hidden items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-10000 hover:scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-black/60" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 p-16 max-w-xl text-white"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium mb-8 tracking-widest uppercase">
            <Leaf className="w-3.5 h-3.5" />
            LERA Carbon Club
          </div>
          <h2 style={serif} className="text-5xl font-semibold leading-tight mb-6">
            "Satu langkah kecilmu hari ini, mewariskan bumi yang lebih baik esok hari."
          </h2>
          <p className="text-white/70 leading-relaxed text-lg">
            Masuk untuk memantau dampak lingkunganmu, menukar poin kemasan, dan menikmati fasilitas eksklusif anggota.
          </p>
        </motion.div>
      </div>
    </div>
  );
}