import { createContext, useEffect, useLayoutEffect, useReducer, useState } from "react"
import { redirect } from "react-router-dom"
import { API, User } from "../init"

export const UserContext = createContext<User | null>(null)

export default function (props:{children : React.ReactElement | null}) {
   const [user, setU] = useState<null|User>(null)

   useEffect(()=>{
      const location = /login|register/.test(window.location.pathname)
      API.get('/auth/user').then((res)=>{
         if (location) {
            redirect("/")
         }
         setU(res.data)
      }).catch(()=>{
         console.log("jalan")
            redirect("/login")
         
      })
   },[user])
   return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
}