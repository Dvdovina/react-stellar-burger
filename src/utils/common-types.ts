//Типы для Ингредиентов

export type TIngredient = {
  _id: string;
  id: string
  name: string;
  price: number;
  image: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  image_mobile: string;
  image_large: string;
  __v?: number;
  count?: number;
  index: number;
  key: (key: string) => void;
}

export type TDraggableItem = TIngredient & { id: string }

// Типы для заказа

export type TStatus = "created" | "pending" | "done";

export type TRequest = 'loading' | 'resolved' | 'rejected';

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: TStatus;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price?: number;
}

//Тип для ProtectedRoute

export type TProtectedRoute = {
  onlyUnAuth: boolean;
  component: JSX.Element
}
