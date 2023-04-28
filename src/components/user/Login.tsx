import { useState } from "react";
import * as init from "../init";
import {  Link, redirect } from "react-router-dom";
import Input from "./Input";
import PError from "../mini/PError";

export default function () {
	const [form, setFrom] = useState<Partial<init.User>>({})
	const [err, setErr] = useState<string|undefined>()

	const login = () => {
		init.JSON("/login", form).then(()=>{
			redirect("/")
		}).catch(({response})=>{
			setErr(response.data.err)
		})
	}
  	return <>
		<div className={`${init.HelperCss.flexC} flex-col bg-gray-200 h-screen`}>
			<h1 className="text-medium text-lg mb-6">Sign in</h1>
			<div className="flex flex-col bg-white px-7 py-4 rounded-lg">
				<Input 
					type="text" 
					label="Email :" 
					err={err}
					onChange={(email)=>setFrom({...form, email})}></Input>
				<Input
					type="password" 
					label="Password :" 
					err={err}
					onChange={(password)=>setFrom({...form, password})}></Input>
				{err && <PError msg={err}/>}
				<div className="mt-3">
					<button onClick={login} className="rounded-md bg-blue-500 w-full text-white text-lg py-1">Login</button>
					<p className="font-light m-2 text-center">Or</p>
					<p className="text-center text-lg">
						New here
						<Link 
							to="/register" 
							className="underline text-blue-700 ml-1 font-medium"
							>Sign up</Link>
					</p>
				</div>
				
			</div>
		</div>
	</>
}
