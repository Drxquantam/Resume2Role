const LoadingSkeleton = () => (
  <div className="grid gap-5 md:grid-cols-2">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="glass-panel rounded-2xl p-6">
        <div className="skeleton mb-5 h-5 w-1/3 rounded" />
        <div className="space-y-3">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-5/6 rounded" />
          <div className="skeleton h-4 w-2/3 rounded" />
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
