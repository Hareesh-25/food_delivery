import { MenuItem, Category, Promotion } from '@/types';

export const categories: Category[] = [
  { 
    id: '1', 
    name: 'Appetizers', 
    imageUrl: 'https://images.pexels.com/photos/1213271/pexels-photo-1213271.jpeg?auto=compress&cs=tinysrgb&w=600' 
  },
  { 
    id: '2', 
    name: 'Main Courses', 
    imageUrl: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600' 
  },
  { 
    id: '3', 
    name: 'Salads', 
    imageUrl: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=600' 
  },
  { 
    id: '4', 
    name: 'Desserts', 
    imageUrl: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600' 
  },
  { 
    id: '5', 
    name: 'Beverages', 
    imageUrl: 'https://images.pexels.com/photos/452737/pexels-photo-452737.jpeg?auto=compress&cs=tinysrgb&w=600' 
  },
];

export const menuItems: MenuItem[] = [
  {
    id: '101',
    name: 'Crispy Calamari',
    description: 'Tender calamari lightly fried to perfection, served with our house marinara sauce.',
    price: 12.99,
    imageUrl: 'https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: '1',
    isPopular: true,
    options: [
      {
        id: 'opt1',
        name: 'Dipping Sauce',
        choices: [
          { id: 'c1', name: 'Marinara', price: 0 },
          { id: 'c2', name: 'Garlic Aioli', price: 0 },
          { id: 'c3', name: 'Spicy Mayo', price: 0.50 }
        ],
        required: true,
        multiSelect: false
      }
    ]
  },
  {
    id: '102',
    name: 'Bruschetta',
    description: 'Toasted baguette topped with fresh tomatoes, basil, garlic, and extra virgin olive oil.',
    price: 9.99,
    imageUrl: 'https://images.pexels.com/photos/7937469/pexels-photo-7937469.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: '1',
    isVegetarian: true,
  },
  {
    id: '201',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon grilled to perfection, served with seasonal vegetables and lemon herb sauce.',
    price: 24.99,
    imageUrl: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: '2',
    isPopular: true,
    options: [
      {
        id: 'opt2',
        name: 'Cooking Preference',
        choices: [
          { id: 'c4', name: 'Medium Rare', price: 0 },
          { id: 'c5', name: 'Medium', price: 0 },
          { id: 'c6', name: 'Well Done', price: 0 }
        ],
        required: true,
        multiSelect: false
      },
      {
        id: 'opt3',
        name: 'Side',
        choices: [
          { id: 'c7', name: 'Roasted Potatoes', price: 0 },
          { id: 'c8', name: 'Steamed Rice', price: 0 },
          { id: 'c9', name: 'Quinoa', price: 1.50 }
        ],
        required: true,
        multiSelect: false
      }
    ]
  },
  {
    id: '202',
    name: 'Fettuccine Alfredo',
    description: 'Homemade fettuccine pasta in a rich, creamy Alfredo sauce with Parmesan cheese.',
    price: 18.99,
    imageUrl: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: '2',
    isVegetarian: true,
    options: [
      {
        id: 'opt4',
        name: 'Add Protein',
        choices: [
          { id: 'c10', name: 'Grilled Chicken', price: 4.99 },
          { id: 'c11', name: 'Shrimp', price: 5.99 },
          { id: 'c12', name: 'None', price: 0 }
        ],
        required: true,
        multiSelect: false
      }
    ]
  },
  {
    id: '301',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce, Parmesan cheese, and croutons tossed in our homemade Caesar dressing.',
    price: 10.99,
    imageUrl: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: '3',
    options: [
      {
        id: 'opt5',
        name: 'Add Protein',
        choices: [
          { id: 'c13', name: 'Grilled Chicken', price: 4.99 },
          { id: 'c14', name: 'Shrimp', price: 5.99 },
          { id: 'c15', name: 'None', price: 0 }
        ],
        required: true,
        multiSelect: false
      }
    ]
  },
  {
    id: '401',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    price: 8.99,
    imageUrl: 'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: '4',
    isPopular: true,
    isVegetarian: true,
  },
  {
    id: '501',
    name: 'Fresh Lemonade',
    description: 'Handcrafted lemonade made with fresh lemons and a hint of mint.',
    price: 4.99,
    imageUrl: 'https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: '5',
    isVegetarian: true,
  },
];

export const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Free Delivery on Your First Order',
    description: 'Use code WELCOME for free delivery on your first order!',
    imageUrl: 'https://images.pexels.com/photos/6036086/pexels-photo-6036086.jpeg?auto=compress&cs=tinysrgb&w=600',
    discount: 0,
    discountType: 'fixed',
    code: 'WELCOME',
    validUntil: '2025-12-31',
  },
  {
    id: '2',
    title: '20% Off Family Meals',
    description: 'Order any family meal and get 20% off with code FAMILY20',
    imageUrl: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=600',
    discount: 20,
    discountType: 'percentage',
    code: 'FAMILY20',
    validUntil: '2025-08-31',
  },
  {
    id: '3',
    title: 'Free Dessert with Orders Over $50',
    description: 'Spend $50 or more and get a free dessert of your choice!',
    imageUrl: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
    discount: 0,
    discountType: 'fixed',
    code: 'SWEETDEAL',
    validUntil: '2025-10-31',
  }
];

export const restaurantInfo = {
  name: "Delizioso",
  tagline: "Authentic Italian Cuisine",
  address: "123 Main Street, Foodtown, NY 10001",
  phone: "(555) 123-4567",
  email: "info@delizioso.com",
  hours: {
    monday: "11:00 AM - 10:00 PM",
    tuesday: "11:00 AM - 10:00 PM",
    wednesday: "11:00 AM - 10:00 PM",
    thursday: "11:00 AM - 10:00 PM",
    friday: "11:00 AM - 11:00 PM",
    saturday: "10:00 AM - 11:00 PM",
    sunday: "10:00 AM - 9:00 PM"
  },
  socialMedia: {
    instagram: "@delizioso",
    facebook: "fb.com/delizioso",
    twitter: "@delizioso_eats"
  },
  about: "Established in 2010, Delizioso brings the authentic flavors of Italy to your table. Our chef, with 20 years of experience in traditional Italian cooking, crafts each dish with passion and the finest ingredients."
};