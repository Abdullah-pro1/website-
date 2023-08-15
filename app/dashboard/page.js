"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import Todolist from "../Components/Todolist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCellsLarge,
  faGear,
  faRightFromBracket,
  faBox,
  faBoxesPacking,
  faBell,
  faQuestion,
  faBoxesStacked,
  faCirclePlus,
  faLocationCrosshairs,
  faToggleOn,
  faEllipsis,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import image from "../images/kaaka.jpg";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [taskdata, setTaskData] = useState([]);
  const [add, setAdd] = useState(null);
  const router = useRouter();
  const { status, data: session } = useSession();
  const [dataSet,setData] = useState([]);
  async function GetTaskData() {
    try {
      const response = await fetch("../api/gettask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user.email
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorCode = response.status;
        console.log("Error Code:", errorCode);
      } 
      else {
        const data = await response.json();
        setData(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(()=>{
    if(add)
    {
      setAdd(false);
    }
		GetTaskData()
	}, [add])

  if (typeof window === "undefined") {
    return null; // Return null on the server-side to prevent rendering
  }
  
  async function saveTaskData() {
    try {
      const response = await fetch("../api/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...taskdata,email: session?.user.email}), // Use the updated formData with the image URL
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorCode = response.status;
        console.log("Error Code:", errorCode);
      } else {
        setAdd(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      {status === "authenticated" ? (
        <>
          <div className="flex  ">
            {/* My Stack Column */}
            <div className=" justify-start w-1/6 h-screen  bg-slate-500 drop-shadow-2xl shadow-2xl shadow-black  ">
              <h5 className="font-bold m-5  text-black  hover:bg-slate-400 hover:rounded-lg pl-2">
                <FontAwesomeIcon
                  className="text-sm px-1 mr-1  bg-transparent justify-center items-center py-1 h-4 text-white"
                  icon={faBoxesStacked}
                />
                My Stack
              </h5>

              <h5 className="m-2 text-black  hover:bg-slate-400 hover:rounded-lg pl-2">
                <FontAwesomeIcon
                  className="text-lg px-2.5 py-1 justify-center items-center h-3 text-white"
                  icon={faTableCellsLarge}
                />
                Courses
              </h5>
              <h5 className="m-2 text-black hover:bg-slate-400 hover:rounded-lg pl-2">
                <FontAwesomeIcon
                  className="text-sm px-2.5 py-2 h-3 text-white"
                  icon={faBoxesPacking}
                />
                Summer coding
              </h5>

              <h5 className="m-2 text-black hover:bg-slate-400 hover:rounded-lg pl-2">
                <FontAwesomeIcon
                  className="text-lg px-2.5 -mb-2 py-2 h-4 text-white"
                  icon={faBox}
                />
                Data Science
              </h5>

              <h5 className="m-2 text-black hover:bg-slate-400 hover:rounded-lg pl-2">
                <FontAwesomeIcon
                  className="text-lg px-2.5 -mb-2  py-2 h-4 text-white"
                  icon={faGear}
                />
                Settings
              </h5>

              <div
                onClick={signOut}
                className=" mt-96 text-black font-bold  hover:bg-slate-400 hover:rounded-lg pl-2"
              >
                <FontAwesomeIcon
                  className="text-sm -mb-2 mx-2 px-2.5 py-2 h-4 text-white"
                  icon={faRightFromBracket}
                />
                Logout
              </div>
            </div>

            {/* Summer Coding Challenge Column */}
            <div className="grid-cols-1  w-full h-full overflow-auto   ">
              <div className="justify-start h-30 h-screen  bg-slate-500 border-2 border-slate-300">
                {/* Apply the background color className here */}
                <h1 className="pt-5 ml-5 text-black hover:text-slate-300">
                  {" "}
                  {session?.user?.name}
                </h1>
                <Image
                  height={40}
                  width={40}
                  className=" float-right mr-5 -mt-6  rounded-full"
                  src={session?.user?.image ? session?.user?.image : image}
                  alt="grid icon "
                ></Image>
                <FontAwesomeIcon
                  className="text-sm px-2.5 float-right -mt-4 h-5  mr-4 text-white"
                  icon={faQuestion}
                />
                <FontAwesomeIcon
                  className="text-sm px-2.5 float-right -mt-4 h-5  mr-5 text-white"
                  icon={faBell}
                />
                <div>
                  <FontAwesomeIcon
                    className="text-sm  float-right -mt-2  h-5  mr-8 text-white"
                    icon={faGear}
                  />
                  <FontAwesomeIcon
                    className="text-sm px-2 float-right -mt-2 h-5  mr-8 ml-3  text-white"
                    icon={faBell}
                  />
                  <input
                    type="search"
                    placeholder="   Search"
                    className=" h-8 w-52 rounded-lg -mt-3  float-right"
                  ></input>
                  <h1 className="hover:text-sky-400 text-black font-semibold mt-9 ml-5 underline">
                    <FontAwesomeIcon
                      className="text-lg px-2.5  h-5 text-white"
                      icon={faClipboardList}
                    />
                    ToDo
                  </h1>

                  <div className="flex justify-between mt-3 h-screen bg-gray-500 ">
                    {/* Div for first component */}
                    <div className="flex flex-col-2 bg-slate-500  w-full   rounded-lg pl-8 pt-3 ">
                      <div className="font-bold w-1/2 rounded-lg space-y-10 ps-5 pt-5 flex flex-col drop-shadow-2xl shadow-2xl shadow-black h-screen bg-gray-400 w-{150}">
                        <Todolist
                          title={"ToDolist"}
                          getdata={dataSet}
                        ></Todolist>
                      </div>

                      <h1 className=" w-1/2 rounded-lg ml-5 drop-shadow-2xl shadow-2xl shadow-black h-screen bg-gray-400  ">
                        <div>
                          <input
                            type=" textbox "
                            placeholder="        Add Description"
                            onChange={(e) => {
                              setTaskData({
                                ...taskdata,
                                title: e.target.value,
                              });
                            }}
                            className="h-40 w-80 m-5 ml-7 rounded-lg bg-gray-300 shadow-md border-2 text-black px-4"
                          ></input>
                        </div>
                        <div className="flex ">
                          <div className=" font-bold text-black mt-5 ml-5 text-xl flex">
                            Priority
                          </div>
                          <button
                            onClick={() => {
                              setTaskData({ ...taskdata, priority: "low" });
                            }}
                            className="text-green-600 border-green-500 font-bold border-4 rounded-lg w-12 h-10  p-2 mt-2 ml-4"
                          >
                            low
                          </button>
                          <button
                            onClick={() => {
                              setTaskData({ ...taskdata, priority: "medium" });
                            }}
                            className="text-yellow-400 border-yellow-400 font-bold border-2 rounded-lg w-24 h-10  p-2 mt-2 ml-4"
                          >
                            Medium
                          </button>
                          <button
                            onClick={() => {
                              setTaskData({ ...taskdata, priority: "high" });
                            }}
                            className="text-red-400 border-red-400 font-bold border-2 rounded-lg w-16 h-10  p-2 mt-2 ml-4"
                          >
                            high
                          </button>
                        </div>

                        <div className="mt-5 flex  text-xl ml-5">
                          <h1 className="font-bold text-black">Repeat every</h1>
                          <button className="border-2  rounded-lg w-10 ml-4 text-slate-200">
                            2
                          </button>
                          <button className="border-2  rounded-lg w-20 ml-4 text-slate-200">
                            Weeks
                          </button>
                        </div>

                        <div className="mt-5 flex  text-xl ml-5">
                          <h1 className="font-bold text-black">
                            <FontAwesomeIcon
                              className="    float-right  h-5  ml-4 mt-1"
                              icon={faToggleOn}
                            />
                            Make habits
                          </h1>
                        </div>

                        <div className="mt-5 flex  text-xl ml-5 text-center items-center">
                          <h1 className="font-bold text-black">
                            Time
                          </h1>
                          <input
                            type="textbox"
                            onChange={(e) => {
                              setTaskData({ ...taskdata, time: e.target.value });
                            }}
                            placeholder="Add time "
                            className="rounded-lg p-2 w-auto ml-5 text-black "
                          ></input>
                        </div>

                        <div className="mt-5 flex  text-xl ml-5 text-center items-center">
                        <h1 className="font-bold text-black">
                            Tag
                          </h1>
                          <input
                            type="textbox"
                            onChange={(e) => {
                              setTaskData({ ...taskdata, tag: e.target.value });
                            }}
                            placeholder="Add tags like work, Exercise etc "
                            className=" rounded-lg p-2 w-80 ml-2 text-black "
                          ></input>
                        </div>

                        <div>
                          <button onClick={()=>{saveTaskData()}} className="bg-slate-300 text-black  float-right rounded-lg p-3 mt-5  mr-3 font-bold">
                            {" "}
                            Save Task
                          </button>
                        </div>
                      </h1>
                    </div>

                    {/* Div for Quote */}

                    <div className=" bg-slate-500">
                      <div className="flex flex-col bg-gray-400 w-80 rounded-lg mt-3 mr-4 drop-shadow-2xl shadow-2xl shadow-black ml-5 p-3 h-screen">
                        <h1 className="font-bold flex text-black  justify-center">
                          Quote
                        </h1>

                        <div className="mt-2 bg-slate-200 m-2 p-3 rounded-lg">
                          <h1 className="font-bold">
                            <FontAwesomeIcon
                              className="    float-right  h-5  ml-4 mt-1"
                              icon={faEllipsis}
                            />
                          </h1>
                          <p className="mt-5 text-slate-800">
                            {" "}
                            We have three roles on earth: to learn, to love, to
                            eat. When we stop learning, we start stegnate and
                            died. When we stop loving we lose our sense of
                            purose and become self-centered. When we limit our
                            things, we deny the benefits of our Jim cathcart,
                            The acorn principle alent
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid-cols-2 bg-gray-500 border-2"></div>
        </>
      ) : (
        router.push("/login")
      )}
    </>
  );
}
