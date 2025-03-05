import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
  isLoading?: boolean;
  children?: React.ReactNode;
  variant?: "card" | "text" | "image" | "hero" | "service";
  count?: number;
  className?: string;
}

const SkeletonLoader = ({
  isLoading = true,
  children = null,
  variant = "card",
  count = 1,
  className = "",
}: SkeletonLoaderProps) => {
  const renderSkeleton = () => {
    switch (variant) {
      case "text":
        return (
          <div className={`space-y-2 w-full ${className}`}>
            {Array(count)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
          </div>
        );

      case "image":
        return (
          <div className={`w-full ${className}`}>
            <Skeleton className="h-[200px] w-full rounded-md" />
          </div>
        );

      case "hero":
        return (
          <div className={`w-full space-y-8 ${className}`}>
            <Skeleton className="h-[400px] w-full rounded-md" />
            <div className="space-y-3">
              <Skeleton className="h-8 w-[250px]" />
              <Skeleton className="h-4 w-full max-w-[600px]" />
              <Skeleton className="h-4 w-full max-w-[400px]" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-10 w-[120px] rounded-md" />
              <Skeleton className="h-10 w-[120px] rounded-md" />
            </div>
          </div>
        );

      case "service":
        return (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
          >
            {Array(count)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-background border rounded-lg p-6 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-6 w-[150px]" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[80%]" />
                  <div className="pt-4">
                    <Skeleton className="h-8 w-[100px] ml-auto" />
                  </div>
                </div>
              ))}
          </div>
        );

      case "card":
      default:
        return (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
          >
            {Array(count)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-background border rounded-lg p-6 space-y-4"
                >
                  <Skeleton className="h-6 w-[180px]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[60%]" />
                </div>
              ))}
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full bg-background"
      >
        {renderSkeleton()}
      </motion.div>
    );
  }

  return <>{children}</>;
};

export default SkeletonLoader;
