import { Button } from "@mui/material";

import { GrFormAdd, GrFormSubtract } from "react-icons/gr";
import { ImBin } from "react-icons/im";
import { useCart } from "react-use-cart";
import { motion, AnimatePresence } from "framer-motion"
import Utility from "@utility/index";
const CheckItem = ({ item }) => {
  const { updateItemQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>


      <motion.li exit={{
        opacity: 0,
        x: -200
      }}
        initial={{
          opacity: 0,
          x: 200
        }}
        animate={{
          opacity: 1,
          x: 0
        }}
        className="grid grid-cols-6 px-4 w-full border-b h-20 ">
        <span className="grid place-items-center mr-2">
          <ImBin
            color="red"
            className="w-5 cursor-pointer"
            onClick={() => removeItem(item.id)}
          />
        </span>

        <span className="flex flex-col justify-center  col-span-3">
          <b className="h-6 overflow-hidden">{item.name}</b>
          <span>@{item.price}</span>
        </span>

        <div className="grid grid-cols-2 grid-rows-2 border rounded w-16 h-14 mt-3 border-red-100">
          <span className=" row-span-2 grid place-items-center">
            {item.quantity}
          </span>
          <span className="grid grid-rows-2 bg-red-100 text-white  row-span-2  ">
            <span className="  w-full  grid place-items-center cursor-pointer overflow-hidden hover:bg-teal-100 ">
              <Button
                className="justify-start"
                startIcon={<GrFormAdd className="" />}
                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              ></Button>
            </span>

            <span className="  w-full grid place-items-center cursor-pointer hover:bg-red-300 overflow-hidden">
              <Button
                className="justify-start h-full"
                startIcon={<GrFormSubtract />}
                disabled={item.quantity === 1}
                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              ></Button>
            </span>
          </span>
        </div>

        <span className="grid place-items-center ml-2">
          {Utility.roundTo2Dp(item.itemTotal)}
        </span>
      </motion.li></AnimatePresence>
  );
};

export default CheckItem;
