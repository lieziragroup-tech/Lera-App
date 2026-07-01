export type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export const terraSuggestions = [
  "Produk mana yang paling cocok untuk kulit kering?",
  "Berapa CO₂ yang sudah saya hemat bulan ini?",
  "Bagaimana cara menggunakan LERA untuk cuci muka?",
  "Apa bedanya Patchouli Essence dengan Jasmine Bloom?",
  "Cara mendapatkan poin Carbon Club tercepat?",
  "Bahan-bahan apa yang ada di Lemongrass Refresh?",
];

const fallbackResponses: Record<string, string> = {
  "kulit kering":
    "Untuk kulit kering, saya merekomendasikan **Coconut Breeze** sebagai pilihan utama. Virgin coconut oil dari Sulawesi menciptakan lapisan pelembap alami yang tahan lama.\n\n**Cocoa Harmony** juga sangat baik — antioksidan dari cacao membantu memperkuat skin barrier dan mencegah kehilangan kelembapan.\n\nKeduanya bebas SLS sehingga tidak akan memperparah kondisi kulit keringmu. 🌿",
  "co₂":
    "Berdasarkan profil penggunaanmu, estimasi penghematan CO₂ bulan ini adalah:\n\n📊 **+1.4 kg CO₂** berkurang\n🧴 **Setara menghindari 6 botol** sabun plastik\n💧 **11 liter air** lebih hemat\n\nKamu sudah di jalur yang tepat menuju target Canopy Level! Butuh sekitar 850 poin lagi. 🌲",
  "cuci muka":
    "Gunakan LERA untuk cuci muka dengan langkah berikut:\n\n1. Basahi telapak tangan dengan air hangat\n2. Letakkan **1 lembar LERA** di tangan — pilih Jasmine Bloom atau Lemongrass untuk wajah\n3. Gosok perlahan hingga lembar larut dan berbusa (~15 detik)\n4. Pijat wajah dengan gerakan melingkar selama 30-60 detik\n5. Bilas bersih dengan air dingin untuk menutup pori\n\n✨ Formula lembut kami aman untuk penggunaan dua kali sehari.",
  patchouli:
    "Keduanya sama-sama varian premium, namun memiliki karakter berbeda:\n\n**Patchouli Essence**\n• Aroma: Earthy, woody, resinous\n• Cocok untuk: Evening ritual, meditasi, kulit berminyak\n• Efek: Menenangkan, grounding\n\n**Jasmine Bloom**\n• Aroma: Floral, delicate, uplifting\n• Cocok untuk: Pagi hari, aktivitas sosial, kulit sensitif\n• Efek: Mencerahkan, menenangkan\n\nKeduanya terbuat dari bahan lokal Indonesia yang 100% natural! 🌸",
  "carbon club":
    "Cara tercepat mengumpulkan poin Carbon Club:\n\n🥇 **Tantangan Mingguan** — Rata-rata 80–300 pts per tantangan\n📦 **Scan & Return Kemasan** — 15–30 pts per kemasan\n🤝 **Referral Teman** — 50 pts per teman yang bergabung\n⭐ **Streak Harian** — Bonus 10 pts setiap 7 hari berturut-turut\n📝 **Tulis Review Produk** — 25 pts per review\n\nTantangan 'Zero Plastic Week' yang aktif sekarang memberikan **+150 pts** — itu cara tercepat minggu ini! 🎯",
  lemongrass:
    "**Lemongrass Refresh** mengandung bahan-bahan alami pilihan:\n\n🌿 **Lemongrass Oil** — Steam-distilled dari highlands Jawa Tengah. Antibakteri alami & refreshing\n🍵 **Green Tea Extract** — Antioksidan tinggi, melindungi kulit dari radikal bebas\n🌱 **Spearmint** — Memberikan sensasi kesegaran yang tahan lama\n\n**Bebas dari:**\n• SLS / SLES\n• Paraben\n• Pewarna sintetis\n• Fragrance buatan\n\nTerurai 100% dalam 28 hari di lingkungan kompos. 🌍",
  default:
    "Terima kasih atas pertanyaanmu! Sebagai Terra, AI Eco Assistant LERA, saya siap membantu dengan:\n\n• 🌿 **Rekomendasi produk** sesuai kebutuhan kulitmu\n• 📊 **Informasi dampak lingkungan** penggunaan LERA\n• 💡 **Tips gaya hidup sustainable** sehari-hari\n• ❓ **Pertanyaan tentang bahan** dan formula kami\n• 🏆 **Panduan Carbon Club** dan sistem reward\n\nCoba tanyakan salah satu di atas, atau pilih dari saran di bawah!",
};

/** Canned local responses used whenever the AI backend is unavailable. */
export function getFallbackResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("kering") || lower.includes("moistur")) return fallbackResponses["kulit kering"];
  if (lower.includes("co₂") || lower.includes("co2") || lower.includes("karbon") || lower.includes("carbon"))
    return fallbackResponses["co₂"];
  if (lower.includes("cuci muka") || lower.includes("wajah") || lower.includes("muka"))
    return fallbackResponses["cuci muka"];
  if (lower.includes("patchouli") || lower.includes("jasmine") || lower.includes("beda") || lower.includes("bedanya"))
    return fallbackResponses["patchouli"];
  if (lower.includes("poin") || lower.includes("club") || lower.includes("cepat") || lower.includes("kumpul"))
    return fallbackResponses["carbon club"];
  if (lower.includes("lemongrass") || lower.includes("bahan") || lower.includes("ingred"))
    return fallbackResponses["lemongrass"];
  return fallbackResponses["default"];
}

/**
 * Asks Terra (Gemini, via our own /api/gemini proxy so the API key stays
 * server-side). Falls back to a canned local response if the backend is
 * unavailable, misconfigured, or returns an unexpected shape — the UI
 * always gets a usable reply instead of crashing.
 */
export async function askTerra(message: string): Promise<string> {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`AI proxy responded with ${response.status}`);
    }

    const data = await response.json();
    if (!data?.text || typeof data.text !== "string") {
      throw new Error("AI proxy returned no usable text");
    }

    return data.text;
  } catch (err) {
    console.error("Terra AI request failed, using local fallback response:", err);
    return getFallbackResponse(message);
  }
}