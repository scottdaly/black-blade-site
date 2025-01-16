import { GraphQLClient } from "graphql-request";

interface ShopifyMetafieldReference {
  fields: Array<{
    key: string;
    value: string;
  }>;
}

interface ShopifyMetafield {
  key: string;
  value: string;
  references?: {
    edges: Array<{
      node: ShopifyMetafieldReference;
    }>;
  };
}

interface ShopifyImage {
  edges: Array<{
    node: {
      url: string;
    };
  }>;
}

interface ShopifyVariant {
  edges: Array<{
    node: {
      id: string;
      price: {
        amount: string;
        currencyCode: string;
      };
    };
  }>;
}

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: ShopifyImage;
  variants: ShopifyVariant;
  metafields: ShopifyMetafield[];
}

interface ProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

interface ProductByHandleResponse {
  productByHandle: ShopifyProduct;
}

// Initialize GraphQL client with Shopify's Storefront API endpoint
const storefrontClient = new GraphQLClient(
  `https://${
    import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
  }/api/2025-01/graphql.json`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token":
        import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
      "Content-Type": "application/json",
    },
  }
);

// Query to fetch all products
const GET_PRODUCTS = `
  query GetProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          metafields(identifiers: [
            {namespace: "shopify", key: "ingredients"}
          ]) {
            key
            value
            references(first: 10) {
              edges {
                node {
                  ... on Metaobject {
                    handle
                    type
                    fields {
                      key
                      value
                    }
                  }
                }
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Query to fetch a single product by handle
const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      images(first: 1) {
        edges {
          node {
            url
          }
        }
      }
      metafields(identifiers: [
        {namespace: "shopify", key: "ingredients"}
      ]) {
        key
        value
        references(first: 10) {
          edges {
            node {
              ... on Metaobject {
                handle
                type
                fields {
                  key
                  value
                }
              }
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

// Mutation to create a cart and get checkout URL
const CREATE_CART = `
  mutation createCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variantId: string;
}

export async function fetchProducts() {
  try {
    console.log("Fetching products");
    const data = await storefrontClient.request<ProductsResponse>(GET_PRODUCTS);
    console.log("Got products");
    console.log("Products data:", data);
    return data.products.edges.map((edge) => {
      const ingredientsField = edge.node.metafields?.find(
        (field) => field.key === "ingredients"
      );
      const ingredientRefs = ingredientsField?.references?.edges || [];

      const ingredients = ingredientRefs
        .map((ref) => {
          const fields = ref.node?.fields || [];
          return fields.find((field) => field?.key === "label")?.value;
        })
        .filter(
          (value): value is string => value !== undefined && value !== null
        );

      return {
        id: edge.node.id,
        name: edge.node.title,
        handle: edge.node.handle,
        description: edge.node.description,
        price: parseFloat(edge.node.variants.edges[0].node.price.amount),
        image: edge.node.images.edges[0]?.node.url,
        variantId: edge.node.variants.edges[0].node.id,
        ingredients,
      };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchProductByHandle(handle: string) {
  try {
    const data = await storefrontClient.request<ProductByHandleResponse>(
      GET_PRODUCT_BY_HANDLE,
      { handle }
    );
    const product = data.productByHandle;

    // Debug logs
    console.log("Raw Product Data:", product);
    const ingredientsField = product.metafields?.find(
      (field) => field.key === "ingredients"
    );
    console.log("Ingredients Field:", ingredientsField);
    const ingredientRefs = ingredientsField?.references?.edges || [];
    console.log("Ingredient References:", ingredientRefs);

    const ingredients = ingredientRefs
      .map((ref) => {
        console.log("Processing Reference:", ref);
        const fields = ref.node?.fields || [];
        console.log("Reference Fields:", fields);
        const value = fields.find((field) => field?.key === "label")?.value;
        console.log("Found Value:", value);
        return value;
      })
      .filter(
        (value): value is string => value !== undefined && value !== null
      );

    console.log("Final Ingredients List:", ingredients);

    return {
      id: product.id,
      name: product.title,
      handle: product.handle,
      description: product.description,
      price: parseFloat(product.variants.edges[0].node.price.amount),
      image: product.images.edges[0]?.node.url,
      variantId: product.variants.edges[0].node.id,
      ingredients,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function createShopifyCheckout(cartItems: CartItem[]) {
  try {
    const lines = cartItems.map((item) => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
    }));

    const variables = {
      input: {
        lines,
      },
    };

    const response = await storefrontClient.request<{
      cartCreate: {
        cart: { checkoutUrl: string };
        userErrors: Array<{ field: string; message: string }>;
      };
    }>(CREATE_CART, variables);

    if (response.cartCreate.userErrors.length > 0) {
      throw new Error(response.cartCreate.userErrors[0].message);
    }

    return response.cartCreate.cart.checkoutUrl;
  } catch (error) {
    console.error("Error creating checkout:", error);
    throw error;
  }
}
