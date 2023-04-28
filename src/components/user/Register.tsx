import {  useState } from "react";
import * as init from "../init";
import { Link, redirect } from "react-router-dom";
import Input from "./Input";
import PError from "../mini/PError";

type FormReg =  Partial<Pick<init.User, "email" | "password"> & {password2:string}>
type Err = FormReg & {
  err?: string;
};

export default function () {
  const [form, setFrom] = useState<FormReg>({})
  const [err, setErr] = useState<Err>({})
  
  const register = () => {
    init.JSON<Err>("/register", form).then(()=>{
      redirect("/login")
    }).catch(({response})=>{
      setErr(response.data as Err)
      console.log(response.data)
      console.log(err);
      
    })
  }
  return <>
		<div className={`${init.HelperCss.flexC} flex-col bg-gray-200 h-screen`}>
			<h1 className="text-medium text-lg mb-6">Sign up</h1>
			<div className="flex flex-col bg-white px-7 py-4 rounded-lg">
				<Input 
					type="text" 
					label="Email :" 
					err={err.email}
					onChange={(email)=>setFrom({...form, email})}></Input>
        {err.email && <PError msg={err.email}/>}

				<Input
					type="password" 
					label="Password :" 
					err={err.password}
					onChange={(password)=>setFrom({...form, password})}></Input>
				{err.password && <PError msg={err.password}/>}
        
				<Input
					type="password" 
					label="Repert Password :" 
					err={err.password}
					onChange={(password2)=>setFrom({...form, password2})}></Input>
				{err.password && <PError msg={err.password}/>}

				<div className="mt-3">
					<button onClick={register} className="rounded-md bg-blue-500 w-full text-white text-lg py-1">Register</button>
					<p className="font-light m-2 text-center">Or</p>
					<p className="text-center text-lg">
						Click here to
						<Link 
							to="/login" 
							className="underline text-blue-700 ml-1 font-medium"
							>{"< Go back"}</Link>
					</p>
				</div>
				
			</div>
		</div>
	</>
}
