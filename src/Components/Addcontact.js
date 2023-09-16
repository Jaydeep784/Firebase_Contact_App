import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { db } from "../config/firebase";
import { addDoc,doc,  collection, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import '../App.css'

const Addcontact = ({ isOpen, onClose, isUpdate, contact}) => {

  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts",id);
      await updateDoc(contactRef, contact);
    } catch (error) {
      console.log(error);
    }
  };

  const [newData, setNewData] = useState([
    {
      name: "",
      email: "",
    },
  ]);

  useEffect(() => {
    if(isUpdate && contact){
        setNewData({
            name: contact.name || "",
            email: contact.email || "",
        })
    }
  }, [isUpdate, contact])

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.value)
    if(newData.name === "" || newData.email === ""){
        alert("Fill all the fields");
        onClose();
        return;
    }

    isUpdate ? updateContact({ name: newData.name, email: newData.email }, contact.id) : addContact({ name: newData.name, email: newData.email })
    isUpdate ?  toast("Contact Updated   Successfully") : toast("Contact Added Successfully")
    setNewData({name:"", email:""})
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="flex flex-col modelTop rounded-lg mx-auto w-[360px] h-[280px] bg-white">
          <div className="flex flex-grow justify-end pt-2 pr-2">
            <AiOutlineClose
              onClick={onClose}
              className="text-2xl hover:text-red transition-0.3s ease-in cursor-pointer"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col ml-5 mb-5">
              <label className="">Name</label>
              <input
                name="name"
                className="pl-2 w-[316px] h-[47px] border border-black rounded-md mt-2"
                type="text"
                value={newData.name}
                onChange={handleChange}
              />
              <label className="mt-4">Email</label>
              <input
                name="email"
                className="pl-2 w-[316px] h-[47px] border border-black rounded-md mt-2"
                type="email"
                value={newData.email}
                onChange={handleChange}
              />

              <button className="self-end mr-5 mt-5 rounded-md w-[120px] h-[40px] border border-black rounded-mg bg-yellow">
                {isUpdate ? "Update" : "Add"} Contact
              </button>
            </div>
          </form>
          {/* <div className="backdrop-blur top-0 absolute z-50 w-screen h-screen" /> */}
        </div>
      )}
    </>
  );
};

export default Addcontact;
