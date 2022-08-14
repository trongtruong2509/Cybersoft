import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/userSlice";
import { update } from "../store/currentUserSlice";
import { MdDelete } from "react-icons/md";

const Users = () => {
   const users = useSelector((state) => state.user.value);
   const currentUser = useSelector((state) => state.currentUser.value);
   const dispatch = useDispatch();

   return (
      <div className="block text-left text-slate-700 mt-4 ">
         <div className="w-full bg-slate-700 text-xl py-3 text-white flex justify-start px-3 items-center">
            <div className="w-1/12">Id</div>
            <div className="w-5/12">Name</div>
            <div className="w-1/6">Phone</div>
            <div className="w-1/4">Email</div>
         </div>
         <div>
            {users &&
               users.map((user, index) => (
                  <div
                     key={index}
                     className={`relative w-full z-30 hover:bg-gray-100
                     ${currentUser?.id === user.id ? "bg-blue-200" : ""}`}
                  >
                     <div
                        className="flex p-3 border-b border-b-slate-300 cursor-pointer"
                        onClick={() => dispatch(update(user))}
                     >
                        <div className="w-1/12">{user.id}</div>
                        <div className="w-5/12">{user.name}</div>
                        <div className="w-1/6">{user.phone}</div>
                        <div className="w-1/4">{user.email}</div>
                     </div>
                     <button
                        className="w-8 h-8 absolute top-2 right-3 flex justify-center items-center bg-slate-300 hover:bg-slate-700 text-slate-500 hover:text-white rounded-full z-100"
                        onClick={() => {
                           dispatch(remove(user.id));
                           dispatch(update(null));
                        }}
                     >
                        <MdDelete className=" rounded-full w-6 h-5" />
                     </button>
                  </div>
               ))}
         </div>
      </div>
   );
};

export default Users;
