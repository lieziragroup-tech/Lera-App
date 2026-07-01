import { useState } from "react";
import { ShoppingCart, Heart, Star, Filter, QrCode, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { QRScanner } from "../components/QRScanner";

export function Mart() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedPayment, setScannedPayment] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const products = [
    {
      id: 1,
      name: "Tas Belanja Daur Ulang",
      category: "EcoCraft",
      price: 35000,
      originalPrice: 50000,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1758487424832-a53ae6cdefdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHByb2R1Y3RzJTIwaGFuZG1hZGUlMjBjcmFmdHN8ZW58MXx8fHwxNzc2NDEyMjY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      stock: 45,
    },
    {
      id: 2,
      name: "Tempat Pensil Plastik Daur Ulang",
      category: "EcoCraft",
      price: 25000,
      originalPrice: 40000,
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1758487424832-a53ae6cdefdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHByb2R1Y3RzJTIwaGFuZG1hZGUlMjBjcmFmdHN8ZW58MXx8fHwxNzc2NDEyMjY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      stock: 67,
    },
    {
      id: 3,
      name: "Sabun Organik Lavender",
      category: "EcoClean",
      price: 28000,
      originalPrice: 45000,
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1758487424832-a53ae6cdefdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHByb2R1Y3RzJTIwaGFuZG1hZGUlMjBjcmFmdHN8ZW58MXx8fHwxNzc2NDEyMjY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      stock: 32,
    },
    {
      id: 4,
      name: "Pot Tanaman Botol Bekas",
      category: "EcoCraft",
      price: 15000,
      originalPrice: 30000,
      rating: 4.5,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1758487424832-a53ae6cdefdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHByb2R1Y3RzJTIwaGFuZG1hZGUlMjBjcmFmdHN8ZW58MXx8fHwxNzc2NDEyMjY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      stock: 91,
    },
    {
      id: 5,
      name: "Kompos Organik Premium",
      category: "EcoClean",
      price: 42000,
      originalPrice: 50000,
      rating: 4.7,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1758487424832-a53ae6cdefdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHByb2R1Y3RzJTIwaGFuZG1hZGUlMjBjcmFmdHN8ZW58MXx8fHwxNzc2NDEyMjY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      stock: 23,
    },
    {
      id: 6,
      name: "Lampu Hias Koran Bekas",
      category: "EcoCraft",
      price: 48000,
      originalPrice: 50000,
      rating: 4.8,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1758487424832-a53ae6cdefdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHByb2R1Y3RzJTIwaGFuZG1hZGUlMjBjcmFmdHN8ZW58MXx8fHwxNzc2NDEyMjY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      stock: 12,
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#7A9088] to-[#9AB0A8] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Trashify Mart</h1>
            <p className="text-lg text-white/90">
              Marketplace produk daur ulang berkualitas. Semua produk di bawah Rp50.000
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedCategory}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Jelajahi Produk</h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="EcoCraft">EcoCraft</TabsTrigger>
              <TabsTrigger value="EcoClean">EcoClean</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative overflow-hidden bg-accent/30">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <Badge
                    className="absolute top-2 left-2 bg-primary text-primary-foreground"
                  >
                    {product.category}
                  </Badge>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base line-clamp-2">{product.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-foreground font-medium">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-muted-foreground">({product.reviews})</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-primary">
                      Rp{product.price.toLocaleString("id-ID")}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      Rp{product.originalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Stok: {product.stock}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => setCartCount(cartCount + 1)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Tambah ke Keranjang
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* QR Payment Section */}
          <Card className="mt-12 bg-gradient-to-br from-[#7A9088] to-[#9AB0A8] text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Pembayaran QR Code
              </CardTitle>
              <p className="text-sm text-white/80">
                Bayar dengan scan QR code untuk proses checkout yang lebih cepat
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {scannedPayment ? (
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                    <p className="font-semibold text-lg">Pembayaran Berhasil!</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-white/90">ID Transaksi: {scannedPayment.substring(0, 12)}...</p>
                    <p className="text-white/90">Metode: QRIS / E-Wallet</p>
                    <p className="text-white/90">Status: <span className="text-green-400 font-semibold">Terkonfirmasi</span></p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm text-white/80">
                      Pesanan Anda sedang diproses. Cek email untuk detail pengiriman.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-white/90">
                        Total Keranjang:
                      </p>
                      <Badge className="bg-[#FFF4DF] text-[#5A7067]">
                        {cartCount} item
                      </Badge>
                    </div>
                    <p className="font-bold text-2xl">
                      Rp {(cartCount * 28000).toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      {cartCount === 0 ? "Tambahkan produk ke keranjang" : "Siap untuk checkout"}
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowQRScanner(true)}
                    size="lg"
                    className="w-full bg-[#FFF4DF] text-[#5A7067] hover:bg-[#FFF4DF]/90"
                    disabled={cartCount === 0}
                  >
                    <QrCode className="mr-2 h-5 w-5" />
                    {cartCount === 0 ? "Keranjang Kosong" : "Scan QR untuk Bayar"}
                  </Button>
                </div>
              )}

              {scannedPayment && (
                <Button
                  onClick={() => setScannedPayment(null)}
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10"
                >
                  Belanja Lagi
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Info Banner */}
          <Card className="mt-8 bg-gradient-to-r from-[#FFF4DF] to-[#FFF4DF]/50 border-[#5A7067]/20">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Setiap Pembelian Berkontribusi untuk Lingkungan
                  </h3>
                  <p className="text-muted-foreground">
                    Dengan membeli produk daur ulang, Anda membantu mengurangi limbah dan
                    mendukung ekonomi sirkular. Dapatkan poin reward untuk setiap transaksi!
                  </p>
                </div>
                <Button size="lg" className="shrink-0">
                  Lihat Poin Saya
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <QRScanner
          onScan={(result) => {
            setScannedPayment(result);
            setShowQRScanner(false);
          }}
          onClose={() => setShowQRScanner(false)}
        />
      )}
    </div>
  );
}
