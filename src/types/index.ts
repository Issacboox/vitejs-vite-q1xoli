// types/index.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  stock: number;
  // quantity?:number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string;
  stock: number;
  quantity: number;
}

export const productsData: Product[] = [
  {
    id: 1,
    name: 'Giwi',
    price: 25,
    img: 'https://gardencomposer.com/wp-content/uploads/2024/05/24-Different-Green-Fruits-Including-Photos-1.jpg',
    stock: 29,
  },
  {
    id: 2,
    name: 'Mango',
    price: 25,
    img: 'https://w2.chabad.org/media/images/1038/qoct10387117.jpg?_i=_n32DD4A5CE5B405756B86D11830CBE5B1',
    stock: 291,
  },
  {
    id: 3,
    name: 'Watermelon',
    price: 20,
    img: 'https://5.imimg.com/data5/SELLER/Default/2022/3/ZZ/PW/RZ/36905324/fruits-watermelons-500x500.jpg',
    stock: 2,
  },
  {
    id: 4,
    name: 'Pomegranate',
    price: 35,
    img: 'https://hips.hearstapps.com/hmg-prod/images/pomegranate-1558625011.jpg?crop=1xw:1xh;center,top&resize=640:*',
    stock: 29,
  },
  {
    id: 5,
    name: 'Cantaloop',
    price: 10,
    img: 'https://www.producemarketguide.com/media/user_RZKVrm5KkV/492/cantaloupe_commodity-page.png',
    stock: 29,
  },
  {
    id: 6,
    name: 'Apple',
    price: 15,
    img: 'https://nutritionadvance.com/wp-content/uploads/2017/12/red-and-green-apples.jpg',
    stock: 29,
  },
];

export enum ActionType {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  UPDATE_QUANTITY = 'UPDATE_QUANTITY',
  CLEAR_CART = 'CLEAR_CART',
  INIT_CART_FROM_LOCAL_STORAGE = 'INIT_CART_FROM_LOCAL_STORAGE'
}
