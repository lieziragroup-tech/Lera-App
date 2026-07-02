import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { Leaf, Mail, Lock, User, ArrowRight, ArrowLeft, Loader2, PartyPopper } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

function getSignupErrorMessage(code: string) {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email ini sudah terdaftar. Silakan masuk atau gunakan email lain.";
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/weak-password":
      return "Password terlalu lemah. Gunakan minimal 6 karakter.";
    default:
      return "Terjadi kesalahan saat membuat akun. Silakan coba lagi.";
  }
}

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

export function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim() || !password) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: fullName.trim() });
      await sendEmailVerification(credential.user);
      await signOut(auth);

      setSuccess(true);
    } catch (err: any) {
      setError(getSignupErrorMessage(err?.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-background flex-row-reverse">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
        <Link 
          to="/" 
          className="fixed top-6 left-6 md:top-8 md:left-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary text-sm font-medium text-muted-foreground hover:text-foreground transition-all z-50"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground mb-8 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              <Leaf className="w-7 h-7" />
            </Link>
            <h1 style={serif} className="text-4xl font-bold text-foreground mb-3">Mulai Perubahan.</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Bergabunglah dengan ribuan orang lainnya yang telah beralih ke gaya hidup yang lebih baik untuk bumi.
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

          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-primary/5 border border-primary/20 p-8 rounded-3xl relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
              <PartyPopper className="w-12 h-12 text-primary mx-auto mb-5 relative z-10" />
              <h3 style={serif} className="text-2xl font-bold text-foreground mb-3 relative z-10">Langkah Terakhir!</h3>
              <p className="text-sm text-muted-foreground mb-8 relative z-10 leading-relaxed">
                Kami telah mengirimkan link aktivasi ke <span className="font-semibold text-foreground">{email}</span>. Silakan klik link tersebut untuk memverifikasi akun Anda.
              </p>
              <Link to="/login" viewTransition className="w-full flex items-center justify-center py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all relative z-10 shadow-lg shadow-primary/25">
                Masuk ke Akun
              </Link>
            </motion.div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Nama Lengkap</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-secondary/50 border border-border rounded-xl focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 text-foreground"
                    placeholder="Nama Anda"
                    autoComplete="name"
                  />
                </div>
              </div>

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
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-secondary/50 border border-border rounded-xl focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50 text-foreground"
                    placeholder="Minimal 6 karakter"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full py-4 mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Mendaftarkan...
                  </>
                ) : (
                  <>
                    Daftar Sekarang <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          )}

          {!success && (
            <p className="mt-10 text-center text-sm text-muted-foreground">
              Sudah memiliki akun? <Link to="/login" viewTransition className="text-primary font-semibold hover:underline">Masuk di sini</Link>
            </p>
          )}
        </motion.div>
      </div>
      <div className="hidden lg:flex w-1/2 relative bg-[#1A3326] overflow-hidden items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-10000 hover:scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-primary/60 to-primary/30" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 p-16 max-w-xl text-white"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium mb-8 tracking-widest uppercase">
            <Leaf className="w-3.5 h-3.5" />
            LERA Ecosystem
          </div>
          <h2 style={serif} className="text-5xl font-semibold leading-tight mb-6">
            "Masa depan yang bersih dimulai dari pilihan-pilihan kecil yang kita buat hari ini."
          </h2>
          <p className="text-white/70 leading-relaxed text-lg">
            Bergabunglah dengan komunitas yang peduli. Dapatkan akses ke produk ramah lingkungan, lacak penghematan karbonmu, dan nikmati reward sirkular.
          </p>
        </motion.div>
      </div>
    </div>
  );
}