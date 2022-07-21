import React, { useState } from "react";
import model from "../assets/model.jpg";
import { data } from "../dataGlasses";

const MainPage = () => {
   const [currentGlass, setCurrentGlass] = useState(null);
   const [prevGlass, setPrevGlass] = useState(currentGlass);

   return (
      <div className="flex flex-col justify-center items-center">
         <div className="flex p-5 gap-5">
            <div className="h-auto w-64 m-7 mx-[5rem] shadow-xl relative">
               <img src={model} alt="model" className="object-cover" />
               {currentGlass && (
                  <div>
                     <img
                        src={require(`./../assets/${currentGlass.imageName}`)}
                        alt=""
                        className="absolute top-[72px] left-[53px] opacity-60 w-[150px]"
                     />

                     <div className="absolute bottom-0 left-0 w-full p-3 bg-zinc-100/[.4]">
                        <h1 className="text-lg font-semibold mb-2 text-orange-300">
                           {currentGlass.name}
                        </h1>
                        <p className="text-gray-700">{currentGlass.desc}</p>
                     </div>
                  </div>
               )}
            </div>
            <div className="h-auto w-64 m-7 mx-[5rem] shadow-xl relative">
               <img src={model} alt="model" className="object-cover" />
               {prevGlass && (
                  <div>
                     <img
                        src={require(`./../assets/${prevGlass.imageName}`)}
                        alt=""
                        className="absolute top-[72px] left-[53px] opacity-60 w-[150px]"
                     />

                     <div className="absolute bottom-0 left-0 w-full p-3 bg-zinc-100/[.4]">
                        <h1 className="text-lg font-semibold mb-2 text-orange-300">
                           {currentGlass.name}
                        </h1>
                        <p className="text-gray-700">{currentGlass.desc}</p>
                     </div>
                  </div>
               )}
            </div>
         </div>

         <div className="w-[500px] max-w-[900px] bg-white shadow-lg p-3">
            {data.map((glass) => (
               <button
                  key={glass.id}
                  className="p-3 h-8 w-20 hover:bg-red-100 border-slate-300 border-solid border m-1 inline-flex justify-center items-center"
                  onClick={() => {
                     setPrevGlass(currentGlass);
                     setCurrentGlass(glass);
                  }}
               >
                  <img
                     src={require(`./../assets/${glass.imageName}`)}
                     alt={glass.name}
                  />
               </button>
            ))}
         </div>
      </div>
   );
};

export default MainPage;
