import { useEffect } from "react";
import { HOUSES_ARRAY } from "@/constants/houses";
import { useHouseStore } from "@/stores/useHouseStore";
import type { House } from "@/constants/houses";

interface HousesComboProps {
  onHouseSelect?: (house: House | null) => void;
}

export default function HousesCombo({ onHouseSelect }: HousesComboProps) {
  const { selectedHouse, setSelectedHouse } = useHouseStore();

  useEffect(() => {
    if (selectedHouse) {
      const house = HOUSES_ARRAY.find(h => h.id === selectedHouse) || null;
      onHouseSelect?.(house);
    }
  }, [onHouseSelect, selectedHouse]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const houseId = e.target.value;
    setSelectedHouse(houseId);
    
    const house = HOUSES_ARRAY.find(h => h.id === houseId) || null;
    onHouseSelect?.(house);
  };

  const currentHouse = HOUSES_ARRAY.find(h => h.id === selectedHouse);

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="house-select" className="text-lg whitespace-nowrap text-house-text">
        Choose Your Favorite House:
      </label>
      
      <select
        id="house-select"
        value={selectedHouse}
        onChange={handleChange}
        className="flex-1 px-4 py-2 border-2 rounded-lg font-cormorant text-lg"
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