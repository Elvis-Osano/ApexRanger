import React from "react";

import { Item } from "react-use-cart";
export interface SideItem {
  name: string;
  icon: React.ReactElement;
}
export interface Product extends Item {
  name: string;
  image: string;
}
export interface valuType {
  state: {
    auth: boolean;
    name: string;
  };
  dispatch: React.Dispatch<{
    type: string;
    payload?: any;
  }>;
}
export interface menuItem {
  id: string;
  title: string;
  image: string;
  imageType: string;
  restaurantChain: string;
  servingSize: string;
  readableServingSize: string;
  servings: Servings;
  price: number;
}

interface Servings {
  number: number;
  size: number;
  unit: string;
}
