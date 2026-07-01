import { useState } from "react";
import { MapPin, Truck, Calendar, Clock, CheckCircle2, ExternalLink, QrCode } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { QRScanner } from "../components/QRScanner";

export function Drop() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  const wasteBankLocations = [
    { name: "Waste Bank Plaza Senayan", address: "Jl. Asia Afrika, Jakarta Pusat", distance: "2.3 km", status: "Buka" },
    { name: "Waste Bank Gandaria City", address: "Jl. Sultan Iskandar Muda, Kebayoran Lama", distance: "4.1 km", status: "Buka" },
    { name: "Waste Bank Taman Anggrek", address: "Jl. Letjen S. Parman, Grogol", distance: "5.8 km", status: "Tutup" },
  ];

  const pickupPricing = [
    { frequency: "Sekali", price: "Rp15.000", visits: "1 kunjungan" },
    { frequency: "Mingguan", price: "Rp50.000", visits: "4 kunjungan/bulan", popular: true },
    { frequency: "Bulanan", price: "Rp10.000", visits: "Per kunjungan (min. 8x)" },
  ];

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#5A7067] to-[#7A9088] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Trashify Drop</h1>
            <p className="text-lg text-white/90">
              Dua opsi mudah untuk menyetor sampah Anda: mandiri via Waste Bank digital atau layanan penjemputan ke rumah
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="waste-bank" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="waste-bank" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Waste Bank Digital
              </TabsTrigger>
              <TabsTrigger value="pickup" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Layanan Penjemputan
              </TabsTrigger>
            </TabsList>

            {/* Waste Bank Tab */}
            <TabsContent value="waste-bank" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lokasi Waste Bank Terdekat</CardTitle>
                  <CardDescription>
                    Setor sampah Anda langsung ke mesin Waste Bank digital di ruang publik
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {wasteBankLocations.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{location.name}</h3>
                          <Badge variant={location.status === "Buka" ? "default" : "secondary"}>
                            {location.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{location.address}</p>
                        <p className="text-sm text-primary font-medium">{location.distance}</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4">
                        Petunjuk Arah
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#5A7067] to-[#7A9088] text-white border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    Scan QR Waste Bank
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Scan QR code di mesin Waste Bank untuk memulai transaksi
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scannedResult ? (
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-sm mb-2">QR Code Terdeteksi:</p>
                      <p className="font-mono text-sm bg-white/20 p-3 rounded break-all">
                        {scannedResult}
                      </p>
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                          <p className="font-semibold">Waste Bank Terhubung</p>
                        </div>
                        <p className="text-sm text-white/80">
                          Lokasi: Waste Bank Plaza Senayan
                        </p>
                        <p className="text-sm text-white/80">
                          Status: Siap menerima sampah
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setShowQRScanner(true)}
                      size="lg"
                      className="w-full bg-[#FFF4DF] text-[#5A7067] hover:bg-[#FFF4DF]/90"
                    >
                      <QrCode className="mr-2 h-5 w-5" />
                      Scan QR Code
                    </Button>
                  )}

                  {scannedResult && (
                    <Button
                      onClick={() => setScannedResult(null)}
                      variant="outline"
                      className="w-full border-white/30 text-white hover:bg-white/10"
                    >
                      Scan Ulang
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-[#FFF4DF]/30 border-[#5A7067]/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Cara Menggunakan Waste Bank Digital
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Scan QR code di mesin Waste Bank menggunakan tombol di atas</li>
                    <li>Masukkan sampah yang sudah dipilah ke dalam mesin</li>
                    <li>Mesin akan memindai dan menimbang sampah secara otomatis</li>
                    <li>Poin akan langsung masuk ke akun Anda</li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pickup Tab */}
            <TabsContent value="pickup" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {pickupPricing.map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative ${plan.popular ? "border-primary border-2" : ""}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">Populer</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle>{plan.frequency}</CardTitle>
                      <CardDescription>{plan.visits}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-3xl font-bold text-primary">{plan.price}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Pilih Paket
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Jadwalkan Penjemputan</CardTitle>
                  <CardDescription>
                    Isi formulir untuk menjadwalkan kurir mengambil sampah di lokasi Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat Penjemputan</Label>
                      <Input
                        id="address"
                        placeholder="Masukkan alamat lengkap"
                        className="bg-input-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="08xx xxxx xxxx"
                        className="bg-input-background"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Tanggal Penjemputan
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-input-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Waktu Penjemputan
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="bg-input-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Catatan Tambahan (Opsional)</Label>
                    <Input
                      id="notes"
                      placeholder="Contoh: Sampah ada di teras depan"
                      className="bg-input-background"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    <Truck className="mr-2 h-5 w-5" />
                    Konfirmasi Penjemputan
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Outsource Services */}
      <section className="py-12 bg-[#FFF4DF]/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Layanan Mitra Outsource</h2>
              <p className="text-muted-foreground">
                Butuh layanan pengelolaan sampah skala besar? Hubungi mitra outsource kami
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Pengelolaan Sampah Komersial</CardTitle>
                  <CardDescription>
                    Untuk kantor, apartemen, dan properti komersial
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Penjemputan terjadwal harian/mingguan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Laporan pengelolaan sampah bulanan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Konsultasi zero waste strategy</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <a href="https://wa.me/628123456789?text=Halo, saya tertarik dengan layanan pengelolaan sampah komersial" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Hubungi via WhatsApp
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Event & Festival Waste Management</CardTitle>
                  <CardDescription>
                    Solusi pengelolaan sampah untuk acara dan event
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Tempat sampah terpilah on-site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Tim pengawas dan edukator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Sertifikat green event</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="https://wa.me/628123456789?text=Halo, saya tertarik dengan layanan event waste management" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Hubungi via WhatsApp
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <QRScanner
          onScan={(result) => {
            setScannedResult(result);
            setShowQRScanner(false);
          }}
          onClose={() => setShowQRScanner(false)}
        />
      )}
    </div>
  );
}
