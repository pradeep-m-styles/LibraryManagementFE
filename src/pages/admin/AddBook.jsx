import { useState } from "react";
import API from "../../services/api";

export default function AddBook() {
  const [book, setBook] = useState({});

  const addBook = async () => {
    await API.post("/books", book);
    alert("Book Added");
  };

  return (
    <div className="p-6 max-w-md">
      <input className="input mb-2" placeholder="Title"
        onChange={(e)=>setBook({...book,title:e.target.value})}/>
      <input className="input mb-2" placeholder="Author"
        onChange={(e)=>setBook({...book,author:e.target.value})}/>
      <button onClick={addBook} className="btn btn-primary w-full">
        Add Book
      </button>
    </div>
  );
}