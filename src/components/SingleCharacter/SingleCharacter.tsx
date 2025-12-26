import { useParams, useNavigate } from "react-router-dom";
import { useCharacter } from "@/hooks/useCharacters";
import { formatDateOfBirth } from "@/utils/formatDate";
import Gender from "../Gender";
import SetFavorite from "../SetFavorite";
import CharacterImage from "../CharacterImage";
import SingleCharacterSkeleton from "./SingleCharacterSkeleton";

export default function SingleCharacter() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useCharacter(id || "");
  const character = data;

  if (isLoading) {
    return <SingleCharacterSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => { void navigate(-1); }} 
        className="text-blue-500 hover:underline mb-4 inline-block cursor-pointer"
      >
        ← Back
      </button>
      <h3 className="font-almendra text-3xl mb-6 text-house-primary text-shadow-readable">{character?.name} <Gender gender={character?.gender} /> 
      {!character?.alive && (<span className="italic text-sm">
        (In Memoriam)
      </span>)}
      </h3>
      
      {character && (
        <div className="flex flex-col md:flex-row gap-8 border border-gray-300 rounded-lg p-6">

          <div className="flex-shrink-0 md:w-1/3 relative">
            <CharacterImage 
              src={character.image} 
              alt={character.name}
              name={character.name}
            />
            <div className="absolute top-2 left-2">
              <SetFavorite characterId={character.id} />
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-3">              
              <p className="text-lg text-house-text">
                <strong>House:</strong> {character.house || "No House"}
              </p>
              
              {character.actor && (
                <p className="text-lg text-house-text">
                  <strong>Actor:</strong> {character.actor} &nbsp;
                  <a 
                    href={`https://www.imdb.com/find?q=${encodeURIComponent(character.actor)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline"
                  >
                    IMDb
                  </a>
                </p>
              )}
              
              {character.alternate_names.length > 0 && (
                <p className="text-lg text-house-text">
                  <strong>Alternate Names:</strong> {character.alternate_names.join(", ")}
                </p>
              )}
              {character.dateOfBirth && (
                <p className="text-lg text-house-text">
                  <strong>Date of Birth:</strong> {formatDateOfBirth(character.dateOfBirth)}
                </p>
              )}
              {character.ancestry && (
                <p className="text-lg text-house-text">
                  <strong>Ancestry:</strong> {character.ancestry}
                </p>
              )}
              {character.patronus && (
                <p className="text-lg text-house-text">
                  <strong>Patronus:</strong> {character.patronus}
                </p>
              )}
              <p className="text-lg text-house-text">
                <strong>Wizard:</strong> {character.wizard ? "Yes" : "No"}
              </p>
              {character.wand.wood && character.wand.core && character.wand.length && (
                <p className="text-lg text-house-text">
                  <strong>Wand:</strong> {character.wand.wood}, {character.wand.core}, {character.wand.length ? `${character.wand.length} inches` : 'Length unknown'}
                </p>
              )}
              {character.hogwartsStudent && (
                <p className="text-lg text-house-text">
                  <strong>Hogwarts Student</strong>
                </p>
              )}
              {character.hogwartsStaff && (
                <p className="text-lg text-house-text">
                  <strong>Hogwarts Staff</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}