import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { Menu, X, Instagram, Twitter, Facebook, LogOut, LayoutDashboard } from "lucide-react";
import leraLogo from "../../imports/LERA__Eco-Dissolvable_Cleaning_Sheet.png";
import { useAuth } from "../../lib/auth-context";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/products" },
  { label: "Platform", href: "/platform" },
  { label: "Carbon Club", href: "/carbon-club" },
  { label: "Impact Passport", href: "/impact-passport" },
  { label: "AI Assistant", href: "/ai-assistant" },
  { label: "Tentang", href: "/about" },
];

const footerLinks = {
  Produk: [
    { label: "Semua Produk", href: "/products" },
    { label: "Cara Kerja", href: "/how-it-works" },
    { label: "Circular Return", href: "/circular-return" },
  ],
  Platform: [
    { label: "Carbon Club", href: "/carbon-club" },
    { label: "Impact Passport", href: "/impact-passport" },
    { label: "AI Eco Assistant", href: "/ai-assistant" },
  ],
  Perusahaan: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Artikel", href: "/articles" },
    { label: "Kontak", href: "/contact" },
  ],
};

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu and scroll back to top whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="min-h-[100svh] w-full max-w-[100vw] overflow-x-hidden bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/60 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src={leraLogo} alt="LERA" className="h-8 w-auto object-contain" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop auth actions */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:bg-muted transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:bg-muted transition-colors"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="lg:hidden bg-background border-t border-border/60 px-6 py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-muted"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/60">
              {user ? (
                <>
                  <Link to="/dashboard" className="px-4 py-2.5 rounded-xl text-sm font-medium text-center bg-muted">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-center text-destructive"
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2.5 rounded-xl text-sm font-medium text-center bg-muted">
                    Masuk
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-center bg-primary text-primary-foreground"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12">
            <div>
              <img src={leraLogo} alt="LERA" className="h-9 w-auto object-contain mb-4 brightness-0 invert opacity-95" />
              <p style={serif} className="text-lg mb-3">Bersih tanpa jejak plastik.</p>
              <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
                Lembaran pembersih larut-air dari bahan alami Nusantara — dirancang untuk gaya hidup yang lebih ringan bagi bumi.
              </p>
              <div className="flex gap-3 mt-6">
                <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <p className="text-xs font-semibold tracking-widest uppercase text-primary-foreground/50 mb-4">{section}</p>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link to={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary-foreground/60">© {new Date().getFullYear()} LERA. Semua hak dilindungi.</p>
            <div className="flex gap-6">
              <Link to="/contact" className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Kontak
              </Link>
              <Link to="/faq" className="text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}