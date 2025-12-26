export default function AllCharactersSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="flex justify-center mb-6">
        <div className="h-10 w-48 bg-gray-300 rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4"
          >
            <div className="w-full aspect-square bg-gray-300 rounded mb-4"></div>
            <div className="h-7 bg-gray-300 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
