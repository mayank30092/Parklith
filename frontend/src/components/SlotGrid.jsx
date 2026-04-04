import SlotCard from "./SlotCard";

function SlotGrid({ slots }) {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Parking Area */}
      <div className="bg-gray-800/60 backdrop-blur-lg p-6 md:p-10 rounded-2xl shadow-xl border border-white/10 w-full max-w-5xl">
        <h2 className="text-xl font-semibold text-white mb-6 md:mb-8 text-center">
          🅿️ Parking Layout
        </h2>

        {/* Parking Slots */}
        <div className="flex justify-center gap-6 md:gap-8 flex-wrap mb-6 md:mb-10">
          {slots.map((slot) => (
            <div
              key={slot.slotId}
              className="flex flex-col items-center hover:scale-105 transition duration-300"
            >
              <SlotCard
                key={slot.slotId}
                id={slot.slotId}
                status={slot.status}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SlotGrid;
