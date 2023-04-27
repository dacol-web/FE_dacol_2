import { useContext, useState } from "react";
import * as init from "../init";
import { Link, redirect } from "react-router-dom";

type Form =  Partial<init.User & {password2:string}>
type Err = Form & {
  err?: string;
};

export default function () {
  const [form, setFrom] = useState<Form>({})
  const [err, setErr] = useState<Err>({})
  const input = "bg-white px-4 py-2 text-lg"

  const register = () => {
    init.JSON<Err>("/register", form).then(()=>{
      redirect("/login")
    }).catch(({response})=>{
      setErr(response.data)
    })
  }
  return <div className="grid items-center">
    <form onSubmit={register} className="px-4 py-2 w-2/3">
      <h1 className="">Register</h1>
      <input type="text" className={input} onChange={(e) => setFrom({...form, email:e.target.value})} />
      <input type="text" className={input} onChange={(e) => setFrom({...form, password:e.target.value})} />
      <input type="text" className={input} onChange={(e) => setFrom({...form, password2:e.target.value})} />
      <div className="flex flex-col">
        <Link to={"/register"} className="underline text-sky-600"/>
        <button type="submit" className="">Login</button>
      </div>
    </form>  
  </div> 
}
