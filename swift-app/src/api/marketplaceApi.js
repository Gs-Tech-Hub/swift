export const categories = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Groceries",
  "Accessories",
];

export const mockProducts = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 8500,
    category: "Electronics",
    image: "https://cdn-icons-png.flaticon.com/512/320/320166.png",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 15000,
    category: "Electronics",
    image: "https://cdn-icons-png.flaticon.com/512/808/808439.png",
  },
  {
    id: 3,
    name: "Leather Handbag",
    price: 12000,
    category: "Fashion",
    image: "https://cdn-icons-png.flaticon.com/512/3133/3133448.png",
  },
  {
    id: 4,
    name: "Running Sneakers",
    price: 18000,
    category: "Fashion",
    image: "https://cdn-icons-png.flaticon.com/512/863/863684.png",
  },
  {
    id: 5,
    name: "Perfume Bottle",
    price: 9500,
    category: "Beauty",
    image: "https://cdn-icons-png.flaticon.com/512/862/862819.png",
  },
  {
    id: 6,
    name: "Table Lamp",
    price: 6000,
    category: "Home",
    image: "https://cdn-icons-png.flaticon.com/512/921/921079.png",
  },
  {
    id: 7,
    name: "Wireless Keyboard",
    price: 11000,
    category: "Electronics",
    image: "https://cdn-icons-png.flaticon.com/512/721/721350.png",
  },
  {
    id: 8,
    name: "Men’s Leather Wallet",
    price: 7500,
    category: "Accessories",
    image: "https://cdn-icons-png.flaticon.com/512/920/920221.png",
  },
  {
    id: 9,
    name: "Organic Honey",
    price: 4500,
    category: "Groceries",
    image: "https://cdn-icons-png.flaticon.com/512/2799/2799801.png",
  },
  {
    id: 10,
    name: "Body Lotion",
    price: 3500,
    category: "Beauty",
    image: "https://cdn-icons-png.flaticon.com/512/3176/3176379.png",
  },
];

export const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), 400);
  });
};
