const SkeletonLoader = ({ count = 3, type = "venue" }) => {
  if (type === "venue") {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-slate-900/50 border border-white/5 rounded-[32px] overflow-hidden animate-pulse">
            <div className="h-64 bg-slate-800/80 w-full"></div>
            <div className="p-8">
              <div className="h-8 bg-slate-800/80 rounded-xl w-3/4 mb-4"></div>
              <div className="space-y-3 mb-8">
                <div className="h-4 bg-slate-800/50 rounded w-1/2"></div>
                <div className="h-4 bg-slate-800/50 rounded w-1/3"></div>
                <div className="h-4 bg-slate-800/50 rounded w-2/5"></div>
              </div>
              <div className="h-14 bg-slate-800/80 rounded-2xl w-full"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === "booking") {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-8 bg-slate-900/50 border border-white/5 rounded-3xl animate-pulse mb-4">
            <div className="h-8 bg-slate-800/80 rounded-xl w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-5 bg-slate-800/50 rounded w-3/4"></div>
              <div className="h-5 bg-slate-800/50 rounded w-1/2"></div>
              <div className="h-5 bg-slate-800/50 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return null;
};

export default SkeletonLoader;
