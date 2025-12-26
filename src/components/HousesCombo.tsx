import { useEffect, useRef } from "react";
import { HOUSES_ARRAY } from "@/constants/houses";
import { useHouseStore } from "@/stores/useHouseStore";
import type { House } from "@/constants/houses";

interface HousesComboProps {
  onHouseSelect?: (house: House | null) => void;
}

export default function HousesCombo({ onHouseSelect }: HousesComboProps) {
  const { selectedHouse, setSelectedHouse } = useHouseStore();
  const onHouseSelectRef = useRef(onHouseSelect);

  useEffect(() => {
    onHouseSelectRef.current = onHouseSelect;
  });

  useEffect(() => {
    if (selectedHouse) {
      const house = HOUSES_ARRAY.find(h => h.id === selectedHouse) || null;
      onHouseSelectRef.current?.(house);
    }
  }, [selectedHouse]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const houseId = e.target.value;
    setSelectedHouse(houseId);
    
    const house = HOUSES_ARRAY.find(h => h.id === houseId) || null;
    onHouseSelect?.(house);
  };

  const currentHouse = HOUSES_ARRAY.find(h => h.id === selectedHouse);

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto px-4 md:px-0">
      <label htmlFor="house-select" className="text-base md:text-lg whitespace-nowrap text-house-text">
        Choose Your Favorite House:
      </label>
      
      <select
        id="house-select"
        value={selectedHouse}
        onChange={handleChange}
        className="w-full md:flex-1 px-4 py-2 border-2 rounded-lg font-cormorant text-base md:text-lg bg-white"
        style={{
          borderColor: currentHouse?.colors.primary || '#d1d5db',
          color: currentHouse?.colors.primary || '#374151',
        }}
      >
        <option value="">Select a house...</option>
        {HOUSES_ARRAY.map((house) => (
          <option key={house.id} value={house.id}>
            {house.name}
          </option>
        ))}
      </select>      
    </div>
  );
}