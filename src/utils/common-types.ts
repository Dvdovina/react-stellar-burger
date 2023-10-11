export enum FoodType {
    Bun = 'bun',
    Main = 'main',
    Sauce = 'sauce'
  }

export type TIngredient = {
    _id: string;
    name: string;
    price: number;
    image: string;
    type: FoodType;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    image_mobile: string;
    image_large: string;
    __v: number;
    count?: number;
  }

  export type TStatus = "created" | "pending" | "done";

  export type TOrder = {
    _id: string;
    ingredients: TIngredient[];
    status: TStatus;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price?: number;
  }

  export type TOrdersStats = {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
  }

  export type TUser = {
    name: string;
    email: string;
    password: string;
  }
 
  export type TUserLogin = {
    email: string;
    password: string;
  }

  export type TUserEmail = {
    email: string;
  }

  export type TPasswordReset = {
    password: string;
    token: string;
  };