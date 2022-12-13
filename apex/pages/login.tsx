import { Auth } from "@/modules/auth";
import { useAuth } from "@/modules/store/context";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { toast } from "react-toastify";

//A server's LoginPage
//The Account Id and Password are offered by the restoraunt

const Login = () => {
    const router = useRouter()
    const emailRef = useRef(null) as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef(null) as React.MutableRefObject<HTMLInputElement>;
    const { dispatch } = useAuth()

    return (
        <React.Fragment>
            <Head>
                <title>Account Login</title>
            </Head>
            <main className="bg-white absolute inset-0">

                <div className="border-b-2 p-2 border-slate-500 w-full flex items-center gap-4">
                    <Image src={"/images/logo.png"} height={30} width={30} alt="logo" />
                    <b className="font-pacifico">Apex Ranger Restaraunt</b>
                </div>
                <div className="p-5 w-2/6 flex flex-col my-auto justify-center mt-32 bg-white shadow-lg    h-max  mx-auto md:flex-1">
                    <h3 className="my-4 text-2xl font-semibold text-gray-900">
                        Account Login
                    </h3>
                    <form className="flex flex-col space-y-5" onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => new Auth().login(e, emailRef, passwordRef, router, dispatch)}>
                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold text-gray-900"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                autoFocus
                                className="px-4 py-2 text-gray-900 bg-white font-sans transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                ref={emailRef}
                                required
                                placeholder={"Email"}
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-gray-900"
                                >
                                    Password
                                </label>
                            </div>
                            <input
                                type="password"
                                id="password"
                                className="px-4 text-black py-2 bg-white transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                ref={passwordRef}
                                placeholder={"Password"}
                                required
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-1"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </React.Fragment>
    );
};

export default Login;
