import React, { Component } from "react";
import Subtodo from "./Subtodo";

function Todolist(props) {
    const {getdata}=props
  return (
    <div className="flex flex-col text-black bg-gray-300 rounded-lg mr-4 p-3">
      <h1>{props.title}</h1>
      <div>
      {getdata.map(({title, _id, priority, time})=>
      {return <Subtodo key={_id} subtitle={title} time={time} clr={priority}></Subtodo> })}
      

      </div>
    </div>
  );
}

export default Todolist;
