import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 active:scale-95';
  
  const variants = {
    primary: `
      bg-gradient-to-r from-accent-purple to-accent-pink text-white
      hover:shadow-lg hover:shadow-accent-purple/25 hover:-translate-y-0.5
      after:absolute after:inset-0 after:rounded-lg after:opacity-0 after:transition-opacity
      after:bg-gradient-to-r after:from-accent-pink after:to-accent-purple
      hover:after:opacity-100 overflow-hidden
    `,
    secondary: `
      bg-dark-700/50 text-white backdrop-blur-sm border border-white/5
      hover:bg-dark-600/50 hover:border-white/10 hover:shadow-lg hover:shadow-dark-600/20 hover:-translate-y-0.5
    `,
    ghost: `
      text-gray-300 hover:text-white hover:bg-white/5
      before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r 
      before:from-accent-purple/20 before:to-accent-pink/20 before:opacity-0
      hover:before:opacity-100 overflow-hidden
    `,
    glass: `
      backdrop-blur-sm bg-white/10 text-white border border-white/10
      hover:bg-white/20 hover:border-white/20 hover:shadow-lg hover:shadow-white/10
      before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r
      before:from-white/5 before:to-white/20 before:opacity-0
      hover:before:opacity-100 overflow-hidden
    `
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const loadingSpinner = (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const buttonClasses = [
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    (disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">
        {isLoading && loadingSpinner}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </span>
    </button>
  );
};

export default Button;
