import MenuCard from "@components/cards/menuCard";
import { menuItem } from "@interfaces/index";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// const MenuCard = dynamic(() => import("../cards/menuCard"), {
//   ssr: false,
//   loading: () => <p>...</p>,
// });
const Menu = ({ fish, burger, dessert, chinese, index }) => {
  const menus = [fish, burger, dessert, chinese, fish,]

  return (


    <section

      className="grid grid-cols-3 gap-4 mt-2 pr-2 h-[510px]  overflow-y-scroll overflow-x-hidden ">
      {menus[index].map((food: menuItem) => (
        <MenuCard key={food.id} data={food} />
      ))}
    </section>
  );
};

export default Menu;
