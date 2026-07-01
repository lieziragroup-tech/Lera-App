import { motion } from "motion/react";
import { Link } from "react-router";
import { Leaf, Mail, Lock, ArrowRight, Github } from "lucide-react";

export function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-green-50/50 relative overflow-hidden dark:bg-[#0a0f0d]">
      {/* Background eco-elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-400/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 bg-white/60 dark:bg-black/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(34,197,94,0.1)] border border-white/40 dark:border-white/10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm">Continue your journey towards a greener future.</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all dark:text-white"
                placeholder="eco@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <a href="#" className="text-sm text-green-600 dark:text-green-400 hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 transition-all"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200 dark:bg-white/10"></div>
          <span className="text-xs text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-white/10"></div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm font-medium dark:text-white">
            <Github className="w-4 h-4" /> Github
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm font-medium dark:text-white">
            <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/><path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/><path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"/><path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.87037 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"/></svg> Google
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account? <Link to="/signup" className="text-green-600 dark:text-green-400 font-medium hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
