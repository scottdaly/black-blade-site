export interface Product {
    id: string;
    name: string;
    handle: string;
    description: string;
    price: number;
    image: string;
    variantId: string;
    benefits?: string[];
    ingredients?: string[];
  }
  
  export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    variantId: string;
  } 