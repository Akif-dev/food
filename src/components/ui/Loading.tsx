interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function Loading({ size = 'md', text }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className={`relative ${sizeClasses[size]}`}>
        <img
          src="/logo-ins-akif.png"
          alt="Ice n Spice Logo"
          className="w-full h-full object-contain animate-pulse"
          style={{
            animation: 'logo-shake 2s ease-in-out infinite',
          }}
        />
      </div>
      {text && <p className="text-sm font-semibold text-gray-500 animate-pulse">{text}</p>}
      <style jsx global>{`
        @keyframes logo-shake {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(-5deg);
          }
          50% {
            transform: translateY(0) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}
