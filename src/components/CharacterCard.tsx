import { memo } from "react";
import SetFavorite from "./SetFavorite";
import CharacterImage from "./CharacterImage";
import type { Character } from "@/types/character";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

function CharacterCard({ character, onClick }: CharacterCardProps) {
  return (
    <div
      className="border border-house-secondary rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer relative"
      onClick={onClick}
    >
      <div className="absolute top-5 left-5 z-10">
        <SetFavorite characterId={character.id} />
      </div>
      <CharacterImage 
        src={character.image} 
        alt={character.name}
        name={character.name}
        square={true}
      />
      <h3 className="font-almendra text-2xl mb-2 character-name text-house-primary text-shadow-readable">
        {character.name}
      </h3>
      <p className="text-sm text-gray-600">{character.house || "No House"}</p>
      <p className="text-sm text-gray-500">
        {character.actor || "Unknown Actor"}
      </p>
    </div>
  );
}

export default memo(CharacterCard);
