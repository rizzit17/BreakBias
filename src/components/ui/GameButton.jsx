import { forwardRef } from 'react';
import { useAudio } from '../../context/AudioContext';

const GameButton = forwardRef(function GameButton({
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
  const { playSound, primeAudio } = useAudio();

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-xl',
    xl: 'px-10 py-5 text-2xl',
  };

  const cssClass = `btn-game-${variant}`;
  const s = sizes[size] || sizes.md;

  return (
    <button
      ref={ref}
      onMouseEnter={() => {
        primeAudio();
        playSound('hover');
      }}
      onClick={(event) => {
        primeAudio();
        if (!disabled) {
          playSound('click');
        }
        onClick?.(event);
      }}
      disabled={disabled}
      className={`
        game-button ${cssClass} ${s} 
        ${disabled ? 'opacity-40 cursor-not-allowed filter grayscale' : ''}
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
});

export default GameButton;
