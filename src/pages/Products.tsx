import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Product, CartItem } from "../types/product";
import { useState } from "react";

interface ProductsProps {
  products: Product[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  loading: boolean;
}

export default function Products({
  products,
  addToCart,
  loading,
}: ProductsProps) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCardClick = (handle: string, e: React.MouseEvent) => {
    // Don't navigate if clicking the Add to Cart button
    if ((e.target as HTMLElement).closest("button")) return;

    navigate(`/products/${handle}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Our Products</h1>
            <p className="text-gray-600">
              Experience the power of natural protection
            </p>
          </div>
          <div className="relative">
            <button
              className="text-zinc-600 hover:text-zinc-900 transition-colors underline underline-offset-4 group"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex items-center gap-1">
                Sort by{" "}
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 p-4 text-sm bg-white border border-zinc-100 rounded-lg shadow-md z-20 space-y-4">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-zinc-50 text-zinc-600"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Featured
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-zinc-50 text-zinc-600"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Price: Low to High
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-zinc-50 text-zinc-600"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Price: High to Low
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-zinc-50 text-zinc-600"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Alphabetical: A-Z
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-zinc-50 text-zinc-600 rounded-b-lg"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Alphabetical: Z-A
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden border border-transparent hover:border-zinc-400 cursor-pointer transition-colors duration-200"
                onClick={(e) => handleCardClick(product.handle, e)}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity" />
                </div>
                <div className="px-2 pt-6 pb-2">
                  <h3 className="text-2xl font-['Oswald'] font-semibold mb-2">
                    {product.name}
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-xl font-['Oswald'] font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-md text-gray-500 line-through font-['Oswald']">
                      ${(product.price + 5).toFixed(2)}
                    </p>
                    <div className="flex items-center justify-center bg-emerald-900 text-white px-2 py-1 rounded-lg ml-2">
                      <p className="text-xs">15% OFF</p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        variantId: product.variantId,
                      })
                    }
                    className="w-full text-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
