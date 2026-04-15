import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  accentBg: string;
  accentText: string;
  accentIcon: string;
  delay?: number;
}

const MetricCard = ({ title, value, icon: Icon, accentBg, accentText, accentIcon, delay = 0 }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="eva-card-elevated rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{title}</p>
          <p className={`font-heading text-4xl font-bold mt-2 ${accentText}`}>{value}</p>
        </div>
        <div className={`rounded-xl p-2.5 ${accentBg}`}>
          <Icon className={`h-5 w-5 ${accentIcon}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
