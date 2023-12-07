import { FormEvent, useContext, useState } from "react"
import { LoadingContext } from "../App"

export default function (props:{
   onClick:(event: React.FormEvent<HTMLFormElement>) => void,
   childrenChecking?:boolean, 
   children:React.ReactNode}) {
      const [loading, setLoading]= useState(false)
      return <>
         <form 
            onSubmit={(e)=> {
               e.preventDefault()
               setLoading(true)
               props.onClick(e)
               setTimeout(()=>setLoading(false),2000)
            }}
            className="h-[95vh] md:h-screen"
            autoComplete="off"
            >
            <div className="h-[90%] overflow-auto bg-[#e9e9e9] md:m-3 md:my-4 lg:m-3">
               {props.children}   
            </div>
            <div className="h-[10%] grid place-items-center bg-[rgb(222 222 222)]">
               <button 
                  className="py-2 px-3 rounded-md bg-green-600 text-white w-4/5 font-semibold text-xl" 
                  disabled={props.childrenChecking}>
                  {loading ? 
                     <span>loading</span> : 
                     <span>Save</span>
                  }
               </button>
            </div>
         </form>
      </> 
}