const badgeStyles = {
  confirmed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  "in progress": "bg-sky-500/10 text-sky-300 border-sky-500/20",
  completed: "bg-muted text-foreground border-border",
  cancelled: "bg-red-500/10 text-red-300 border-red-500/20",
  active: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  default: "bg-card text-muted-foreground border-border",
};

function Badge({ children, tone = "default", className = "" }) {
  const variant = badgeStyles[String(tone).toLowerCase()] || badgeStyles.default;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${variant} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
