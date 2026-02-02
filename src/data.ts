export interface Pizza {
  id: number;
  name: string;
  price: number;
  description: string;
  calories: string;
  protein: string;
  image: string;
}

export const PIZZAS: Pizza[] = [
  {
    id: 1,
    name: "Pepperoni Pizzy",
    price: 12.99,
    description: "Classic pepperoni with mozzarella cheese and signature tomato sauce.",
    calories: "280 kcal",
    protein: "14g",
    // Reliable high-res PNG
    image: "/pepperoni.png"
  },
  {
    id: 2,
    name: "Veggie Garden",
    price: 10.99,
    description: "Bell peppers, onions, mushrooms, and olives on a thin crust.",
    calories: "210 kcal",
    protein: "8g",
    // Reliable high-res PNG
    image: "/veggie.png"
  }
];