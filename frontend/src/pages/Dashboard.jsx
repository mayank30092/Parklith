import { useState, useEffect } from "react";
import SlotGrid from "../components/SlotGrid";

function Dashboard() {
  const [slots, setSlots] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [serverStatus, setServerStatus] = useState("offline");

  const fetchSlots = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/slots`);
      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      setSlots(data.slice(0, 3));
      setLastUpdated(new Date().toLocaleTimeString());
      setServerStatus("online");
    } catch (error) {
      console.error(error);
      setServerStatus("offline");
    }
  };

  useEffect(() => {
    fetchSlots();
    const interval = setInterval(fetchSlots, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalSlots = slots.length;
  const occupiedSlots = slots.filter((s) => s.status === "occupied").length;
  const vacantSlots = slots.filter((s) => s.status === "vacant").length;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-gray-900 to-black text-white p-6 flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center w-full max-w-5xl mt-6 mb-8 gap-3">
        <div className="flex gap-3 items-center">
          <img src="./P.png" className="logo-img rounded-lg" />
          <h1 className="text-3xl font-bold tracking-wide desktop-title">
            ParkLith
          </h1>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="font-semibold">Server:</span>

          <span
            className={`px-3 py-1 rounded-full font-bold ${
              serverStatus === "online"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {serverStatus === "online" ? "🟢 Online" : "🔴 Offline"}
          </span>
        </div>
      </div>

      {/* Info Panel */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl mb-8">
        <div className="flex flex-col w-full bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20">
          <p className="text-gray-300 text-sm">Last Update</p>
          <p className="text-xl font-bold">{lastUpdated || "--"}</p>
        </div>

        <div className="flex flex-col w-full bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20">
          <p className="text-gray-300 text-sm">Refresh Rate</p>
          <p className="text-xl font-bold">5 sec</p>
        </div>

        <div className="desktop-only flex flex-col w-full bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20">
          <p className="text-gray-300 text-sm">System</p>
          <p className="text-xl font-bold text-blue-400">ESP32 Active</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl mb-10 ">
        <div className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-xl shadow-xl desktop-box">
          <h2 className="text-lg font-semibold d-h2">Total Slots</h2>
          <p className="text-3xl desktop-text font-bold mt-2">{totalSlots}</p>
        </div>

        <div className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 p-6 rounded-xl shadow-xl desktop-box">
          <h2 className="text-lg font-semibold d-h2">Occupieds</h2>
          <p className="text-3xl desktop-text font-bold mt-2">
            {occupiedSlots}
          </p>
        </div>

        <div className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-xl shadow-xl desktop-box">
          <h2 className="text-lg font-semibold d-h2">Vacants</h2>
          <p className="text-3xl desktop-text font-bold mt-2">{vacantSlots}</p>
        </div>
      </div>

      {/* Parking Layout */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl w-full max-w-5xl">
        <SlotGrid slots={slots} />
      </div>
    </div>
  );
}

export default Dashboard;
