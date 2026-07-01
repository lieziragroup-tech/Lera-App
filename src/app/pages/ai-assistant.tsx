import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Leaf, Sparkles, RefreshCw } from "lucide-react";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Produk mana yang paling cocok untuk kulit kering?",
  "Berapa CO₂ yang sudah saya hemat bulan ini?",
  "Bagaimana cara menggunakan LERA untuk cuci muka?",
  "Apa bedanya Patchouli Essence dengan Jasmine Bloom?",
  "Cara mendapatkan poin Carbon Club tercepat?",
  "Bahan-bahan apa yang ada di Lemongrass Refresh?",
];

const responses: Record<string, string> = {
  "kulit kering": "Untuk kulit kering, saya merekomendasikan **Coconut Breeze** sebagai pilihan utama. Virgin coconut oil dari Sulawesi menciptakan lapisan pelembap alami yang tahan lama.\n\n**Cocoa Harmony** juga sangat baik — antioksidan dari cacao membantu memperkuat skin barrier dan mencegah kehilangan kelembapan.\n\nKeduanya bebas SLS sehingga tidak akan memperparah kondisi kulit keringmu. 🌿",
  "co₂": "Berdasarkan profil penggunaanmu, estimasi penghematan CO₂ bulan ini adalah:\n\n📊 **+1.4 kg CO₂** berkurang\n🧴 **Setara menghindari 6 botol** sabun plastik\n💧 **11 liter air** lebih hemat\n\nKamu sudah di jalur yang tepat menuju target Canopy Level! Butuh sekitar 850 poin lagi. 🌲",
  "cuci muka": "Gunakan LERA untuk cuci muka dengan langkah berikut:\n\n1. Basahi telapak tangan dengan air hangat\n2. Letakkan **1 lembar LERA** di tangan — pilih Jasmine Bloom atau Lemongrass untuk wajah\n3. Gosok perlahan hingga lembar larut dan berbusa (~15 detik)\n4. Pijat wajah dengan gerakan melingkar selama 30-60 detik\n5. Bilas bersih dengan air dingin untuk menutup pori\n\n✨ Formula lembut kami aman untuk penggunaan dua kali sehari.",
  "patchouli": "Keduanya sama-sama varian premium, namun memiliki karakter berbeda:\n\n**Patchouli Essence**\n• Aroma: Earthy, woody, resinous\n• Cocok untuk: Evening ritual, meditasi, kulit berminyak\n• Efek: Menenangkan, grounding\n\n**Jasmine Bloom**\n• Aroma: Floral, delicate, uplifting\n• Cocok untuk: Pagi hari, aktivitas sosial, kulit sensitif\n• Efek: Mencerahkan, menenangkan\n\nKeduanya terbuat dari bahan lokal Indonesia yang 100% natural! 🌸",
  "carbon club": "Cara tercepat mengumpulkan poin Carbon Club:\n\n🥇 **Tantangan Mingguan** — Rata-rata 80–300 pts per tantangan\n📦 **Scan & Return Kemasan** — 15–30 pts per kemasan\n🤝 **Referral Teman** — 50 pts per teman yang bergabung\n⭐ **Streak Harian** — Bonus 10 pts setiap 7 hari berturut-turut\n📝 **Tulis Review Produk** — 25 pts per review\n\nTantangan 'Zero Plastic Week' yang aktif sekarang memberikan **+150 pts** — itu cara tercepat minggu ini! 🎯",
  "lemongrass": "**Lemongrass Refresh** mengandung bahan-bahan alami pilihan:\n\n🌿 **Lemongrass Oil** — Steam-distilled dari highlands Jawa Tengah. Antibakteri alami & refreshing\n🍵 **Green Tea Extract** — Antioksidan tinggi, melindungi kulit dari radikal bebas\n🌱 **Spearmint** — Memberikan sensasi kesegaran yang tahan lama\n\n**Bebas dari:**\n• SLS / SLES\n• Paraben\n• Pewarna sintetis\n• Fragrance buatan\n\nTerurai 100% dalam 28 hari di lingkungan kompos. 🌍",
  default: "Terima kasih atas pertanyaanmu! Sebagai Terra, AI Eco Assistant LERA, saya siap membantu dengan:\n\n• 🌿 **Rekomendasi produk** sesuai kebutuhan kulitmu\n• 📊 **Informasi dampak lingkungan** penggunaan LERA\n• 💡 **Tips gaya hidup sustainable** sehari-hari\n• ❓ **Pertanyaan tentang bahan** dan formula kami\n• 🏆 **Panduan Carbon Club** dan sistem reward\n\nCoba tanyakan salah satu di atas, atau pilih dari saran di bawah!",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("kering") || lower.includes("moistur")) return responses["kulit kering"];
  if (lower.includes("co₂") || lower.includes("co2") || lower.includes("karbon") || lower.includes("carbon")) return responses["co₂"];
  if (lower.includes("cuci muka") || lower.includes("wajah") || lower.includes("muka")) return responses["cuci muka"];
  if (lower.includes("patchouli") || lower.includes("jasmine") || lower.includes("beda") || lower.includes("bedanya")) return responses["patchouli"];
  if (lower.includes("poin") || lower.includes("club") || lower.includes("cepat") || lower.includes("kumpul")) return responses["carbon club"];
  if (lower.includes("lemongrass") || lower.includes("bahan") || lower.includes("ingred")) return responses["lemongrass"];
  return responses["default"];
}

