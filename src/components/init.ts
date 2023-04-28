import axios from "axios"


export type User = {
   id : number
   email : string
   password : string
}

export type Product = {
   id : number
   name : string
   qty : number
   price : number
   descript : string
}

export type Selling = {
   id : number
   id_product : number
   qty : number
   date : Date
}

export const API = axios.create({baseURL:"http://localhost:8080"})

export function JSON<T>(url:string, data:object) {
  return API.post<T>(url, data, {headers:{"Content-Type":"application/json"}})
}

export namespace Color {
   export const 
      Link = "text-blue-700"
}

export namespace HelperCss {
   export const 
      gridC = "grid place-items-center",
      flexC = "flex justify-center items-center"

}

