import { useState, useRef } from "react";
import { Camera, Scan, CheckCircle2, XCircle, Sparkles, BarChart3, Upload } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";

export function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setScanResult({
        type: "Plastik PET",
        category: "Plastik Daur Ulang",
        recyclable: true,
        confidence: 95,
        carbonSaved: 0.12,
        points: 10,
        instructions: [
          "Bersihkan dan keringkan botol",
          "Lepaskan label jika memungkinkan",
          "Hancurkan botol untuk menghemat ruang",
          "Masukkan ke tempat sampah plastik",
        ],
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        handleScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        handleScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const scanHistory = [
    { date: "17 Apr 2026", type: "Plastik PET", points: 10, co2: 0.12 },
    { date: "16 Apr 2026", type: "Kardus", points: 15, co2: 0.25 },
    { date: "15 Apr 2026", type: "Kaca", points: 20, co2: 0.18 },
    { date: "14 Apr 2026", type: "Aluminium", points: 25, co2: 0.35 },
  ];

  return (
    <div className="pb-20 md:pb-0">
      <section className="bg-gradient-to-br from-[#5A7067] via-[#6A8077] to-[#7A9088] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-5 w-5" />
              <span>Powered by Artificial Intelligence</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">AI Waste Scanner</h1>
            <p className="text-lg text-white/90">
              Identifikasi jenis sampah secara otomatis dan dapatkan panduan daur ulang yang tepat
            </p>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Scanner Area */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scan Sampah Anda</CardTitle>
                  <CardDescription>
                    Arahkan kamera ke sampah untuk mengidentifikasi jenis dan cara daur ulangnya
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Camera Preview Area */}
                  <div className="relative aspect-square bg-accent/30 rounded-lg overflow-hidden flex items-center justify-center">
                    {uploadedImage && !isScanning ? (
                      <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                    ) : null}
                    {!isScanning && !scanResult && !uploadedImage && (
                      <div className="text-center p-8">
                        <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Upload foto atau buka kamera untuk scan
                        </p>
                      </div>
                    )}
                    {isScanning && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                        <div className="text-center p-8 text-white">
                          <Scan className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                          <p className="font-medium">Menganalisis...</p>
                          <p className="text-sm mt-2">
                            AI sedang mengidentifikasi jenis sampah
                          </p>
                        </div>
                      </div>
                    )}
                    {scanResult && uploadedImage && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-8">
                        <div className="text-center text-white">
                          {scanResult.recyclable ? (
                            <CheckCircle2 className="h-16 w-16 mx-auto mb-2 text-green-400" />
                          ) : (
                            <XCircle className="h-16 w-16 mx-auto mb-2 text-red-400" />
                          )}
                          <h3 className="text-2xl font-bold mb-2">{scanResult.type}</h3>
                          <Badge variant="secondary" className="text-sm">
                            {scanResult.confidence}% akurat
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleCameraCapture}
                    className="hidden"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className="w-full"
                      size="lg"
                      variant="outline"
                      onClick={() => cameraInputRef.current?.click()}
                      disabled={isScanning}
                    >
                      <Camera className="mr-2 h-5 w-5" />
                      Buka Kamera
                    </Button>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isScanning}
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      Upload Foto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Result Area */}
            <div className="space-y-6">
              {scanResult && (
                <>
                  <Card className="border-primary/30">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Hasil Identifikasi</span>
                        {scanResult.recyclable ? (
                          <Badge className="bg-green-600">Dapat Didaur Ulang</Badge>
                        ) : (
                          <Badge variant="destructive">Tidak Dapat Didaur Ulang</Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Kategori</p>
                        <p className="font-medium">{scanResult.category}</p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Tingkat Kepercayaan</p>
                        <Progress value={scanResult.confidence} className="h-2" />
                        <p className="text-sm text-right mt-1">{scanResult.confidence}%</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="bg-[#FFF4DF]/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">CO₂ Dikurangi</p>
                          <p className="text-2xl font-bold text-primary">
                            {scanResult.carbonSaved} kg
                          </p>
                        </div>
                        <div className="bg-[#FFF4DF]/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Poin Didapat</p>
                          <p className="text-2xl font-bold text-primary">
                            +{scanResult.points}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Panduan Daur Ulang</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3">
                        {scanResult.instructions.map((instruction: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-sm pt-0.5">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </>
              )}

              {!scanResult && (
                <Card className="bg-gradient-to-br from-[#FFF4DF] to-[#FFF4DF]/50 border-[#5A7067]/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Fitur AI Scanner
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Identifikasi otomatis 20+ jenis sampah</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Akurasi hingga 95% dengan deep learning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Panduan daur ulang spesifik per jenis sampah</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Hitung jejak karbon yang berhasil dikurangi</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Scan History */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Riwayat Scan
              </CardTitle>
              <CardDescription>Aktivitas scan sampah Anda dalam 7 hari terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scanHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Scan className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.type}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">+{item.points} poin</p>
                      <p className="text-sm text-muted-foreground">{item.co2} kg CO₂</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
