import { cn } from "@/utils/cn";

const Loading = ({ className, variant = "default" }) => {
  if (variant === "skeleton") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex space-x-4">
          <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
    </div>
  );
};

export default Loading;