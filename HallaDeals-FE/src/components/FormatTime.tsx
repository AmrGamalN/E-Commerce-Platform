import { FormatDate_Time } from "@/utils/FormatDate";
import React from "react";

type FormatTimeProps = {
  date: string | number | Date;
  locale?: string;
};
const FormatTime = ({ date, locale = "en" }: FormatTimeProps) => {
  const formattedTime = FormatDate_Time({ date, locale });

  return <span>{formattedTime}</span>;
};

export default FormatTime;
// want format to be "2024-03-10T12:00:00Z"
