import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const renderWithSkeleton = (
  value: string | number | undefined | null | boolean,
  renderContent: (value: string | number | boolean | string) => React.ReactNode,
  skeletonWidth: number = 60,
): React.ReactNode => {
  if (value === undefined || value === null) {
    return <Skeleton width={skeletonWidth} />;
  }
  return renderContent(value);
};
