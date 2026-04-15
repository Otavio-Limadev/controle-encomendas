import { recentEvents } from "@/data/mockData";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, AlertTriangle, Info } from "lucide-react";

const typeConfig = {
  success: { icon: CheckCircle2, colorClass: "text-eva-green", dotClass: "bg-eva-green" },
  info: { icon: Info, colorClass: "text-primary", dotClass: "bg-primary" },
  danger: { icon: AlertTriangle, colorClass: "text-eva-danger", dotClass: "bg-eva-danger" },
};

const RecentEvents = () => {
  return (
    <div className="eva-card-elevated rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center gap-3">
        <div className="h-1 w-5 rounded-full bg-primary" />
        <Activity className="h-4 w-4 text-primary" />
        <h2 className="font-heading text-lg font-semibold tracking-wide text-foreground">Eventos Recentes</h2>
      </div>
      <div className="p-4 space-y-1 max-h-[220px] overflow-auto">
        {recentEvents.map((event, i) => {
          const cfg = typeConfig[event.type];
          const Icon = cfg.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-surface-2 transition-colors"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${cfg.dotClass} flex-shrink-0`} />
              <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${cfg.colorClass}`} />
              <span className="text-sm text-foreground flex-1">{event.text}</span>
              <span className="font-heading text-xs tabular-nums text-muted-foreground">{event.time}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentEvents;
