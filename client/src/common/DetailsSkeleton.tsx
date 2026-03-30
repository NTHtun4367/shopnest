import useMediaQuery from "@/hooks/useMediaQuery";

function DetailsSkeleton() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div
      className={`flex ${isDesktop ? "flex-wrap" : "flex-col"} items-start justify-between mt-16 animate-pulse w-full`}
    >
      <div className={`${isDesktop ? "w-2/5" : "w-full px-6"}`}>
        <div
          className={`w-full ${isDesktop ? "h-[450px]" : "h-[350px]"} bg-gray-200 rounded-lg`}
        />
        <div className="flex items-center gap-3 mt-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`${isDesktop ? "w-28 h-28" : "w-20 h-20"} bg-gray-200 rounded-md`}
            />
          ))}
        </div>
      </div>
      <div className={`${isDesktop ? "w-3/5 ps-8" : "w-full px-6 pt-8"}`}>
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6" />
        <div className="space-y-2 mb-8">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="h-10 bg-gray-200 rounded w-full mb-4" />
        <div className="h-12 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export default DetailsSkeleton;
