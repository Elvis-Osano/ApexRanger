import { sidebarItems, sidebarItemsRegular } from "@helpers/index";
import { ButtonBase } from "@mui/material";
import Image from "next/image";

const Sidebar = ({ children, index, setIndex }) => {

  return (
    <section className="flex ">
      <div className="bg-white flex flex-col  h-screen w-28 shadow-lg font-pacifico">
        <div className="h-14 w-4/6 mx-auto mt-5 grid place-items-center font-sans  font-bold ">

          <Image src={"/images/logo.png"} alt="logo" height={52} width={24} ></Image>
          <p>Apex</p>
        </div>
        {sidebarItems.map((item, i) => (
          <ButtonBase key={i} className="text-red-500" onClick={() => setIndex(i)}>
            <span

              className={`${index === i ? "text-rose-500" : "text-gray-500 "} flex capitalize  cursor-pointer gap-2 flex-col py-5 items-center`}

            >
              {item.name} {item.icon}
            </span>
          </ButtonBase>

        ))}
      </div>
      <div className="bg-gradient-to-b from-rose-500 via-red-400 to-red-500 rounded-r-lg h-96 mt-5 w-20">
        {sidebarItemsRegular.map((item, i) => (
          <ButtonBase key={i} className="block w-full">
            <span

              className="flex capitalize text-slate-100  cursor-pointer gap-2 flex-col py-5 items-center"
            >
              {item.name} {item.icon}
            </span>
          </ButtonBase>

        ))}
      </div>
      {children}
    </section>
  );
};

export default Sidebar;
