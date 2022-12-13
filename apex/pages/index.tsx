import { Auth } from "@/modules/auth";
import { useAuth } from "@/modules/store/context";
import Menu from "@components/framework/menu";
import Sidebar from "@components/layout/sidebar";
import { Button } from "@mui/material";
import axios from "axios";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { AiOutlinePoweroff } from "react-icons/ai"
const Checkout = dynamic(() => import("../src/components/framework/checkout"), {
  loading: () => <p>...</p>,
  ssr: false
});

const IndexPage = ({ fish, burger, dessert, chinese }) => {

  const { state, dispatch } = useAuth()
  const router = useRouter()
  const [index, setIndex] = useState(0)


  return (
    <main className="bg-slate-100 h-screen  " onContextMenu={(e) => e.preventDefault()}>
      <Head>
        <title>Home</title>
      </Head>

      <Sidebar index={index} setIndex={setIndex}>
        <section className="m-5 w-full">
          {/* //header */}
          <div className="bg-white flex gap-4 items-center p-4 h-24 w-full rounded">
            <span className="flex flex-col gap-2 capitalize w-1/6">
              <h1>{state.name}</h1>
              <small className="font-pacifico">Apex Ranger</small>
            </span>
            {/* search bar */}
            <input type="text" className="border w-4/6 p-2 focus:border-blue-500 outline-none border-red-300 rounded-full" placeholder="Search Dish,Drink..." />
            {/* logout */}
            <div className="h-14 flex items-center  w-1/6 p-4 gap-2 rounded">
              <span className="w-8 grid place-items-center h-8 bg-gradient-to-r  from-rose-500 via-red-400 to-red-500 border-2 border-gray-100 rounded-full text-white capitalize font-bold">{state.name.charAt(0)}</span>
              <Button onClick={() => new Auth().logout(dispatch, router)} className="font-sans capitalize p-0 text-rose-400 border-red-500 px-2" variant="outlined" endIcon={<AiOutlinePoweroff />}>Logout</Button>
            </div>
          </div>
          {/* header  */}
          {/* menus and checkout  */}
          <section className="flex w-full gap-2 mt-2">
            {/* category list  */}
            <div className="w-4/6">
              <div className="flex gap-4 items-center text-slate-500 text-sm">
                <span className="flex flex-col">

                  <b>Foods</b>
                </span>
                <span className="flex flex-col gap-1">

                  <b>
                    <AiOutlineDoubleRight />
                  </b>
                </span>

                <span className="flex flex-col">

                  <b>Regular</b>
                </span>
              </div>
              {/* menu list  */}
              {/* <Menu {...{ fish, burger, dessert, chinese }} index={index} /> */}
            </div>
            {/* checkout  */}
            <Checkout />
          </section>
        </section>
      </Sidebar >
    </main>)
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const burger = await fetch(
    "https://api.spoonacular.com/food/menuItems/search?query=burger&number=20&apiKey=213a1c0376824f59aa90e2f2c20cf445"
  );
  const burgerData = await burger.json();

  const fish = await fetch(
    "https://api.spoonacular.com/food/menuItems/search?query=fish&number=20&apiKey=213a1c0376824f59aa90e2f2c20cf445"
  );

  const data = await fish.json()


  const dessert = await fetch(
    "https://api.spoonacular.com/food/menuItems/search?query=dessert&number=20&apiKey=213a1c0376824f59aa90e2f2c20cf445"
  );
  const dessertData = await dessert.json();

  const chinese = await fetch(
    "https://api.spoonacular.com/food/menuItems/search?query=chinese&number=20&apiKey=213a1c0376824f59aa90e2f2c20cf445"
  );
  const chineseData = await chinese.json();

  return {
    props: {
      // fish: data.menuItems,
      // burger: burgerData.menuItems,
      // dessert: dessertData.menuItems,
      // chinese: chineseData.menuItems,
    },
  };
};
