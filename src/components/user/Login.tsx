import { useContext, useState } from "react";
import * as init from "../init";
import { Link, redirect } from "react-router-dom";

type Form =  Partial<init.User>
type Err = {
  err?: string;
};

export default function () {
  const [form, setFrom] = useState<Partial<init.User>>({})
  const [err, setErr] = useState<string|null>(null)
  const input = "bg-white px-4 py-2 text-lg border border-black"

  const login = async() => {
    init.JSON("/login", form).then(()=>{
      redirect("/")
    }).catch(({response})=>{
      setErr(response.data)
    })
  }
  return <div className="grid items-center">
    <div className="px-4 py-2 w-2/3">
      <h1 className="">Login</h1> 
      <input type="text" className={input} onChange={(e) => setFrom({...form, email:e.target.value})} />
      <input type="text" className={input} onChange={(e) => setFrom({...form, password:e.target.value})} />
      <div className="flex flex-col">
        <Link to={"/register"} className="underline text-sky-600"/>
        <button type="submit" className="" onClick={login}>Login</button>
      </div>
    </div>  
  </div> 
}
