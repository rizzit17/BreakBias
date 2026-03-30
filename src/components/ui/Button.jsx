import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const variants = {
  primary: {
    base: 'bg-gradient-to-r from-primary to-violet-mid text-dark font-semibold',
    hover: 'hover:shadow-[0_0_30px_rgba(197,163,255,0.5)]',
    shadow: '0 0 0px rgba(197,163,255,0)',
    activeShadow: '0 0 30px rgba(197,163,255,0.5)',
  },
  accent: {
    base: 'bg-gradient-to-r from-pink-soft to-accent text-white font-semibold',
    hover: 'hover:shadow-[0_0_30px_rgba(255,77,109,0.5)]',
    shadow: '0 0 0px rgba(255,77,109,0)',
    activeShadow: '0 0 30px rgba(255,77,109,0.5)',
  },
  cyan: {
    base: 'text-dark font-semibold',
    gradient: 'linear-gradient(135deg, #00D4FF, #0066CC)',
    hover: '',
    shadow: '0 0 0px rgba(0,212,255,0)',
    activeShadow: '0 0 30px rgba(0,212,255,0.5)',
  },
  ghost: {
    base: 'bg-transparent text-primary border border-primary/30 font-medium',
    hover: 'hover:bg-primary/8 hover:border-primary/50',
  },
  danger: {
    base: 'bg-transparent text-red-400 border border-red-500/30 font-medium',
    hover: 'hover:bg-red-500/10 hover:border-red-400/50',
  },
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-2xl',
  xl: 'px-10 py-5 text-lg rounded-2xl',
};

const Button = forwardRef(function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  ...props
}, ref) {
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;

  const style = variant === 'cyan'
    ? { background: 'linear-gradient(135deg, #00D4FF, #0066CC)', color: '#0B0F1A' }
    : {};

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 font-display
        transition-all duration-300 cursor-pointer
        ${v.base} ${s} ${v.hover}
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        ${className}
      `}
      style={style}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </motion.button>
  );
});

export default Button;
