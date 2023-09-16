import React, { useState } from "react";
import '../App.css'
import { IoMdContact } from "react-icons/io";
import {AiOutlineEdit} from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import useDisclosure from "../hooks/useDisclosure";
import Addcontact from "./Addcontact";
import { toast } from "react-toastify";

const Showlist = ({contact}) => {

  const [isUpdate, setIsUpdate] = useState(true);

  const {isOpen, onClose, modelOpen} = useDisclosure();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id))
      toast("Contact deleted succesfully!")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex items-center w-[360px] h-[64px] border rounded-lg bg-yellow mt-4">
      <IoMdContact className="text-5xl" />
      
        <div className="flex-column inter ml-2">
          <h3 className="font-medium">{contact.name}</h3>
          <p className="text-sm">{contact.email}</p>
        </div>
      <div className="flex flex-grow gap-1 justify-end items-center mr-1">
        <AiOutlineEdit onClick={modelOpen} className="text-3xl cursor-pointer"/>
        <BsTrash onClick={() => deleteContact(contact.id)} className="text-3xl cursor-pointer"/>
      </div>
    </div>
    <Addcontact contact={contact} isUpdate={isUpdate} isOpen={isOpen} onClose={onClose}/>
    </>
    
  );
};

export default Showlist;
