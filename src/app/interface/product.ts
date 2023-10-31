export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: {
    id: number;
    name: string;
  };
}
