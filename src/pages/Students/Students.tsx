import AllCharacters from "@/components/AllCharacters";

export default function Students() {
  return (
    <>
      <h1 className="font-almendra text-4xl mb-8 text-center text-house-secondary">All Students</h1>
      <AllCharacters characterFilter="students" />
    </>
  );
}