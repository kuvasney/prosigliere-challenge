import AllCharacters from "@/components/AllCharacters";

export default function Staff() {
  return (
    <>
      <h1 className="font-almendra text-4xl mb-8 text-center text-house-secondary">All Staff</h1>
      <AllCharacters characterFilter="staff" />
    </>
  );
}