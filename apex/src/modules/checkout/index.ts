import axios from "axios";
import { NextRouter } from "next/router";
import { toast } from "react-toastify";
import { Item } from "react-use-cart";

export class CheckOut {
  placeOrder = async (items: Item[], total: number, router: NextRouter) => {
    let payload = { table: 54, orders: items, total: total };

    await axios
      .post("http://localhost:3000/orders", payload, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // toast.success("Success", {
        //   autoClose: 500
        // })
        let a = document.createElement("a");
        a.href = `http://localhost:5000/`;
        a.download = "invoice.json";
        a.target = "_blank";
        a.click();
      })
      .catch((err) => {
        toast.error(
          (err.message as string).includes("401")
            ? "Unauthorized,Please Login in"
            : "null"
        );
        router.push("/login");
      });
  };
}
