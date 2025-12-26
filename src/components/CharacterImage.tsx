interface CharacterImageProps {
  src?: string;
  alt: string;
  name: string;
  square?: boolean;
}

export default function CharacterImage({ src, alt, name, square }: CharacterImageProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`w-full rounded-md mb-4 object-cover object-top ${square ? 'h-64' : ''}`}
      />
    );
  }

  const initials = name
    .split(' ')
    .map(word => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={`w-full rounded-md mb-4 flex items-center justify-center bg-gradient-to-br from-house-primary to-house-secondary relative overflow-hidden ${square ? 'h-64' : 'h-auto aspect-square'}`}>
      <svg 
        className="absolute w-32 h-32 opacity-20"
        viewBox="0 0 24 24" 
        fill="white"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
      <span className="text-6xl font-almendra text-white z-10 text-shadow-readable">
        {initials}
      </span>
    </div>
  );
}
