import axios from "axios";
import { NextRouter } from "next/router";
import { toast } from "react-toastify";

const Auth = {
  //LogOut User
  logout: (
    dispatch: React.Dispatch<{
      type: string;
      payload?: any;
    }>,
    router: NextRouter
  ) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({ type: "logout" });
        router.push("/login");
      })
      .catch((err) => {});
  },
  //User Login
  login: (
    e: React.ChangeEvent<HTMLFormElement>,
    emailRef: React.MutableRefObject<HTMLInputElement>,
    passwordRef: React.MutableRefObject<HTMLInputElement>,
    router: NextRouter,
    dispatch: React.Dispatch<{
      type: string;
      payload?: any;
    }>
  ) => {
    e.preventDefault();

    let payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_URL}/auth/login`, payload, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: "signIn", payload: res.data.name });
        if (res.status === 201) router.push("/");
      })
      .catch((err) => {
        toast.error("Invalid Email Or Password");
      });
  },
};
export default Auth;
