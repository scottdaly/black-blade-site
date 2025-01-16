import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavProps {
  totalItems: number;
  onCartOpen: () => void;
}

export default function Nav({ totalItems, onCartOpen }: NavProps) {
  const navigate = useNavigate();

  return (
    <nav className="relative z-10 flex justify-between items-center px-8 py-6 bg-black">
      <div
        onClick={() => {
          navigate('/');
          window.scrollTo(0, 0);
        }}
        className="flex flex-row gap-2 hover:cursor-pointer justify-center items-center text-[1.5rem] font-bold text-white hover:opacity-80 transition-colors font-['Oswald']"
      >
        <img src="/src/assets/images/logo.png" alt="Black Blade" className="w-[1.25rem] h-[1.25rem] pt-[0.1rem]" />
        BLACK BLADE
      </div>
      <div className="flex items-center space-x-8">
        <button 
          onClick={() => navigate('/products')}
          className="text-white hover:text-gray-200"
        >
          Products
        </button>
        <a href="#about" className="text-white hover:text-gray-200">About</a>
        <button 
          onClick={onCartOpen} 
          className="flex items-center text-white hover:text-gray-200"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {totalItems > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
} 