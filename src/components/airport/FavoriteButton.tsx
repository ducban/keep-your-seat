import { Heart } from 'lucide-react';
import { useAirportStore } from '../../stores/airportStore';

interface FavoriteButtonProps {
  airportIATA: string;
  className?: string;
}

export default function FavoriteButton({
  airportIATA,
  className = '',
}: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useAirportStore();
  const favorited = isFavorite(airportIATA);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    toggleFavorite(airportIATA);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-all hover:bg-gray-100 ${className}`}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`w-5 h-5 transition-colors ${
          favorited
            ? 'fill-red-500 text-red-500'
            : 'text-gray-400 hover:text-red-400'
        }`}
      />
    </button>
  );
}
