import { motion } from "motion/react";
import { Link } from "react-router";
import { Leaf, Mail, Lock, User, ArrowRight } from "lucide-react";

export function Signup() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-green-50/50 relative overflow-hidden dark:bg-[#0a0f0d]">
      {/* Background eco-elements */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-green-500/20 rounded-full blur-[100px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 w-full max-w-md p-8 bg-white/60 dark:bg-black/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(16,185,129,0.1)] border border-white/40 dark:border-white/10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Join the Ecosystem</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center text-sm">Create an account and make an impact.</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white"
                placeholder="eco@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 mt-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
