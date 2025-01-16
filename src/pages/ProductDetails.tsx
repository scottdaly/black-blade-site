import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Product, CartItem } from '../types/product';
import { fetchProductByHandle } from '../lib/shopify';

interface ProductDetailsProps {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

export default function ProductDetails({ addToCart }: ProductDetailsProps) {
  const { handle } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) {
        navigate('/products');
        return;
      }

      try {
        const productData = await fetchProductByHandle(handle);
        setProduct(productData);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <button
          onClick={() => {
            navigate('/products');
            window.scrollTo(0, 0);
          }}
          className="flex items-center text-gray-600 hover:text-black mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>
            <div className="prose prose-lg max-w-none mb-8">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="text-gray-600 text-lg leading-relaxed mb-4 whitespace-pre-line">{children}</p>,
                  h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 text-gray-900">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-bold mb-3 text-gray-900">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-bold mb-2 text-gray-900">{children}</h3>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-600">{children}</ol>,
                  li: ({ children }) => <li>{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  em: ({ children }) => <em className="italic text-gray-900">{children}</em>,
                  br: () => <br className="mb-4" />
                }}
              >
                {product.description.replace(/\n/g, '  \n')}
              </ReactMarkdown>
            </div>
            
            <button
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                variantId: product.variantId
              })}
              className="w-full bg-black text-white py-4 rounded-full hover:bg-gray-800 transition-colors mb-8"
            >
              Add to Cart
            </button>

            {/* Debug section */}
            <div className="hidden">
              {JSON.stringify(product.ingredients)}
            </div>

            {product.ingredients && product.ingredients.length > 0 ? (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mb-8 text-gray-500">No ingredients listed</div>
            )}

            {product.benefits && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Key Benefits</h2>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Shield className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 