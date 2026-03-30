function ProductSkeleton({ size }: { size: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
      {[...Array(size)].map((n) => (
        <div key={n} className="animate-pulse">
          <div className="bg-gray-200 aspect-[4/5] rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export default ProductSkeleton;
