import axios from "axios"
import getenv from "getenv"

export const 
   USERKEY:Readonly<string> = "token",
   ICON:Readonly<string> = "material-icons ",
   Month:Readonly<string[]> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


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
   img: null |string
   descript : string
}

export type Selling = {
   id : number
   product_list: string
   provit : number
   date : string
}

export type Datas<T> = {datas:T}
export type Error<T> = {errors:T}
export type LoadingCtx = [boolean, React.Dispatch<React.SetStateAction<boolean>>]

export const 
   API = axios.create({baseURL:getenv("API_BASE")}),

   getUser = () => localStorage.getItem(USERKEY),
   parseToken = () => {
      const jsonData = getUser()
      if (!jsonData) return null
      return JSON.parse(jsonData) as {expired:number, token:string}
   },

   redirect = (location:string) => document.location.href = document.location.origin + location,
   

   headerUser = () => 
      ({"user":"Breaker " + parseToken()?.token || ""})
   ,

   addInput = (func:React.Dispatch<React.SetStateAction<number>>, length:number, ...value:any[][]) => {
      value.every(i=>
         i.length === length && 
         // @ts-ignore
         !i.includes(undefined)
      ) && func(length + 1)
   },

   sendJSON = function<T extends {} | []>(url:string, data:object) {
      return API.post<T>(url, data, {headers:{"Content-Type":"application/json", ...headerUser()}})
   },

   makeArray = (length:number) =>
      Array.from(Array(length).keys())
   ,
   GET = function<Return,T extends {} = {}>(url:string, header?:T) { 
      return API.get<Datas<Return>>(url, {headers:{...headerUser(), ...header}}) 
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

export namespace ResCode {
   export const 
      BadReduest = 400,
      Unauthorized = 401,
      Ok = 200
}

export namespace Type {
   export type Refresh = React.DispatchWithoutAction
}
