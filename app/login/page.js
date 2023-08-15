"use client"


import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import the correct hook
import image from "../images/code.png.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  const handleOnClick = () => {
    signIn("google");
  };

  const handleOnClickFacbook = () => {
    signIn("facebook");
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const credentials = {
      email: formData.get("username"),
      password: formData.get("password"),
    };
    try {
      // Call the signIn function with the credentials object
      const response = await signIn("credentials", { ...credentials });
      if (response == null) {
        const errorData = await response.json();
        alert(errorData.error);
        const errorCode = response.status;
        console.log("Error Code:", errorCode);
        setError(true);
      }
      setIsLoading(false);
      // Handle the response, redirect if needed, etc.
    } catch (error) {
      setError(true);
      console.log("Login error:", error);
      // Handle login error if necessary
    }
  };

  const handleLogin = async () => {
    event.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };
    try {
      // Call the signIn function with the credentials object
      const response = await signIn("credentials", { ...credentials });
      if (response == null) {
        const errorData = await response.json();
        alert(errorData.error);
        const errorCode = response.status;
        console.log("Error Code:", errorCode);
      }
      // Handle the response, redirect if needed, etc.
    } catch (error) {
      console.log("Login error:", error);
      // Handle login error if necessary
    }
  };

   return (
    <>
      {status !== "authenticated" ? (
        <div className="h-screen bg-gray-700   flex items-center justify-center">
          <div className="bg-gray-600 h-3/4 w-96 drop-shadow shadow-2xl shadow-gray-950 overflow-auto scrollbar-hide rounded-lg text-white font-bold">
            {/* Rest of your login form code */}
            <div className="bg-gray-500 h-36 flex justify-center items-center">
              <Image
                height={250}
                width={250}
                className="h-32 w-60 bg-slate-200 rounded-full"
                src={image}
                alt="grid icon"
              ></Image>
            </div>

            <div className="flex items-center justify-center text-4xl text-slate-300">
              Login
            </div>
            <div className="">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-72 h-12 ps-5 ml-11 mt-5 text-black rounded-xl hover:scale-105 border-2 border-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="">
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-72 h-12 ps-5 ml-11 mt-4 rounded-xl text-black hover:scale-105 border-2 border-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex text-sm text-slate-300 font-normal ml-12">
              <FontAwesomeIcon
                className="mr-1 mt-1 h-3"
                icon={faCircleCheck}
              ></FontAwesomeIcon>
              remember me
              <div className="text-slate-300 ml-20 italic flex">
                forget password?
              </div>
            </div>

            <div className="ml-20">
              <button
                className="w-32 h-10 ml-11 mt-4 text-lg rounded-xl hover:scale-105 border-2 border-gray-400 bg-gray-950 text-slate-300"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>

            <div className="text-slate-100 flex justify-center items-center">
              OR
            </div>

            <div className="flex">
              <FontAwesomeIcon
                className="hover:scale-125 bg-gray-950 p-2 ml-28 mt-1 h-8 rounded-full"
                icon={faGoogle}
                onClick={handleOnClick}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className="hover:scale-125 bg-gray-950 p-2 ml-20 mt-1 h-8 rounded-full"
                icon={faFacebook}
                onClick={handleOnClickFacbook}
              ></FontAwesomeIcon>
            </div>

            <div className="mt-3 text-sm font-medium flex justify-center items-center">
              dont have an account?
              <div className="flex ml-2 hover:scale-125 font-semibold text-lg">
                <Link href={"/signup"}> Sign Up </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        router.push("/dashboard")
      )}
    </>
  );
}
