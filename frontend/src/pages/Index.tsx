import { useState } from "react";
import { Package as PackageIcon, Clock, Send, AlertTriangle } from "lucide-react";

import DashboardHeader from "@/components/DashboardHeader";
import ClientSearchCard from "@/components/ClientSearchCard";
import MetricCard from "@/components/MetricCard";
import PackageTable from "@/components/PackageTable";
import PackageDetail from "@/components/PackageDetail";
import RecentEvents from "@/components/RecentEvents";
import { packages, Package } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import type { Cliente } from "@/types/cliente";

const metrics = [
  { title: "Encomendas hoje", value: 8, icon: PackageIcon, accentBg: "bg-eva-red-light", accentText: "text-primary", accentIcon: "text-primary" },
  { title: "Pendentes de envio", value: 3, icon: Clock, accentBg: "bg-eva-warning-light", accentText: "text-eva-warning", accentIcon: "text-eva-warning" },
  { title: "Enviadas", value: 3, icon: Send, accentBg: "bg-eva-green-light", accentText: "text-eva-green", accentIcon: "text-eva-green" },
  { title: "Atrasadas", value: 2, icon: AlertTriangle, accentBg: "bg-eva-danger-light", accentText: "text-eva-danger", accentIcon: "text-eva-danger" },
];

const buildPackageFromClient = (cliente: Cliente, employeeName: string): Package => ({
  id: cliente.id + 100000,
  cliente: cliente.clientName,
  sala: cliente.mailboxNumber || "-",
  empresa: cliente.companyName || "Empresa nao informada",
  horario: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
  status: "pendente",
  funcionario: employeeName,
  descricao: "Cliente selecionado via busca real. Encomenda pronta para acompanhamento local no front.",
  recebidoPor: employeeName,
  whatsapp: cliente.whatsapp || "",
  codigoRastreio: "",
  textoAuxiliar: "A selecao acima preenche automaticamente estes detalhes e a rastreabilidade da encomenda.",
});

const Index = () => {
  const { user } = useAuth();
  const employeeName = user?.name ?? "Atendente";
  const [packageList, setPackageList] = useState<Package[]>(packages);
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [selected, setSelected] = useState<Package | null>(packages[0]);

  const handleSelectPackage = (pkg: Package) => {
    setSelected(pkg);
  };

  const handleSelectClient = (cliente: Cliente) => {
    const nextPackage = buildPackageFromClient(cliente, employeeName);

    setSelectedClient(cliente);
    setPackageList((currentPackages) => {
      const existingPackage = currentPackages.find((pkg) => pkg.id === nextPackage.id);

      if (!existingPackage) {
        return [nextPackage, ...currentPackages];
      }

      return currentPackages.map((pkg) =>
        pkg.id === nextPackage.id
          ? {
              ...pkg,
              ...nextPackage,
              status: pkg.status,
              fotoEnviadaPor: pkg.fotoEnviadaPor,
              marcadoEnviadoPor: pkg.marcadoEnviadoPor,
              textoAuxiliar:
                pkg.status === "enviado"
                  ? `Encomenda marcada como enviada por ${pkg.marcadoEnviadoPor || employeeName}.`
                  : nextPackage.textoAuxiliar,
            }
          : pkg
      );
    });

    setSelected((currentSelected) => {
      if (currentSelected?.id === nextPackage.id) {
        return {
          ...currentSelected,
          ...nextPackage,
          status: currentSelected.status,
          fotoEnviadaPor: currentSelected.fotoEnviadaPor,
          marcadoEnviadoPor: currentSelected.marcadoEnviadoPor,
          textoAuxiliar:
            currentSelected.status === "enviado"
              ? `Encomenda marcada como enviada por ${currentSelected.marcadoEnviadoPor || employeeName}.`
              : nextPackage.textoAuxiliar,
        };
      }

      return nextPackage;
    });
  };

  const handleMarkAsSent = (pkg: Package) => {
    const updatedPackage: Package = {
      ...pkg,
      status: "enviado",
      marcadoEnviadoPor: employeeName,
      textoAuxiliar: `Encomenda marcada como enviada por ${employeeName}.`,
    };

    setPackageList((currentPackages) =>
      currentPackages.map((currentPackage) =>
        currentPackage.id === updatedPackage.id ? updatedPackage : currentPackage
      )
    );
    setSelected(updatedPackage);

    toast({
      title: "Encomenda atualizada",
      description: `${updatedPackage.cliente} foi marcada como enviada no front.`,
    });
  };

  const handleSaveTrackingCode = (pkg: Package, codigoRastreio: string) => {
    const updatedPackage: Package = {
      ...pkg,
      codigoRastreio,
      textoAuxiliar: `Codigo de rastreio ${codigoRastreio} registrado e pronto para integracao com o backend.`,
    };

    setPackageList((currentPackages) =>
      currentPackages.map((currentPackage) =>
        currentPackage.id === updatedPackage.id ? updatedPackage : currentPackage
      )
    );
    setSelected(updatedPackage);

    toast({
      title: "Codigo capturado",
      description: `Leitura registrada para ${updatedPackage.cliente}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto p-4 flex flex-col gap-4">
        <DashboardHeader />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <MetricCard key={m.title} {...m} delay={i * 0.1} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <PackageTable packages={packageList} selectedId={selected?.id ?? null} onSelect={handleSelectPackage} />
            <RecentEvents />
          </div>
          <div className="flex flex-col gap-4">
            <ClientSearchCard selectedClient={selectedClient} onSelectClient={handleSelectClient} />
            <PackageDetail
              pkg={selected}
              onMarkAsSent={handleMarkAsSent}
              onSaveTrackingCode={handleSaveTrackingCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
