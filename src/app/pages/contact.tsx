import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from "lucide-react";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@lera.id", detail: "Respons dalam 24 jam" },
  { icon: Phone, label: "WhatsApp", value: "+62 812-3456-7890", detail: "Senin–Jumat, 09.00–17.00 WIB" },
  { icon: MapPin, label: "Kantor", value: "Jl. Dago Pakar No. 42, Bandung", detail: "Jawa Barat, Indonesia 40135" },
  { icon: Clock, label: "Jam Operasional", value: "Senin – Jumat", detail: "09.00 – 17.00 WIB" },
];

const topics = [
  "Pertanyaan Produk",
  "Pesanan & Pengiriman",
  "Circular Return System",
  "Kemitraan Bisnis",
  "Program Carbon Club",
  "Media & Pers",
  "Lainnya",
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-sm mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h2 style={serif} className="text-3xl font-semibold text-foreground mb-3">Pesan Terkirim!</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">Terima kasih telah menghubungi kami. Tim LERA akan merespons dalam 24 jam kerja.</p>
          <button onClick={() => setSent(false)} className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
            Kirim Pesan Lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="py-24" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(44,85,69,0.1) 0%, transparent 60%), #F4EFE6" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">Hubungi Kami</p>
          <h1 style={serif} className="text-5xl md:text-6xl font-semibold text-foreground mb-6">
            Kami Senang Mendengar dari Kamu
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Ada pertanyaan tentang produk, platform, atau ingin bermitra dengan LERA? Tim kami siap membantu.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 pb-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="md:col-span-2">
            <h2 style={serif} className="text-2xl font-semibold text-foreground mb-8">Informasi Kontak</h2>
            <div className="space-y-6 mb-10">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground mb-0.5">{c.label}</div>
                    <div className="text-sm font-medium text-foreground">{c.value}</div>
                    <div className="text-xs text-muted-foreground">{c.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-primary/8 border border-primary/15 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">Butuh Respons Cepat?</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Chat langsung dengan tim kami via WhatsApp untuk pertanyaan mendesak.</p>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Buka WhatsApp
              </a>
            </div>

            {/* Map placeholder */}
            <div className="mt-6 aspect-video rounded-2xl overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=340&fit=crop&auto=format"
                alt="Lokasi kantor LERA"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="relative -mt-full pt-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-card border border-border rounded-xl px-4 py-2 text-xs font-medium text-foreground shadow-sm">
                    📍 Dago Pakar, Bandung
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <h2 style={serif} className="text-2xl font-semibold text-foreground mb-8">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nama kamu"
                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Alamat Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="kamu@email.com"
                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Topik</label>
                <select
                  required
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors text-foreground appearance-none cursor-pointer"
                >
                  <option value="">Pilih topik...</option>
                  {topics.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Pesan</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tuliskan pesanmu di sini..."
                  className="w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                <Send className="w-4 h-4" />
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
