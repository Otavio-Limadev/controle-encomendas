import { useState, useEffect } from "react";
import { Wifi, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const DashboardHeader = () => {
  const [time, setTime] = useState(new Date());
  const { user, logout } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="eva-card-elevated flex items-center justify-between px-6 py-4 rounded-2xl">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
          <span className="font-heading text-lg font-bold text-primary-foreground">E</span>
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-wide text-foreground">
            EVA Escritórios Virtuais
          </h1>
          <p className="font-heading text-sm tracking-widest uppercase text-muted-foreground">
            Controle de Encomendas
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* Online indicator */}
        <div className="flex items-center gap-2 bg-eva-green-light px-3 py-1.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-eva-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-eva-green" />
          </span>
          <Wifi className="h-3.5 w-3.5 text-eva-green" />
          <span className="font-heading text-xs font-semibold tracking-wider text-eva-green">SESSÃO ATIVA</span>
        </div>

        {/* Clock */}
        <div className="text-right">
          <p className="font-heading text-xl font-bold tabular-nums text-foreground">
            {time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {time.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
          </p>
        </div>

        {/* User info */}
        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">{user.initials}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground leading-tight">{user.name}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{user.role}</p>
            </div>
            <button
              onClick={logout}
              className="ml-1 p-2 rounded-lg hover:bg-surface-3 text-muted-foreground hover:text-eva-danger transition-colors"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
