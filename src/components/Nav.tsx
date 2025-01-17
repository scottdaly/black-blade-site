import { ShoppingCart, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface NavProps {
  totalItems: number;
  onCartOpen: () => void;
}

export default function Nav({ totalItems, onCartOpen }: NavProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className="relative z-10 flex justify-between items-center px-8 py-5 bg-zinc-900">
        <button
          className="text-slate-200 hover:text-slate-300"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="w-8 h-8" />
        </button>

        <div
          onClick={() => handleNavigation("/")}
          className="flex flex-row gap-2 hover:cursor-pointer justify-center items-center text-[1.5rem] font-semibold text-white hover:opacity-80 transition-colors font-['Oswald'] absolute left-1/2 -translate-x-1/2 tracking-wide"
        >
          {/* <img
            src={logo}
            alt="Black Blade"
            className="w-[1.25rem] h-[1.4rem] pt-[0.15rem]"
          /> */}
          <div className="">
            <svg
              width="101"
              height="128"
              viewBox="0 0 101 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[1.25rem] h-[1.45rem] pt-[0.15rem]"
            >
              <rect
                width="16"
                height="129.389"
                transform="matrix(1 0 -0.172789 0.984959 84.2695 0)"
                fill="white"
              />
              <rect
                width="49.9133"
                height="129.389"
                transform="matrix(1 0 -0.172789 0.984959 22.3555 0)"
                fill="white"
              />
            </svg>
          </div>
          BLACK BLADE
        </div>
        {/* 
        <div
          onClick={() => handleNavigation("/")}
          className="flex flex-row gap-2 hover:cursor-pointer justify-center items-center text-[1.5rem] font-bold text-white hover:opacity-80 transition-colors font-['Oswald'] absolute left-1/2 -translate-x-1/2"
        >
          <img
            src={logo}
            alt="Black Blade"
            className="h-[2.5rem] pt-[0.1rem]"
          />
        </div> */}

        <button
          onClick={onCartOpen}
          className="relative items-center text-white hover:text-gray-200"
        >
          <ShoppingCart className="w-7 h-7 mr-2" />
          {totalItems > 0 && (
            <div className="absolute top-[-0.4rem] right-[-0.4rem]">
              <span className="flex items-center justify-center bg-red-500 text-white text-xs rounded-full w-fit px-[0.4rem] h-5 pt-[0.04rem]">
                <span className="text-xs ">{totalItems}</span>
              </span>
            </div>
          )}
        </button>
      </nav>

      {/* Menu Panel */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className="absolute left-0 top-0 h-full w-full max-w-md bg-zinc-900 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white hover:bg-gray-800 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 p-6">
              <div className="space-y-6">
                <button
                  onClick={() => handleNavigation("/products")}
                  className="text-white hover:text-gray-200 text-xl w-full text-left"
                >
                  Products
                </button>
                <a
                  href="#about"
                  className="block text-white hover:text-gray-200 text-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
