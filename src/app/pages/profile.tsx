import { Trophy, TrendingUp, Award, Star, Zap, Target, Medal, Crown } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export function Profile() {
  const userStats = {
    name: "Anda",
    level: 12,
    points: 2450,
    nextLevelPoints: 3000,
    rank: 234,
    totalUsers: 15789,
    carbonSaved: 45.3,
    wasteRecycled: 127,
  };

  const achievements = [
    { id: 1, icon: Trophy, title: "Pemula Hijau", description: "Scan 10 sampah pertama", unlocked: true, date: "10 Apr 2026" },
    { id: 2, icon: Star, title: "Pejuang Lingkungan", description: "Setor 50 kg sampah", unlocked: true, date: "12 Apr 2026" },
    { id: 3, icon: Award, title: "Eco Shopper", description: "Belanja 5 produk daur ulang", unlocked: true, date: "14 Apr 2026" },
    { id: 4, icon: Zap, title: "Event Enthusiast", description: "Ikuti 3 event hijau", unlocked: false, progress: 2, target: 3 },
    { id: 5, icon: Target, title: "Carbon Warrior", description: "Kurangi 100 kg CO₂", unlocked: false, progress: 45, target: 100 },
    { id: 6, icon: Crown, title: "Trashify Legend", description: "Capai level 20", unlocked: false, progress: 12, target: 20 },
  ];

  const leaderboard = [
    { rank: 1, name: "EcoWarrior123", points: 15420, badge: "🥇" },
    { rank: 2, name: "GreenHero", points: 14280, badge: "🥈" },
    { rank: 3, name: "RecycleMaster", points: 12950, badge: "🥉" },
    { rank: 4, name: "PlanetSaver", points: 11240, badge: "" },
    { rank: 5, name: "EcoChampion", points: 10850, badge: "" },
    { rank: 234, name: userStats.name, points: userStats.points, badge: "", isUser: true },
  ];

  const pointsProgress = (userStats.points / userStats.nextLevelPoints) * 100;

  return (
    <div className="pb-20 md:pb-0">
      <section className="bg-gradient-to-br from-[#5A7067] to-[#7A9088] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl">
                👤
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">Halo, {userStats.name}!</h1>
                <div className="flex items-center gap-4 justify-center md:justify-start flex-wrap">
                  <Badge className="bg-[#FFF4DF] text-[#5A7067]">
                    Level {userStats.level}
                  </Badge>
                  <span className="text-white/90">
                    Peringkat #{userStats.rank} dari {userStats.totalUsers.toLocaleString("id-ID")} pengguna
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-[#FFF4DF]/30 rounded-lg">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-primary">{userStats.points}</p>
              <p className="text-sm text-muted-foreground">Total Poin</p>
            </div>
            <div className="text-center p-4 bg-[#FFF4DF]/30 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-primary">{userStats.carbonSaved} kg</p>
              <p className="text-sm text-muted-foreground">CO₂ Dikurangi</p>
            </div>
            <div className="text-center p-4 bg-[#FFF4DF]/30 rounded-lg">
              <Medal className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-primary">{userStats.wasteRecycled} kg</p>
              <p className="text-sm text-muted-foreground">Sampah Didaur</p>
            </div>
            <div className="text-center p-4 bg-[#FFF4DF]/30 rounded-lg">
              <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-primary">
                {achievements.filter((a) => a.unlocked).length}/{achievements.length}
              </p>
              <p className="text-sm text-muted-foreground">Achievement</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="achievements" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="achievements">Achievement & Poin</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              {/* Level Progress */}
              <Card className="border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Level {userStats.level}</CardTitle>
                      <CardDescription>
                        {userStats.nextLevelPoints - userStats.points} poin lagi ke Level {userStats.level + 1}
                      </CardDescription>
                    </div>
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={pointsProgress} className="h-3 mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{userStats.points} poin</span>
                    <span>{userStats.nextLevelPoints} poin</span>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements Grid */}
              <div>
                <h3 className="text-xl font-bold mb-4">Pencapaian</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <Card
                        key={achievement.id}
                        className={`${
                          achievement.unlocked
                            ? "border-primary/30 bg-gradient-to-br from-[#FFF4DF]/50 to-white"
                            : "opacity-60"
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-14 h-14 rounded-full flex items-center justify-center ${
                                achievement.unlocked
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <Icon className="h-7 w-7" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <h4 className="font-semibold">{achievement.title}</h4>
                                {achievement.unlocked && (
                                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                                    Selesai
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {achievement.description}
                              </p>
                              {achievement.unlocked ? (
                                <p className="text-xs text-primary">
                                  Dibuka pada {achievement.date}
                                </p>
                              ) : (
                                <div>
                                  <Progress
                                    value={(achievement.progress! / achievement.target!) * 100}
                                    className="h-2 mb-1"
                                  />
                                  <p className="text-xs text-muted-foreground">
                                    {achievement.progress}/{achievement.target}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Leaderboard Global
                  </CardTitle>
                  <CardDescription>
                    Pengguna dengan poin tertinggi bulan ini
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                          entry.isUser
                            ? "bg-primary/10 border-2 border-primary"
                            : entry.rank <= 3
                            ? "bg-[#FFF4DF]/30"
                            : "bg-accent/30"
                        }`}
                      >
                        <div className="w-12 text-center">
                          {entry.badge ? (
                            <span className="text-3xl">{entry.badge}</span>
                          ) : (
                            <span className="text-lg font-bold text-muted-foreground">
                              #{entry.rank}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold ${entry.isUser ? "text-primary" : ""}`}>
                            {entry.name}
                            {entry.isUser && " (Anda)"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            {entry.points.toLocaleString("id-ID")}
                          </p>
                          <p className="text-sm text-muted-foreground">poin</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#5A7067] to-[#7A9088] text-white border-0">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Crown className="h-12 w-12 mx-auto mb-3" />
                    <h3 className="text-xl font-bold mb-2">Naik ke Peringkat Teratas!</h3>
                    <p className="text-white/90 mb-4">
                      Kumpulkan lebih banyak poin dengan scan sampah, setor ke waste bank, dan
                      ikuti event hijau
                    </p>
                    <p className="text-sm text-white/80">
                      Pemenang leaderboard bulanan mendapat hadiah eksklusif
                    </p>
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
