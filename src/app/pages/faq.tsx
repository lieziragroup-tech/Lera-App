import { HelpCircle, Search } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");

  const generalFAQs = [
    {
      question: "Apa itu Trashify?",
      answer:
        "Trashify adalah platform digital berbasis AI yang mengintegrasikan tiga layanan utama: Trashify Drop (pengelolaan sampah), Trashify Mart (marketplace produk daur ulang), dan Trashify Care (kolaborasi komunitas) untuk memudahkan masyarakat dalam mengelola sampah secara berkelanjutan.",
    },
    {
      question: "Apakah Trashify gratis?",
      answer:
        "Ya, pendaftaran dan penggunaan aplikasi Trashify gratis. Untuk layanan Trashify Drop, penyetoran mandiri ke Waste Bank digital gratis, sementara layanan penjemputan dikenakan biaya mulai dari Rp10.000 per kunjungan. Anda juga dapat berbelanja di Trashify Mart dan mendapat poin reward.",
    },
    {
      question: "Bagaimana cara mendaftar?",
      answer:
        "Anda dapat mendaftar melalui website Trashify dengan mengisi formulir pendaftaran sederhana. Setelah verifikasi email, akun Anda langsung aktif dan dapat digunakan untuk mengakses semua layanan.",
    },
    {
      question: "Di mana saja Trashify beroperasi?",
      answer:
        "Saat ini Trashify beroperasi di Jakarta dengan 18+ lokasi Waste Bank digital di pusat perbelanjaan dan area publik. Kami berencana melakukan ekspansi ke kota-kota besar lainnya di Indonesia.",
    },
  ];

  const dropFAQs = [
    {
      question: "Jenis sampah apa saja yang bisa disetor?",
      answer:
        "Anda bisa menyetor berbagai jenis sampah daur ulang: plastik (PET, HDPE, PP), kertas/kardus, kaca, logam/aluminium, dan sampah organik. Pastikan sampah sudah dibersihkan dan dipilah sebelum disetor.",
    },
    {
      question: "Berapa biaya layanan penjemputan sampah?",
      answer:
        "Biaya penjemputan bervariasi: sekali kunjungan Rp15.000, paket mingguan Rp50.000/bulan (4 kunjungan), atau berlangganan minimal 8x dengan tarif Rp10.000/kunjungan. Penyetoran mandiri ke Waste Bank digital gratis.",
    },
    {
      question: "Berapa minimal berat sampah yang bisa disetor?",
      answer:
        "Tidak ada batasan minimal untuk penyetoran di Waste Bank digital. Untuk layanan penjemputan, kami rekomendasikan minimal 2 kg agar lebih efisien.",
    },
    {
      question: "Bagaimana cara kerja Waste Bank digital?",
      answer:
        "Waste Bank digital adalah mesin otomatis yang terletak di lokasi publik. Anda scan QR code di mesin menggunakan aplikasi, masukkan sampah yang sudah dipilah, mesin akan memindai dan menimbang otomatis, lalu poin langsung masuk ke akun Anda.",
    },
  ];

  const pointsFAQs = [
    {
      question: "Bagaimana cara mendapatkan poin?",
      answer:
        "Poin didapat dari berbagai aktivitas: menyetor sampah (10-30 poin/kg tergantung jenis), menggunakan AI Scanner, ikut event Trashify Care (50-200 poin), dan belanja di Trashify Mart (5% cashback poin).",
    },
    {
      question: "Apa yang bisa dilakukan dengan poin?",
      answer:
        "Poin dapat digunakan untuk: diskon belanja di Trashify Mart, ditukar dengan voucher mitra, atau dikonversi menjadi donasi untuk program lingkungan. Anda juga naik level dan unlock achievement dengan mengumpulkan poin.",
    },
    {
      question: "Apakah poin bisa hangus?",
      answer:
        "Poin tidak akan hangus selama akun Anda aktif. Namun jika tidak ada aktivitas selama 12 bulan berturut-turut, akun akan memasuki status dormant dan poin dapat di-reset.",
    },
    {
      question: "Bagaimana sistem level dan leaderboard?",
      answer:
        "Anda naik level berdasarkan total poin yang dikumpulkan. Setiap level unlock fitur dan reward baru. Leaderboard menampilkan top pengguna dengan poin tertinggi setiap bulan, dengan hadiah untuk pemenang.",
    },
  ];

  const scannerFAQs = [
    {
      question: "Bagaimana cara menggunakan AI Scanner?",
      answer:
        "Buka fitur AI Scanner di menu, arahkan kamera ke sampah, tunggu beberapa detik untuk AI menganalisis, lalu lihat hasil identifikasi lengkap dengan panduan daur ulang dan estimasi pengurangan CO₂.",
    },
    {
      question: "Seberapa akurat AI Scanner?",
      answer:
        "AI Scanner kami menggunakan teknologi deep learning dengan tingkat akurasi hingga 95%. AI dapat mengenali 20+ jenis sampah berbeda dan terus belajar untuk meningkatkan akurasi.",
    },
    {
      question: "Apakah saya perlu koneksi internet untuk scan?",
      answer:
        "Ya, saat ini AI Scanner memerlukan koneksi internet karena pemrosesan dilakukan di cloud untuk hasil yang lebih akurat dan cepat.",
    },
    {
      question: "Bagaimana AI menghitung pengurangan CO₂?",
      answer:
        "AI menghitung berdasarkan jenis dan estimasi berat sampah yang akan didaur ulang, dibandingkan dengan emisi jika sampah tersebut dibuang ke TPA. Kalkulasi menggunakan standar penelitian lingkungan internasional.",
    },
  ];

  const martFAQs = [
    {
      question: "Apa itu EcoCraft dan EcoClean?",
      answer:
        "EcoCraft adalah kategori produk kerajinan berbahan limbah daur ulang (tas, pot, lampu hias, dll). EcoClean adalah kategori produk olahan organik (sabun, kompos, pembersih alami, dll). Semua produk ramah lingkungan dan berkualitas.",
    },
    {
      question: "Apakah produk di Trashify Mart berkualitas?",
      answer:
        "Ya, semua produk melewati kurasi ketat dan hanya berasal dari UMKM terverifikasi. Kami memastikan kualitas produk dan standar keamanan terpenuhi. Setiap produk memiliki rating dan review dari pembeli.",
    },
    {
      question: "Bagaimana sistem pembayaran di Mart?",
      answer:
        "Anda bisa membayar dengan metode reguler (transfer bank, e-wallet, kartu kredit) atau menggunakan poin Trashify untuk mendapat diskon. Setiap pembelian juga mendapat cashback 5% dalam bentuk poin.",
    },
    {
      question: "Berapa lama pengiriman produk?",
      answer:
        "Pengiriman standar 3-5 hari kerja untuk area Jabodetabek, dan 5-7 hari kerja untuk luar Jabodetabek. Anda akan mendapat nomor resi untuk tracking pengiriman.",
    },
  ];

  const careFAQs = [
    {
      question: "Apa itu Trashify Care?",
      answer:
        "Trashify Care adalah platform kolaborasi yang menghubungkan pengguna dengan komunitas, sekolah, dan perusahaan untuk mengikuti program aksi hijau seperti cleanup event, workshop daur ulang, penanaman pohon, dan webinar lingkungan.",
    },
    {
      question: "Apakah ada biaya untuk ikut event?",
      answer:
        "Mayoritas event di Trashify Care gratis. Beberapa workshop atau pelatihan khusus mungkin dikenakan biaya minimal untuk materi dan sertifikat. Info biaya selalu tercantum jelas di detail event.",
    },
    {
      question: "Bagaimana cara mendaftar event?",
      answer:
        "Buka halaman Trashify Care, pilih event yang ingin diikuti, klik 'Daftar Sekarang', isi formulir konfirmasi, dan Anda akan mendapat email/notifikasi dengan detail event dan lokasi/link meeting.",
    },
    {
      question: "Bisakah organisasi saya menjadi mitra?",
      answer:
        "Tentu! Kami terbuka untuk kolaborasi dengan komunitas, sekolah, perusahaan, dan NGO. Hubungi kami melalui halaman Contact untuk diskusi partnership dan program bersama.",
    },
  ];

  const allFAQs = [
    ...generalFAQs.map((faq) => ({ ...faq, category: "general" })),
    ...dropFAQs.map((faq) => ({ ...faq, category: "drop" })),
    ...pointsFAQs.map((faq) => ({ ...faq, category: "points" })),
    ...scannerFAQs.map((faq) => ({ ...faq, category: "scanner" })),
    ...martFAQs.map((faq) => ({ ...faq, category: "mart" })),
    ...careFAQs.map((faq) => ({ ...faq, category: "care" })),
  ];

  const filteredFAQs = allFAQs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFAQs = (faqs: typeof generalFAQs) => (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#5A7067] to-[#7A9088] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <HelpCircle className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-xl text-white/90">
              Temukan jawaban atas pertanyaan Anda tentang Trashify
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari pertanyaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 bg-input-background"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {searchQuery ? (
              <Card>
                <CardHeader>
                  <CardTitle>Hasil Pencarian</CardTitle>
                  <CardDescription>
                    Ditemukan {filteredFAQs.length} pertanyaan untuk "{searchQuery}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredFAQs.length > 0 ? (
                    renderFAQs(filteredFAQs)
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      Tidak ada hasil yang ditemukan. Coba kata kunci lain.
                    </p>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
                  <TabsTrigger value="general">Umum</TabsTrigger>
                  <TabsTrigger value="drop">Drop</TabsTrigger>
                  <TabsTrigger value="scanner">Scanner</TabsTrigger>
                  <TabsTrigger value="mart">Mart</TabsTrigger>
                  <TabsTrigger value="care">Care</TabsTrigger>
                  <TabsTrigger value="points">Poin</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pertanyaan Umum</CardTitle>
                      <CardDescription>
                        Informasi dasar tentang platform Trashify
                      </CardDescription>
                    </CardHeader>
                    <CardContent>{renderFAQs(generalFAQs)}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="drop">
                  <Card>
                    <CardHeader>
                      <CardTitle>Trashify Drop</CardTitle>
                      <CardDescription>
                        Pertanyaan tentang layanan penyetoran dan penjemputan sampah
                      </CardDescription>
                    </CardHeader>
                    <CardContent>{renderFAQs(dropFAQs)}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="scanner">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Scanner</CardTitle>
                      <CardDescription>
                        Pertanyaan tentang fitur identifikasi sampah dengan AI
                      </CardDescription>
                    </CardHeader>
                    <CardContent>{renderFAQs(scannerFAQs)}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="mart">
                  <Card>
                    <CardHeader>
                      <CardTitle>Trashify Mart</CardTitle>
                      <CardDescription>
                        Pertanyaan tentang marketplace produk daur ulang
                      </CardDescription>
                    </CardHeader>
                    <CardContent>{renderFAQs(martFAQs)}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="care">
                  <Card>
                    <CardHeader>
                      <CardTitle>Trashify Care</CardTitle>
                      <CardDescription>
                        Pertanyaan tentang program kolaborasi dan event komunitas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>{renderFAQs(careFAQs)}</CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="points">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sistem Poin & Reward</CardTitle>
                      <CardDescription>
                        Pertanyaan tentang gamification dan reward
                      </CardDescription>
                    </CardHeader>
                    <CardContent>{renderFAQs(pointsFAQs)}</CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-[#FFF4DF]/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto border-primary/20">
            <CardContent className="p-8 text-center">
              <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Tidak Menemukan Jawaban?</h3>
              <p className="text-muted-foreground mb-6">
                Tim customer support kami siap membantu Anda. Hubungi kami melalui halaman kontak.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Hubungi Kami
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
