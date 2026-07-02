import { useState, useEffect, KeyboardEvent } from "react";
import { Outlet, Link, NavLink, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, Instagram, Twitter, Youtube, ShoppingBag, Bot, ArrowRight } from "lucide-react";
import leraLogo from "../../imports/LERA__Eco-Dissolvable_Cleaning_Sheet.png";

const platformItems = [
  { label: "Carbon Impact Tracker", href: "/platform" },
  { label: "Circular Return System", href: "/circular-return" },
  { label: "Impact Passport", href: "/impact-passport" },
  { label: "Carbon Club", href: "/carbon-club" },
  { label: "AI Eco Assistant", href: "/ai-assistant" },
];

const navItems = [
  { label: "Home", href: "/", dropdown: false },
  { label: "Products", href: "/products", dropdown: false },
  { label: "Platform", href: "/platform", dropdown: true },
  { label: "About", href: "/about", dropdown: false },
  { label: "Articles", href: "/articles", dropdown: false },
  { label: "Contact", href: "/contact", dropdown: false },
];

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

// Animation Variants
const drawerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -20, filter: "blur(8px)" },
  visible: { 
    opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 25, staggerChildren: 0.05 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" },
  visible: { 
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 } 
  },
  exit: { opacity: 0, y: 10, scale: 0.95, filter: "blur(2px)", transition: { duration: 0.2, ease: "easeInOut" } }
};