const capabilities = [
  { icon: "🌿", title: "Rekomendasi Produk", desc: "Temukan varian LERA yang sempurna untuk jenis kulitmu" },
  { icon: "📊", title: "Kalkulasi Dampak", desc: "Hitung CO₂ dan plastik yang sudah kamu hemat" },
  { icon: "💡", title: "Tips Sustainable", desc: "Panduan gaya hidup ramah lingkungan yang dipersonalisasi" },
  { icon: "❓", title: "Info Bahan & Formula", desc: "Pelajari setiap bahan di balik produk LERA" },
  { icon: "🏆", title: "Panduan Carbon Club", desc: "Strategi terbaik untuk naik level dan raih reward" },
  { icon: "♻️", title: "Circular Return Help", desc: "Panduan lengkap sistem pengembalian kemasan" },
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "Halo! Saya **Terra**, AI Consultant khusus untuk produk dan perjalanan hijaumu bersama LERA. 🌿\n\nSaya bisa membantu dengan rekomendasi produk, kalkulasi dampak lingkungan, tips gaya hidup sustainable, dan banyak lagi. Ada yang ingin kamu tanyakan?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (apiKey && apiKey !== "your_gemini_api_key_here") {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Kamu adalah Terra, AI Eco Assistant khusus untuk LERA. Jawab dengan ramah, berikan gaya penulisan yang rapi. Pertanyaan pengguna: ${text}` }] }]
          })
        });
        
        if (!response.ok) throw new Error("API Error");
        
        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        
        setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", content: aiText }]);
        setLoading(false);
        return; // Selesai jika API berhasil
      } catch (e) {
        console.error("Gemini API failed, falling back to local responses:", e);
      }
    }

    // Simulasi respons (Fallback jika tidak ada API key atau API error)
    await new Promise((r) => setTimeout(r, 1200));
    const aiMsg: Message = { id: Date.now() + 1, role: "assistant", content: getResponse(text) };
    setMessages((prev) => [...prev, aiMsg]);
    
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <strong key={i} className="font-semibold text-foreground">{line.slice(2, -2)}</strong>;
      }
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
            ) : part
          )}
          {i < content.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section
        className="py-20"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(44,85,69,0.12) 0%, transparent 60%), #F4EFE6" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
            <Bot className="w-8 h-8 text-primary-foreground" />
          </div>
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">Powered by AI</p>
          <h1 style={serif} className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
            AI Eco Assistant
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Asisten cerdasmu untuk edukasi gaya hidup ramah lingkungan, rekomendasi produk personal, dan kalkulasi dampak karbonmu.
          </p>
        </div>
      </section>

      <section className="py-10 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-card border border-border rounded-2xl p-5 flex gap-3.5 items-start">
                <div className="text-2xl shrink-0">{c.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-foreground mb-1">{c.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="pb-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Bot className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Terra</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-muted-foreground">Online · Siap membantu</span>
                </div>
              </div>
              <button
                onClick={() => setMessages([{ id: 0, role: "assistant", content: "Hola! Saya Terra, AI Consultant LERA. 🌿 Ada yang ingin kamu tanyakan?" }])}
                className="ml-auto p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-5">
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${m.role === "assistant" ? "bg-primary" : "bg-secondary"}`}>
                    {m.role === "assistant" ? (
                      <Sparkles className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <User className="w-4 h-4 text-secondary-foreground" />
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "assistant" ? "bg-muted text-foreground rounded-tl-sm" : "bg-primary text-primary-foreground rounded-tr-sm"}`}>
                    {renderContent(m.content)}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-6 py-3 border-t border-border">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs whitespace-nowrap px-3 py-1.5 bg-muted hover:bg-primary/10 hover:text-primary border border-border rounded-full transition-colors shrink-0"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-6 py-4 border-t border-border flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan sesuatu tentang LERA..."
                disabled={loading}
                className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-11 h-11 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Terra memberikan panduan umum seputar LERA. Untuk keperluan medis, selalu konsultasikan dengan dokter.
          </p>
        </div>
      </section>
    </div>
  );
}
