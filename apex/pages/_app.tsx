import { StyledEngineProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { CartProvider } from "react-use-cart";
import "../styles/styles.css";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useReducer } from "react";
import { reducer } from "@/modules/store/reducer";
import { UserProvider } from "@/modules/store/context";
export default function MyApp({ Component, pageProps }: AppProps) {


  return (
    <UserProvider >
      <StyledEngineProvider injectFirst>
        <CartProvider>

          <Component {...pageProps} />
          <ToastContainer position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}

            closeOnClick
            pauseOnHover />
        </CartProvider>

      </StyledEngineProvider></UserProvider>
  );
}
