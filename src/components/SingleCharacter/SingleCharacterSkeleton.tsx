export default function SingleCharacterSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>
      
      <div className="h-10 w-64 bg-gray-300 rounded mb-6"></div>
      
      <div className="flex flex-col md:flex-row gap-8 border border-gray-300 rounded-lg p-6">
        <div className="flex-shrink-0 md:w-1/3">
          <div className="w-full aspect-square bg-gray-300 rounded"></div>
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-5/6"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          <div className="h-6 bg-gray-300 rounded w-4/5"></div>
          <div className="h-6 bg-gray-300 rounded w-3/5"></div>
        </div>
      </div>
    </div>
  );
}