export function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [platformHover, setPlatformHover] = useState(false);
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Halo! Saya Terra. Ada yang bisa saya bantu tentang sustainability atau produk LERA hari ini?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [askCount, setAskCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
    setChatInput('');
    
    setTimeout(() => {
      if (askCount === 0) {
        setChatMessages(prev => [...prev, { sender: 'bot', text: 'Tentu, saya siap membantu! Untuk diskusi yang lebih komprehensif dan mendalam, saya sarankan kita beralih ke menu AI Eco Assistant.' }]);
        setAskCount(1);
      } else {
        setChatMessages(prev => [...prev, { sender: 'bot', text: 'Mengarahkan Anda ke fitur penuh AI Eco Assistant...' }]);
        setTimeout(() => {
          setChatOpen(false);
          navigate("/ai-assistant");
        }, 1200);
      }
    }, 600);
  };

  const handleChatKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendChat();
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileDrawerOpen(false);
    setCartDrawerOpen(false);
    setPlatformHover(false);
    // Smooth scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileDrawerOpen || cartDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileDrawerOpen, cartDrawerOpen]);

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img 
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              src={leraLogo} alt="LERA" className="h-9 w-auto object-contain" 
            />
            <span className="hidden sm:block text-xs text-muted-foreground italic tracking-wide group-hover:text-primary transition-colors duration-300" style={serif}>
              Clean Flows Naturally
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setPlatformHover(true)}
                  onMouseLeave={() => setPlatformHover(false)}
                >
                  <button className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2">
                    {item.label}
                    <motion.div animate={{ rotate: platformHover ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {platformHover && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 pt-2 pb-2 px-2 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl min-w-64 z-50"
                      >
                        {platformItems.map((sub, idx) => (
                          <motion.div 
                            key={sub.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link
                              to={sub.href}
                              className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
                            >
                              {sub.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-colors py-2 ${
                      isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.div 
                          layoutId="nav-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              )
            )}
          </nav>

          {/* Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setCartDrawerOpen(true)}
              className="p-2.5 text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-full transition-all relative"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border border-background"></span>
            </button>
            <Link to="/login" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
            >
              Sign Up
            </Link>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={() => setCartDrawerOpen(true)}
              className="p-2 text-foreground/70"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-foreground/80 hover:text-primary transition-colors z-50 relative"
              onClick={() => setMobileDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Elegant Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-foreground/5 backdrop-blur-[2px] z-50 md:hidden"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-24 right-4 left-4 sm:left-auto sm:w-80 bg-card/95 backdrop-blur-2xl z-50 md:hidden flex flex-col shadow-2xl border border-border/60 rounded-3xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-border/30">
                <span className="text-sm font-bold tracking-widest uppercase text-primary" style={serif}>Menu</span>
                <button 
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 bg-muted rounded-full text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
                {navItems.map((item) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => setMobilePlatformOpen(!mobilePlatformOpen)}
                          className="w-full flex items-center justify-between text-base font-semibold text-foreground/90 py-2 group"
                        >
                          <span className="group-hover:text-primary transition-colors">{item.label}</span>
                          <motion.div animate={{ rotate: mobilePlatformOpen ? 180 : 0 }}>
                            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {mobilePlatformOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-2 pl-4 border-l-2 border-border/50 my-2">
                                {platformItems.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    to={sub.href}
                                    onClick={() => setMobileDrawerOpen(false)}
                                    className="text-sm font-medium text-foreground/60 hover:text-primary py-1 transition-colors"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <NavLink
                        to={item.href}
                        onClick={() => setMobileDrawerOpen(false)}
                        className={({ isActive }) =>
                          `block text-base font-semibold py-2 transition-colors ${
                            isActive ? "text-primary" : "text-foreground/90 hover:text-primary"
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="p-6 border-t border-border/30 bg-muted/30 flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex w-full items-center justify-center px-5 py-4 border border-border text-foreground text-sm font-medium rounded-2xl hover:bg-foreground/5 active:scale-95 transition-all shadow-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex w-full items-center justify-center px-5 py-4 bg-primary text-primary-foreground text-sm font-medium rounded-2xl hover:bg-primary/90 active:scale-95 transition-all shadow-lg"
                >
                  Sign Up
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cartDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-background/40 backdrop-blur-md z-50"
              onClick={() => setCartDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "100%", opacity: 0, scale: 0.98 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: "100%", opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
              className="fixed inset-4 md:top-4 md:right-4 md:left-auto md:bottom-4 md:w-full md:max-w-md bg-card z-50 rounded-3xl shadow-2xl flex flex-col border border-border/50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 bg-muted/30 border-b border-border/30">
                <div className="flex items-center gap-3 text-primary">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-medium text-lg" style={serif}>Your Refills</span>
                </div>
                <button 
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-2 hover:bg-white/50 rounded-full text-muted-foreground hover:text-foreground transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center p-8 text-center flex-col gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/30 mb-2">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-foreground/60">Your circular cart is elegantly empty.</p>
                <button 
                  onClick={() => setCartDrawerOpen(false)} 
                  className="text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  Continue exploring
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <main className="flex-1 pt-24 pb-8 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-28 right-6 w-[calc(100vw-3rem)] sm:w-96 h-[28rem] sm:h-[32rem] bg-card border border-border shadow-2xl rounded-3xl z-50 overflow-hidden flex flex-col"
          >
            <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-sm">Terra AI</h4>
                <p className="text-xs text-primary-foreground/70">Eco Assistant</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-5 h-5"/>
              </button>
            </div>
            <div className="flex-1 bg-muted/30 p-4 flex flex-col gap-3 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`p-3.5 rounded-2xl text-sm shadow-sm max-w-[85%] leading-relaxed ${
                    msg.sender === 'bot' 
                      ? 'bg-card border border-border rounded-tl-sm self-start text-foreground/90' 
                      : 'bg-primary text-primary-foreground rounded-tr-sm self-end'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="p-3 bg-card border-t border-border flex items-center gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleChatKeyDown}
                placeholder="Tanya Terra..." 
                className="flex-1 bg-muted/50 border border-border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors" 
              />
              <button 
                onClick={handleSendChat}
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:bg-primary/90 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setChatOpen(!chatOpen)} 
        className="fixed bottom-8 right-6 sm:right-8 z-50 group flex items-center justify-center outline-none"
      >
        <div className="absolute right-full mr-4 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden sm:block">
          Tanya Terra (AI)
        </div>
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 blur-sm rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
          {chatOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </motion.div>
      </button>
      <footer className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            <div>
              <div className="mb-4">
                <div className="bg-white/10 rounded-xl inline-block px-3 py-2 mb-3">
                  <img src={leraLogo} alt="LERA" className="h-8 w-auto object-contain brightness-0 invert" />
                </div>
                <p style={serif} className="text-sm italic text-background/60">Clean Flows Naturally</p>
              </div>
              <p className="text-sm text-background/55 leading-relaxed mb-5">
                Eco-dissolvable cleaning sheets crafted from Indonesia's finest botanical harvests. Bebas plastik, biodegradable, dirancang untuk gaya hidup sadar lingkungan.
              </p>
              <div className="flex gap-2.5">
                {[Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-full border border-background/20 flex items-center justify-center text-background/50 hover:text-background hover:border-background/50 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-background/40 mb-5">
                Products
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Seasonal Harvest Collection", path: "/products" },
                  { name: "How It Works", path: "/how-it-works" },
                  { name: "Refill System", path: "/circular-return" },
                  { name: "Ingredients", path: "/products" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-background/55 hover:text-background transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-background/40 mb-5">
                Platform
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Carbon Impact Tracker", path: "/platform" },
                  { name: "Circular Return System", path: "/circular-return" },
                  { name: "Impact Passport", path: "/impact-passport" },
                  { name: "Carbon Club", path: "/carbon-club" },
                  { name: "AI Eco Assistant", path: "/ai-assistant" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm text-background/55 hover:text-background transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-background/40 mb-5">
                Akun
              </h4>
              <ul className="space-y-3">
                <li><Link to="/login" className="text-sm text-background/55 hover:text-background transition-colors">Sign In</Link></li>
                <li><Link to="/signup" className="text-sm text-background/55 hover:text-background transition-colors">Sign Up</Link></li>
                <li><Link to="/impact-passport" className="text-sm text-background/55 hover:text-background transition-colors">Passport</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-background/40 mb-5">
                Stay Informed
              </h4>
              <p className="text-sm text-background/55 leading-relaxed mb-4">
                Seasonal launches, sustainability insights, and impact stories.
              </p>
              <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-background/10 border border-background/20 text-sm text-background placeholder:text-background/35 focus:outline-none focus:border-background/40 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/80 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/35">
            <p>© 2026 LERA. All rights reserved. Supporting UN SDG 12.</p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-background/60 transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-background/60 transition-colors">Terms of Use</Link>
              <Link to="/about" className="hover:text-background/60 transition-colors">Sustainability Report</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
