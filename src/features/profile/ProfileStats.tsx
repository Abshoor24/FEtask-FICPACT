import StatCard from "./StatCard";

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Quest Selesai" value="128" note="+12% Minggu ini" />
      <StatCard title="Mental Mana" value="85 / 100" />
      <StatCard title="Streak Saat Ini" value="7 Hari" />
    </div>
  );
}