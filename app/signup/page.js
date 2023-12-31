"use client";
import React, { Component } from "react";
import Image from "next/image";
import image from "../images/code.png.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [signupdata, setsignupdata] = useState({});
  const router = useRouter();

  async function submitFormData(event) {
    event.preventDefault();
    try {
      const response = await fetch("../api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupdata), // Use the updated formData with the image URL
      })
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        const errorCode = response.status;
        console.log("Error Code:", errorCode);
      } else {
        console.log("hello");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <form onSubmit={submitFormData} className="h-screen bg-gray-700   flex items-center justify-center">
      <div
        className="bg-gray-600 h-4/5 w-3/5 drop-shadow shadow-2xl shadow-gray-950 
           overflow-auto rounded-lg scrollbar-hide"
      >
        <div className="bg-gray-500 h-36 flex justify-center items-center">
          <Image
            height={250}
            width={250}
            className=" h-32 w-96 bg-slate-200 rounded-full"
            src={image}
            alt="grid icon"
          ></Image>
        </div>
        <div className=" flex items-center justify-center text-4xl font-bold text-slate-300">
          Sign Up
        </div>

        <div className="bg-gray-600 mt-8 rounded-xl hover:scale-105 flex justify-center">
          <div className="relative flex items-center w-1/2">
            <FontAwesomeIcon
              className="h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
              icon={faUser}
            ></FontAwesomeIcon>
            <input
              type="textbox"
              required
              placeholder="Enter Your Name"
              onChange={(e) => {
                setsignupdata({ ...signupdata, name: e.target.value });
              }}
              className="rounded-xl p-2 text-black w-full pl-10 text-center"
            />
          </div>
        </div>

        <div className="bg-gray-600 mt-5 rounded-xl hover:scale-105 flex justify-center">
          <div className="relative flex items-center w-1/2">
            <FontAwesomeIcon
              className="h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
              icon={faEnvelope}
            ></FontAwesomeIcon>
            <input
              type="textbox"
              required
              placeholder="Enter Your Email"
              onChange={(e) => {
                setsignupdata({ ...signupdata, email: e.target.value });
              }}
              className="rounded-xl p-2 text-black w-full pl-10 text-center"
            />
          </div>
        </div>

        <div className="bg-gray-600 mt-5 rounded-xl hover:scale-105 flex justify-center">
          <div className="relative flex items-center w-1/2">
            <FontAwesomeIcon
              className="h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
              icon={faPhone}
            ></FontAwesomeIcon>
            <input
              type="textbox"
              required
              placeholder="Enter Your Phone"
              onChange={(e) => {
                setsignupdata({ ...signupdata, phone: e.target.value });
              }}
              className="rounded-xl p-2 text-black w-full pl-10 text-center"
            />
          </div>
        </div>

        <div className="bg-gray-600 mt-5 rounded-xl hover:scale-105 flex justify-center">
          <div className="relative flex items-center w-1/2">
            <FontAwesomeIcon
              className="h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
              icon={faLock}
            ></FontAwesomeIcon>
            <input
              type="textbox"
              required
              placeholder="Enter Your Password"
              onChange={(e) => {
                setsignupdata({ ...signupdata, password: e.target.value });
              }}
              className="rounded-xl p-2 text-black w-full pl-10 text-center"
            />
          </div>
        </div>

        <div className="bg-gray-600 mt-5 rounded-xl hover:scale-105 flex justify-center">
          <div className="relative flex items-center w-1/2">
            <FontAwesomeIcon
              className="h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
              icon={faLock}
            ></FontAwesomeIcon>
            <input
              type="textbox"
              placeholder="Enter Your Confirm Password*"
              className="rounded-xl p-2 text-black w-full pl-10 text-center"
            />
          </div>
        </div>

        <div className=" mt-5 flex items-center justify-center">
          <button type="submit" className="w-32 h-10 text-lg  rounded-xl hover:scale-105 border-2 border-gray-400 bg-gray-950 text-slate-300">
            SignUp
          </button>
        </div>

        <div className=" text-slate-100 mt-3 flex justify-center items-center">
          OR
        </div>

        <div className="flex justify-center items-center">
          <FontAwesomeIcon
            className=" hover:scale-125  bg-gray-950 p-2 text-white ml-18 mt-1 h-8 rounded-full"
            icon={faGoogle}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className=" hover:scale-125 bg-gray-950 p-2 text-white text-2xl ml-20 mt-1 h-8 rounded-full"
            icon={faFacebook}
          ></FontAwesomeIcon>
        </div>

        <divc className=" mt-3 text-sm font-medium flex justify-center items-center">
          dont have an account?
          <div className="flex ml-2 hover:scale-125  font-semibold text-lg">
            <Link href={"./login"}>Sign In</Link>{" "}
          </div>
        </divc>
      </div>
    </form>
  );
}
