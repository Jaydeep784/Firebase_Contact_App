import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from "./config/firebase";
import Showlist from "./Components/Showlist";
import Addcontact from "./Components/Addcontact";
import useDisclosure from "./hooks/useDisclosure";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nocontact from "./Components/Nocontact";
import Showcontact from "./Components/Showcontact";

function App() {
  const [contacts, setContacts] = useState([]);

  const [istoggle, setToggle] = useState(false);

  const {isOpen, onClose, modelOpen} = useDisclosure();

  useEffect(() => {

    const getContacts = async () => {
      try {
        const contactsCollection = collection(db, "contacts");

        onSnapshot(contactsCollection, (snapshot) => {

          const contactsList = snapshot.docs.map((contact) => {
            return {
              id: contact.id,
              ...contact.data()
            }
          })
          setContacts(contactsList);
          return contactsList;

        })

      } catch (error) {
        
      }
    }
    getContacts();

  }, [])

  const filterData = (ev) => {
    const currValue = ev.target.value;
    
    const contactsCollection = collection(db, "contacts");

      onSnapshot(contactsCollection, (snapshot) => {
        const contactsList = snapshot.docs.map((contact) => {
          return {
            id: contact.id,
            ...contact.data()
          }
        })
        const filter_data = contactsList.filter((doc) => doc.name.toLowerCase().includes(currValue.toLowerCase()))

          setContacts(filter_data);
          return filter_data;
      })
  }

  return (
    <>

    <div className="max-w-[370px] m-auto px-2">
      <Navbar />
      <div className="flex gap-2">
        <div className="flex flex-grow relative items-center">
          <FiSearch className="ml-2 absolute text-xl text-white cursor-pointer" />
          <input
            onChange={filterData}
            className="pl-9 text-white my-2 bg-transparent border border-white rounded-md flex-grow h-10"
            type="text"
            placeholder="Search Contacts"
          />
        </div>
        <AiFillPlusCircle onClick={modelOpen} className="mt-1 text-5xl cursor-pointer text-white" />
      </div>
      {
        contacts.length === 0 ? <Nocontact /> :
        contacts.map((contact) => (
          <Showlist key={contact.id} contact={contact} />
        ))
      }
      
      <Addcontact isOpen={isOpen} onClose={onClose} />
      <ToastContainer />
    </div>
    </>
  );
}

export default App;
