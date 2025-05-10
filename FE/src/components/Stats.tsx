import { Card, CardContent } from "@/components/UI/card";

interface StatsProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export const Stats = ({ title, value, icon }: StatsProps) => {
  return (
    <Card className="border-green-200">
      <CardContent className="p-4 flex items-center">
        {icon && <div className="mr-3 text-green-60">{icon}</div>}
        <div>
          <p className="text-sm font-medium text-gray-60">{title}</p>
          <p className="text-xl font-bold text-green-80">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};
