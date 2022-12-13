import { ButtonBase } from "@mui/material";
import { Utility } from "@utility/index";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { useCart } from "react-use-cart";
const MenuCard = ({ data }) => {
  const { addItem, inCart, getItem, items, updateItemQuantity } = useCart();

  return (
    <ButtonBase className="block bg-white text-white rounded-lg">
      <motion.div
        className={`
        h-36 bg-transparent relative rounded-lg cursor-pointer`}
        onClick={() => {
          inCart(data.id) ? updateItemQuantity(data.id, getItem(data.id).quantity + 1) :
            addItem({
              id: data.id,
              name: data.title,
              price: new Utility().roundTo2Dp(Math.random() * 100),
            })
        }

        }
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
      // transition={{ delay: 0.3 }}

      >
        {
          inCart(data.id) ? <div className="absolute inset-0 border-pink-600 rounded border-2 z-10 ">
            <span className="absolute bottom-0 right-0 h-8 w-8 grid place-items-center text-white bg-gradient-to-br  from-red-500 via-red-400 to-pink-500 rounded-tl-lg">
              {getItem(data.id).quantity}
            </span>
          </div> : null
        }

        <div className="absolute inset-0 rounded-lg">
          <Image src={data.image} className="absolute rounded-lg" fill alt="hello" />
        </div>
        <span className="absolute bg-gradient-to-r from-rose-500 via-red-400 to-red-500 top-3 w-4/6 px-2 py-1 rounded-full text-white left-2 right-4">
          Ksh 750
        </span>
        <span
          style={style}
          className="w-4/6 h-8 overflow-hidden bg-white/75 px-2 py-1 text-black rounded-lg"
        >
          {data.title}
        </span>
      </motion.div></ButtonBase>
  );
};

export default MenuCard;
const style: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};
