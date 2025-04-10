const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-100 mb-4 rounded" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4 mb-4">
          <div className="h-12 bg-gray-100 rounded w-1/6" />
          <div className="h-12 bg-gray-100 rounded w-1/6" />
          <div className="h-12 bg-gray-100 rounded w-1/6" />
          <div className="h-12 bg-gray-100 rounded w-1/6" />
          <div className="h-12 bg-gray-100 rounded w-1/6" />
          <div className="h-12 bg-gray-100 rounded w-1/6" />
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;