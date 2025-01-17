import { useState, useEffect } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { createShopifyCheckout, fetchProducts } from "./lib/shopify";
import { Product, CartItem } from "./types/product";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Loading products");
    const loadProducts = async () => {
      try {
        const shopifyProducts = await fetchProducts();
        setProducts(shopifyProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const checkoutUrl = await createShopifyCheckout(cartItems);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const renderCart = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
        isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex flex-row justify-between items-center w-full">
                        <h3 className="font-semibold text-lg font-['Oswald']">
                          {item.name}
                        </h3>
                        <p className="text-gray-800 font-['Oswald']">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-gray-600">Men's Deodorant</p>
                      <div className="flex flex-row justify-between w-full">
                        <div className="flex items-center space-x-4 mt-2 border border-zinc-300 rounded-lg w-fit">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-gray-100 text-emerald-800 rounded-l-lg"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-md font-['Oswald']">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-gray-100 text-emerald-800 rounded-r-lg"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="py-2 px-3 hover:bg-zinc-100 rounded hover:text-red-500 text-zinc-400"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t p-6">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="block w-full bg-black text-white text-center py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {renderCart()}
      <Nav totalItems={totalItems} onCartOpen={() => setIsCartOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <Products
              products={products}
              addToCart={addToCart}
              loading={loading}
            />
          }
        />
        <Route
          path="/products/:handle"
          element={<ProductDetails addToCart={addToCart} />}
        />
      </Routes>
    </>
  );
}

export default App;
