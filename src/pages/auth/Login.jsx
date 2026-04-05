import { useState } from "react";
import API from "../../services/api";

export default function Login() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/auth/login", form);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="card w-80" onSubmit={submit}>
        <input className="input mb-2" placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input className="input mb-2" type="password"
          onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
}