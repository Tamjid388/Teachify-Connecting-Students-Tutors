import { Card, CardContent } from "@/components/ui/card";
import { StatCardProps } from "./analytics";



function StatCard({ label, value, icon, iconBg, iconColor }: StatCardProps) {
  return (
    <Card className="border bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
      <CardContent className="flex items-center gap-4 p-5 xl:p-7">
        <div className={`rounded-xl p-3 xl:p-4 shrink-0 ${iconBg} ${iconColor}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl xl:text-4xl font-bold text-foreground dark:text-white leading-none">
            {value ?? 0}
          </p>
          <p className="text-xs xl:text-sm text-muted-foreground dark:text-zinc-400 mt-1.5">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
export default StatCard