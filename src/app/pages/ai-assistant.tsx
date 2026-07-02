import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RefreshCw } from "lucide-react";
import { ChatContent } from "../components/chat-content";
import { type ChatMessage, askTerra, terraSuggestions } from "../../lib/terra-chat";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const capabilities = [
  { icon: "🌿", title: "Rekomendasi Produk", desc: "Temukan varian LERA yang sempurna untuk jenis kulitmu" },
  { icon: "📊", title: "Kalkulasi Dampak", desc: "Hitung CO₂ dan plastik yang sudah kamu hemat" },
  { icon: "💡", title: "Tips Sustainable", desc: "Panduan gaya hidup ramah lingkungan yang dipersonalisasi" },
  { icon: "❓", title: "Info Bahan & Formula", desc: "Pelajari setiap bahan di balik produk LERA" },
  { icon: "🏆", title: "Panduan Carbon Club", desc: "Strategi terbaik untuk naik level dan raih reward" },
  { icon: "♻️", title: "Circular Return Help", desc: "Panduan lengkap sistem pengembalian kemasan" },
];

const initialMessage: ChatMessage = {
  id: 0,
  role: "assistant",
  content:
    "Halo! Saya **Terra**, AI Consultant khusus untuk produk dan perjalanan hijaumu bersama LERA. 🌿\n\nSaya bisa membantu dengan rekomendasi produk, kalkulasi dampak lingkungan, tips gaya hidup sustainable, dan banyak lagi. Ada yang ingin kamu tanyakan?",
};

export function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const replyText = await askTerra(text);
    setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", content: replyText }]);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="pt-16">
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
                onClick={() => setMessages([initialMessage])}
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
                    <ChatContent content={m.content} />
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
                {terraSuggestions.map((s) => (
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