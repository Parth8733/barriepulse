import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface SectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  description?: string;
  children: ReactNode;
}

export function Section({ id, title, icon: Icon, description, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-16">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
      {description && (
        <p className="text-xs text-muted mt-4">{description}</p>
      )}
    </section>
  );
}
