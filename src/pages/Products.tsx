import { Grid, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Product, CartItem } from '../types/product';

interface ProductsProps {
  products: Product[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  loading: boolean;
}

export default function Products({ products, addToCart, loading }: ProductsProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Our Products</h1>
            <p className="text-gray-600">Experience the power of natural protection</p>
          </div>
          <div className="flex items-center space-x-4">
            <Grid className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">{products.length} Products</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="prose prose-sm max-w-none text-gray-600 mb-4 line-clamp-2">
                    <ReactMarkdown>{product.description}</ReactMarkdown>
                  </div>
                  {product.benefits && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Key Benefits:</h4>
                      <ul className="text-sm text-gray-600">
                        {product.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="flex items-center">
                            <Shield className="w-4 h-4 text-green-600 mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        navigate(`/products/${product.handle}`);
                        window.scrollTo(0, 0);
                      }}
                      className="flex-1 text-center border-2 border-black text-black px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        variantId: product.variantId
                      })}
                      className="flex-1 text-center bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 