import React, { useEffect, useReducer, useState } from "react"
import { API, JSON } from "../init/func"

type FileRead = string|null
type FileProps = {name:string,size:number}

function reduce<T>(state: T[],e : React.ChangeEvent<HTMLInputElement>) {
   state[parseInt(e.target.name)] = e.target.value as T
   return state
}

function reduceFile(state: File[] ,e: React.ChangeEvent<HTMLInputElement>) {
   const newState = e.target.files![0]
   state[parseInt(e.target.name)] = newState
   return state
}

function isActive(state: any) {
   return !state ? "border-red" : ""
}


export default function () {
   const 
      [name, setName] = useReducer(reduce<string>,[]),
      [qty, setQty] = useReducer(reduce<number>,[]),
      [price, setPrice] = useReducer(reduce<number>,[]),
      [file, setFile] = useReducer(reduceFile,[]),

      // capture index where value is error
      [err, setErr] = useState<{[key:string]:number[]}>({}),

      // style
      inputS = "border-r-2 border-white p-1 bg-[#efefef]"

   function submit() {
      JSON("/product/add", {img: file}).then((res)=>{
         console.log(res.data)
      })
   }

   useEffect(() => {
      const check = (arr:any[],name:string) => {     
         err[name] = arr.reduce((prev,i,k)=>{
            if (!i) return [...prev, k] 
         },[])
         setErr(err)
      }
      check(name,"name")
      check(qty, "qty")
      check(price, "price")
   }, [name,qty,price])
   
   return <>
      <div className="m-3">
         <div className="flex border w-[150vw]">
            <p className={`w-[10%] ${inputS} text-center bg-white text-black`}>N</p>
            <p className={`w-[20%] ${inputS} text-center bg-black text-white`}>Name</p>
            <p className={`w-[15%] ${inputS} text-center bg-black text-white`}>Quantity</p>
            <p className={`w-[15%] ${inputS} text-center bg-black text-white`}>Prices</p>  
            <p className={`w-[30%] ${inputS} text-center bg-black text-white border-0`}>Description</p>
         </div>   

         <div className="max-h-[65vh]">
            {Array.from(Array(10).keys()).map(i=>   
               <div className="flex border-l border-r w-[150vw]">
                  <p className="text-center text-medium bg-black text-white w-[10%]">{i}</p>
                  <input type="text" name={`${i}`} className={`w-[20%] text-left ${inputS} ${isActive(err?.["name"]?.[i])}`} onChange={e=>setName(e)} />
                  <input type="number" name={`${i}`} className={`w-[15%] text-center ${inputS} ${isActive(err?.["qty"]?.[i])}`} onChange={e=>setQty(e)} />
                  <input type="number" name={`${i}`} className={`w-[15%] text-center ${inputS} ${isActive(err?.["price"]?.[i])}`} onChange={e=>setPrice(e)}/>
                  <input type="text" name={`${i}`} className={`w-[30%] text-left ${inputS} ${isActive(err?.["file"]?.[i])} border-0`} onChange={e=>setFile(e)} />
               </div>
            )}
         </div>
      </div>
   </> 
}