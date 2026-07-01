import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { X, Camera, Upload, Keyboard } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [manualCode, setManualCode] = useState("");
  const [error, setError] = useState<string>("");

  const startScanner = async () => {
    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScan(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // Ignore frame-level errors
        }
      );
      setIsScanning(true);
      setError("");
    } catch (err) {
      setError("Kamera tidak dapat diakses. Silakan gunakan opsi Upload atau Manual.");
      console.error("QR Scanner error:", err);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
      setIsScanning(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const scanner = new Html5Qrcode("qr-file-reader");
      const result = await scanner.scanFileV2(file, false);
      if (result) {
        onScan(result.decodedText);
      }
    } catch (err) {
      setError("Tidak dapat membaca QR code dari gambar. Pastikan gambar jelas.");
      console.error("File scan error:", err);
    }
  };

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      onScan(manualCode.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Scan QR Code</h3>
          </div>
          <button
            onClick={() => {
              stopScanner();
              onClose();
            }}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <Tabs defaultValue="camera" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="camera" onClick={startScanner}>
                <Camera className="h-4 w-4 mr-2" />
                Kamera
              </TabsTrigger>
              <TabsTrigger value="upload" onClick={stopScanner}>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="manual" onClick={stopScanner}>
                <Keyboard className="h-4 w-4 mr-2" />
                Manual
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="space-y-4">
              <div id="qr-reader" className="rounded-lg overflow-hidden min-h-[250px]"></div>
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
              <p className="text-sm text-muted-foreground text-center">
                Arahkan kamera ke QR code
              </p>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <div className="text-center py-8">
                <div id="qr-file-reader" className="hidden"></div>
                <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Upload Gambar QR Code</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Pilih foto yang berisi QR code dari galeri Anda
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Pilih Gambar
                </Button>
                {error && (
                  <p className="text-sm text-destructive text-center mt-4">{error}</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <div className="py-4 space-y-4">
                <div>
                  <Label htmlFor="manual-code">Kode QR Manual</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Masukkan kode yang tertera di bawah QR code
                  </p>
                  <Input
                    id="manual-code"
                    placeholder="Contoh: WB-SENAYAN-001"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleManualSubmit();
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={handleManualSubmit}
                  className="w-full"
                  disabled={!manualCode.trim()}
                >
                  Submit
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
