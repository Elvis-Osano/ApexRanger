import { SideItem } from "@interfaces/index";
import { FaHome } from "react-icons/fa";
import { BiDish, BiDrink } from "react-icons/bi";
import { GiChickenOven, GiOrangeSlice, GiPopcorn } from "react-icons/gi";
import { IoFastFoodOutline, IoIceCreamOutline } from "react-icons/io5";
import { CiPizza } from "react-icons/ci"
export const sidebarItems: SideItem[] = [
  {
    name: "foods",
    icon: <BiDish size={30} />,
  },
  {
    name: "drinks",
    icon: <BiDrink size={30} />,
  },
  {
    name: "snacks",
    icon: <GiPopcorn size={30} />,
  },
  {
    name: "dessert",
    icon: <IoIceCreamOutline size={30} />,
  },
  {
    name: "packages",
    icon: <IoFastFoodOutline size={30} />,
  },
];
export const sidebarItemsRegular: SideItem[] = [
  {
    name: "Chicken",
    icon: <GiChickenOven size={30} />,
  },
  {
    name: "Pizza",
    icon: <CiPizza size={30} />,
  },
  {
    name: "Orange",
    icon: <GiOrangeSlice size={30} />,
  },
]

