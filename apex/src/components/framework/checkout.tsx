import { CheckOut } from "@/modules/checkout";
import CheckItem from "@components/cards/checkItem";

import { Product } from "@interfaces/index";
import { Button } from "@mui/material";
import { Utility } from "@utility/index";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useCart } from "react-use-cart";

const Checkout = () => {
  const { items, emptyCart, cartTotal } = useCart();
  let total = new Utility().roundTo2Dp(cartTotal);
  const router = useRouter()


  return (
    <section className=" h-full  w-2/6">
      <div className="h-18 bg-gradient-to-r text-white from-rose-500 via-red-400 to-red-500 p-2 rounded-t-lg w-full gap-4 border-b">
        <h4>New Order</h4>
        <span>{new Date().toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}</span>
      </div>
      <ul className="overflow-y-scroll h-80 w-full">
        {items.map((item: Product, i) => (
          <CheckItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="bg-white p-4 mt-1 flex flex-col gap-2">
        <span className="flex justify-between">
          <h5>Subtotal</h5>
          <span className="text-rose-500">{total}</span>
        </span>
        <span className="flex justify-between">
          <h5>Total</h5>
          <span className="text-rose-500">{total}</span>
        </span>
        <div className="flex justify-between">
          <Button
            className="hover:bg-red-500/75 hover:text-white font-bold"
            variant="text"
            onClick={() => emptyCart()}
          >
            Cancel
          </Button>
          <Button
            className="bg-teal-500"
            variant="contained"
            onClick={() => new CheckOut().placeOrder(items, total, router)}
          >
            {" "}
            Place Order
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
