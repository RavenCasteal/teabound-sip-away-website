import { TeaItem } from '@/components/CartContext';

export const teaItems: TeaItem[] = [
  {
    id: 1,
    name: "Classic Milk Tea",
    description: "Our signature milk tea with a perfect balance of tea and milk.",
    price: 120,
    image: "/lovable-uploads/Chocolate-Milktea.png",
    category: "Classic",
    sizes: [
      { label: "Small", oz: 12, price: 120 },
      { label: "Medium", oz: 16, price: 140 },
      { label: "Large", oz: 22, price: 160 }
    ]
  },
  {
    id: 2,
    name: "Strawberry Milk Tea",
    description: "Sweet and fruity milk tea with fresh strawberry flavor.",
    price: 140,
    image: "/lovable-uploads/Strawberry-Milktea.png",
    category: "Classic",
    sizes: [
      { label: "Small", oz: 12, price: 140 },
      { label: "Medium", oz: 16, price: 160 },
      { label: "Large", oz: 22, price: 180 }
    ]
  },
  {
    id: 3,
    name: "Honeydew Milk Tea",
    description: "Refreshing milk tea with the sweet taste of honeydew melon.",
    price: 140,
    image: "/lovable-uploads/Honeydew-Milktea.png",
    category: "Classic",
    sizes: [
      { label: "Small", oz: 12, price: 140 },
      { label: "Medium", oz: 16, price: 160 },
      { label: "Large", oz: 22, price: 180 }
    ]
  },
  {
    id: 4,
    name: "Chocolate Latte",
    description: "Rich and creamy chocolate latte with a hint of coffee.",
    price: 150,
    image: "/lovable-uploads/Chocolate-Latte.png",
    category: "Specialty"
  },
  {
    id: 5,
    name: "Black Forest Cake",
    description: "Classic chocolate cake with cherries and whipped cream.",
    price: 220,
    image: "/lovable-uploads/Blackforest-Cake.png",
    category: "Cakes"
  },
  {
    id: 6,
    name: "Strawberry Shortcake",
    description: "Light and fluffy cake with fresh strawberries and cream.",
    price: 240,
    image: "/lovable-uploads/Strawberryshort-Cake.png",
    category: "Cakes"
  },
  {
    id: 7,
    name: "Matcha Cheesecake",
    description: "Creamy cheesecake with premium matcha green tea.",
    price: 260,
    image: "/lovable-uploads/Matchacheese-Cake.png",
    category: "Cakes"
  },
  {
    id: 8,
    name: "Croissant",
    description: "Buttery and flaky French pastry.",
    price: 90,
    image: "/lovable-uploads/48c1a476-c39c-11e7-9f00-d8b0ccf89a9f_1280x720_103751.png",
    category: "Pastries"
  },
  {
    id: 9,
    name: "Chocolate Muffin",
    description: "Rich chocolate muffin with chocolate chips.",
    price: 100,
    image: "/lovable-uploads/83770663-72bf-4417-a816-80998f247343.png",
    category: "Pastries"
  },
  {
    id: 10,
    name: "Almond Danish",
    description: "Flaky pastry filled with almond cream and topped with sliced almonds.",
    price: 120,
    image: "/lovable-uploads/Almond-Danish.png",
    category: "Pastries"
  },
  {
    id: 11,
    name: "Earl Grey Cold Brew",
    description: "Smooth and aromatic cold brewed Earl Grey tea.",
    price: 120,
    image: "/lovable-uploads/Cold-Brewed-Black-Tea.png",
    category: "Cold Brewed"
  },
  {
    id: 12,
    name: "Jasmine Cold Brew",
    description: "Floral and refreshing cold brewed jasmine tea.",
    price: 130,
    image: "/lovable-uploads/Cold-Brewed-Green-Tea.png",
    category: "Cold Brewed"
  },
  {
    id: 13,
    name: "Oolong Cold Brew",
    description: "Rich and complex cold brewed oolong tea.",
    price: 130,
    image: "/lovable-uploads/Cold-Brewed-Oolong.png",
    category: "Cold Brewed"
  }
]; 