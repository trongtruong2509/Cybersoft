import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, edit } from "../store/userSlice";
import { update } from "../store/currentUserSlice";
import { updateSearch } from "../store/searchSlice";
import { MdSearch } from "react-icons/md";

const UserPannel = () => {
   const users = useSelector((state) => state.user.value);
   const search = useSelector((state) => state.search.value);
   const currentUser = useSelector((state) => state.currentUser.value);
   const dispatch = useDispatch();

   const [id, setId] = useState(null);
   const [name, setName] = useState("");
   const [phone, setPhone] = useState("");
   const [email, setEmail] = useState("");
   const [buttonName, setButtonName] = useState("Add User");

   useEffect(() => {
      if (currentUser) {
         setButtonName("Edit User");
         setId(currentUser.id);
         setName(currentUser.name);
         setPhone(currentUser.phone);
         setEmail(currentUser.email);
      } else {
         setButtonName("Add User");

         setId(calcNextId());
         setName("");
         setPhone("");
         setEmail("");
      }
   }, [currentUser]);

   const validateUser = () => {
      const nameRegex = /^[a-zA-Z\- ]+$/g;
      const phoneRegex =
         /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\. ]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      const mailRegex =
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      let isValid = true;
      let alertMsg = "";

      if (name.trim().length === 0) {
         alertMsg += "User Name is empty. Please fill User Full Name \n";
         isValid = false;
      } else if (!name.trim().match(nameRegex)) {
         alertMsg +=
            "User Name is incorrect format. Please check User Name again \n";
         isValid = false;
      }

      if (phone.trim().length === 0) {
         alertMsg += "Phone Number is empty. Please fill User Phone Number \n";
         isValid = false;
      } else if (!phone.trim().match(phoneRegex)) {
         alertMsg +=
            "Phone Number is incorrect format. Please check Phone Number again \n";
         isValid = false;
      }

      if (email.trim().length === 0) {
         alertMsg += "Email is empty. Please fill User Email";
         isValid = false;
      } else if (!email.trim().toLowerCase().match(mailRegex)) {
         alertMsg +=
            "User Email is incorrect format. Please check User Email again";
         isValid = false;
      }

      if (!isValid) {
         alert(alertMsg);
      }

      return isValid;
   };

   const calcNextId = () => {
      let nextId = 0;
      if (users) {
         nextId = Math.max(...users.map((u) => u.id)) + 1;
      }

      return nextId;
   };

   const handleUser = () => {
      if (!validateUser()) {
         return;
      }

      if (currentUser) {
         dispatch(edit({ id, name, phone, email }));
         dispatch(update(null));
      } else {
         //generate id
         const newId = calcNextId();
         setId(newId);

         dispatch(add({ id: newId, name, phone, email }));
         dispatch(update(null));
      }
   };

   return (
      <div className="block text-left text-slate-700">
         <div className="w-full bg-slate-700 text-2xl py-4 text-white flex justify-between items-center px-5">
            <div>User Information</div>
            <div className="relative w-1/2">
               <input
                  type="text"
                  value={search}
                  placeholder="Search with user name"
                  className="bg-slate-100 px-3 py-1 rounded-lg text-base w-full outline-none text-slate-700"
                  onChange={(e) => dispatch(updateSearch(e.target.value))}
               />
               <MdSearch className="absolute top-2 right-2 text-slate-700 " />
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-8 py-3">
            <div className="flex flex-col justify-center items-start">
               <label className="py-1"> User Id </label>
               <input
                  type="text"
                  value={id}
                  readOnly
                  className="w-full rounded-md border border-gray-400 p-2 outline-none"
                  placeholder="User Id"
                  onChange={(e) => setId(e.target.value)}
               />
            </div>
            <div className="flex flex-col justify-center items-start">
               <label className="py-1">Full Name </label>
               <input
                  type="text"
                  value={name}
                  className="w-full rounded-md border border-gray-400 p-2 outline-none"
                  placeholder="User Full Name"
                  onChange={(e) => setName(e.target.value)}
               />
            </div>
            <div className="flex flex-col justify-center items-start">
               <label className="py-1">Phone Number </label>
               <input
                  type="text"
                  value={phone}
                  className="w-full rounded-md border border-gray-400 p-2 outline-none"
                  placeholder="User Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
               />
            </div>
            <div className="flex flex-col justify-center items-start">
               <label className="py-1">Email </label>
               <input
                  type="text"
                  value={email}
                  className="w-full rounded-md border border-gray-400 p-2 outline-none"
                  placeholder="User Email"
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
         </div>

         <button
            className="py-3 px-5 text-white bg-amber-500 rounded-2xl my-3"
            onClick={handleUser}
         >
            {buttonName}
         </button>
         <button
            className={`py-3 px-5 ml-6 text-white  rounded-2xl my-3 ${
               !!currentUser ? "bg-slate-500" : "bg-slate-300"
            }`}
            onClick={() => {
               dispatch(update(null));
            }}
         >
            Cancel Edit
         </button>
      </div>
   );
};

export default UserPannel;
