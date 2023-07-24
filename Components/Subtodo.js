import React, { Component } from "react";

function Subtodo(props) {
  return (
    <div  class="bg-slate-200 px-3">
    <div class="grid grid-rows-1 grid-cols-10 space-x-3 space-y-5 text-black  items-baseline ">
      <input type="checkbox" class="span col-span-1"></input>
      
      <div class="col-span-8">
        <h1>{props.subtitle}</h1>
        <h1 class=" font-normal text-gray-400">{props.time}</h1>
      </div>
      <div class=" flex float-right items-end col-span-1">
      {
        props.clr=="yellow"?
      <div class={`h-4 w-4  rounded-full  bg-yellow-300`}></div>:
      props.clr=="red"?
      <div class={`h-4 w-4 rounded-full  bg-red-600   `}></div>:
      
      <div class={`h-4 w-4 rounded-full  bg-green-300`}></div>

      }
      </div>
    </div>

   
      </div>
  );
}
export default Subtodo;