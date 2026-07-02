import { Calendar, MapPin, Users, Heart, Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export function Care() {
  const events = [
    {
      id: 1,
      title: "Aksi Bersih Pantai Ancol",
      organizer: "Green Jakarta Community",
      type: "offline",
      date: "22 Apr 2026",
      time: "07:00 - 11:00 WIB",
      location: "Pantai Ancol, Jakarta Utara",
      participants: 45,
      maxParticipants: 100,
      image: "https://images.unsplash.com/photo-1758599668338-4c55a3bd0ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBlbnZpcm9ubWVudGFsJTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NzY0MTIyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      points: 150,
    },
    {
      id: 2,
      title: "Workshop Daur Ulang Plastik",
      organizer: "EcoSchool Indonesia",
      type: "online",
      date: "25 Apr 2026",
      time: "14:00 - 16:00 WIB",
      location: "Zoom Meeting",
      participants: 234,
      maxParticipants: 500,
      image: "https://images.unsplash.com/photo-1758599668338-4c55a3bd0ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBlbnZpcm9ubWVudGFsJTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NzY0MTIyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      points: 75,
    },
    {
      id: 3,
      title: "Penanaman 1000 Pohon",
      organizer: "PT Hijau Bersama",
      type: "offline",
      date: "28 Apr 2026",
      time: "06:00 - 12:00 WIB",
      location: "Taman Hutan Raya, Bogor",
      participants: 89,
      maxParticipants: 200,
      image: "https://images.unsplash.com/photo-1758599668338-4c55a3bd0ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBlbnZpcm9ubWVudGFsJTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NzY0MTIyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      points: 200,
    },
    {
      id: 4,
      title: "Webinar Zero Waste Lifestyle",
      organizer: "Green Living Academy",
      type: "online",
      date: "30 Apr 2026",
      time: "19:00 - 21:00 WIB",
      location: "Google Meet",
      participants: 567,
      maxParticipants: 1000,
      image: "https://images.unsplash.com/photo-1758599668338-4c55a3bd0ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBlbnZpcm9ubWVudGFsJTIwdm9sdW50ZWVyc3xlbnwxfHx8fDE3NzY0MTIyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      points: 50,
    },
  ];

  const communities = [
    {
      name: "Green Jakarta Community",
      members: 2340,
      category: "Komunitas Lokal",
      description: "Komunitas peduli lingkungan di Jakarta",
    },
    {
      name: "EcoSchool Indonesia",
      members: 5670,
      category: "Institusi Pendidikan",
      description: "Jaringan sekolah ramah lingkungan",
    },
    {
      name: "PT Hijau Bersama",
      members: 890,
      category: "Perusahaan",
      description: "Corporate social responsibility program",
    },
  ];

  return (
    <div className="pb-20 md:pb-0">
      <section className="bg-gradient-to-br from-[#9AB0A8] to-[#5A7067] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Trashify Care</h1>
            <p className="text-lg text-white/90">
              Bergabung dengan komunitas, sekolah, dan perusahaan dalam program aksi hijau
            </p>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="events" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="events">Program & Event</TabsTrigger>
              <TabsTrigger value="communities">Komunitas</TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Program Aksi Hijau</h2>
                  <p className="text-muted-foreground">
                    Ikuti berbagai kegiatan lingkungan dan dapatkan poin reward
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <Badge
                        className="absolute top-3 right-3"
                        variant={event.type === "online" ? "secondary" : "default"}
                      >
                        {event.type === "online" ? "Online" : "Offline"}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.organizer}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium">{event.date}</p>
                          <p className="text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <p className="text-muted-foreground">{event.location}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="text-sm">
                          <span className="font-medium text-primary">
                            {event.participants}/{event.maxParticipants}
                          </span>
                          <span className="text-muted-foreground ml-1">peserta</span>
                        </div>
                        <Badge variant="outline" className="bg-[#FFF4DF] border-[#5A7067]/30">
                          +{event.points} Poin
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Heart className="mr-2 h-4 w-4" />
                        Daftar Sekarang
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Communities Tab */}
            <TabsContent value="communities" className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Komunitas Mitra</h2>
                <p className="text-muted-foreground">
                  Terhubung dengan organisasi yang peduli lingkungan
                </p>
              </div>

              <div className="space-y-4">
                {communities.map((community, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl">{community.name}</CardTitle>
                          <CardDescription className="mt-2">
                            {community.description}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{community.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{community.members.toLocaleString("id-ID")} anggota</span>
                        </div>
                        <Button variant="outline">
                          Lihat Detail
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="bg-gradient-to-br from-[#5A7067] to-[#7A9088] text-white border-0">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">
                        Daftarkan Organisasi Anda
                      </h3>
                      <p className="text-white/90">
                        Jadilah mitra Trashify dan jangkau lebih banyak relawan untuk program
                        lingkungan Anda
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-[#FFF4DF] text-[#5A7067] hover:bg-[#FFF4DF]/90 shrink-0"
                    >
                      Daftar sebagai Mitra
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
