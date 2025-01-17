import { Droplets, Leaf, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/hero-desktop.png";
import mobileHeroImage from "../assets/images/hero-mobile.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <header className="h-[calc(100vh-64px)]">
        <div className="absolute inset-0 top-[64px]">
          <img
            src={heroImage}
            alt="Natural ingredients"
            className="hidden md:block w-full h-[calc(100vh-64px)] object-cover"
          />
          <img
            src={mobileHeroImage}
            alt="Natural ingredients"
            className="md:hidden block w-full h-[calc(100vh-64px)] object-cover"
          />
          <div className="absolute inset-0 md:bg-gradient-to-r bg-gradient-to-b from-black/50 to-transparent md:opacity-20 opacity-50" />
        </div>

        <div className="relative z-10 flex flex-col md:justify-center items-center md:items-start h-full md:pl-[20%] px-12 md:px-4 text-center md:text-left pt-8 md:pt-0">
          <p className="text-white text-xs md:text-sm md:mb-6 mb-4 uppercase bg-emerald-900 px-4 py-2 rounded-md w-fit">
            ALL NEW SCENT
          </p>
          <h2 className="text-5xl md:text-7xl 2xl:text-9xl font-['Oswald'] font-bold text-white mb-2">
            Vanilla & Pine
          </h2>
          <p className="text-md md:text-2xl 2xl:text-3xl text-white mb-4 md:mb-8 max-w-lg 2xl:max-w-4xl text-balance">
            Transport yourself to the a mystic woods with our new scent.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-white text-black text-sm md:text-md w-fit hover:bg-zinc-100 px-8 md:py-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Shop Now
          </button>
        </div>
      </header>

      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Leaf className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">100% Natural</h3>
            <p className="text-gray-600">
              Made with organic ingredients that work in harmony with your body.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Shield className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">24h Protection</h3>
            <p className="text-gray-600">
              Long-lasting protection that keeps you confident throughout the
              day.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Droplets className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Gentle Formula</h3>
            <p className="text-gray-600">
              Safe for sensitive skin and free from harsh chemicals.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Our Story</h2>
          <p className="text-gray-600 mb-8">
            Born from a desire to create truly natural deodorants that actually
            work, Black Blade combines ancient wisdom with modern science. We
            believe in the power of nature to keep you fresh and confident
            throughout your day.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors"
          >
            Shop Our Collection
          </button>
        </div>
      </section>

      <footer className="bg-black text-white py-12 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">BLACK BLADE</h3>
            <p className="text-gray-400">
              Natural deodorants for a better you.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate("/products")}
                  className="text-gray-400 hover:text-white"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/products")}
                  className="text-gray-400 hover:text-white"
                >
                  Original Formula
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/products")}
                  className="text-gray-400 hover:text-white"
                >
                  Sensitive Formula
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
