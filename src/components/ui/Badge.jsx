const variants = {
  primary: 'bg-primary/10 text-primary border border-primary/20',
  accent: 'bg-accent/10 text-accent border border-accent/20',
  cyan: 'bg-cyan/10 text-cyan border border-cyan/20',
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
  ghost: 'bg-white/5 text-white/60 border border-white/10',
};

export default function Badge({ children, variant = 'primary', className = '', dot = false }) {
  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
      font-display tracking-wide
      ${variants[variant] || variants.primary}
      ${className}
    `}>
      {dot && <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'currentColor' }} />}
      {children}
    </span>
  );
}
