import React, { Component } from "react";
import Subtodo from "./Subtodo";

function Todolist(props) {
    const {getdata}=props
  return (
    <div class="flex flex-col text-black bg-gray-300 rounded-lg mr-4 p-3">
      <h1>{props.title}</h1>
      <div>
      {getdata.map(({subtitle, id, clr, time})=>
      {return <Subtodo key={id} subtitle={subtitle} time={time} clr={clr}></Subtodo> })}
      

      </div>
    </div>
  );
}

export default Todolist;
