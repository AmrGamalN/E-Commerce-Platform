import { useMemo } from "react";

type FormatTimeProps = {
  date: string | number | Date;
  locale?: string;
};

export const FormatDate_Time = ({ date }: FormatTimeProps) => {
  return useMemo(() => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "Invalid date"; // Handle invalid date input

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000);

    if (diffInSeconds < 1) return "now"; // Display "now" if the difference is less than a second

    const units = [
      { unit: "y", value: 31536000 },
      { unit: "mo", value: 2592000 },
      { unit: "d", value: 86400 },
      { unit: "h", value: 3600 },
      { unit: "m", value: 60 },
      { unit: "s", value: 1 },
    ];

    for (const { unit, value } of units) {
      const relativeValue = Math.floor(diffInSeconds / value);
      if (relativeValue >= 1) {
        return `${relativeValue}${unit}`;
      }
    }

    return "now";
  }, [date]);
};
