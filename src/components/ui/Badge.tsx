import { classNames } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "muted";
}

const variants = {
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/15 text-danger",
  info: "bg-info/15 text-info",
  muted: "bg-muted/15 text-muted",
};

export function Badge({ children, variant = "muted" }: BadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}
