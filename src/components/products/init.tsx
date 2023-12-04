import { Product } from "../init/func"

export namespace Func {
   export const 
      productSorter = (target:string, prodList: Product[]) => {
         if (!target) return prodList

         const
            lowerCaseProd = prodList.map(i=>({...i, name: i.name.toLowerCase()})),
            mostCloses = lowerCaseProd.
               filter(i=>i.name.slice(0, target.length) === target).
               sort((a,b)=>{
                  const 
                     lengthA = a.name.length,
                     lengthB = b.name.length
                  return lengthA > lengthB ? 1 : lengthA < lengthB ? -1 : 0  
               }),
            includeLetter = lowerCaseProd.
               filter(i=>!mostCloses.includes(i)). // clear mostCloses value
               filter(i=>
                  i.name
                     .split("")
                     .every(j=>j in target.split("")) 
               ),
            otherValue = lowerCaseProd
               .filter(i=>
                  !mostCloses.includes(i) && 
                  !includeLetter.includes(i)
               )
            
         return mostCloses.concat(includeLetter, otherValue)
      },
      makeIdPopup = (index:number) => `${Constants.PRODUCT_POPUP}[${index}]`,
      
      changeColorNameInput = (target:string, background:string) => 
         document.getElementById("input-"+target)!.style.background = background,


      updateProductPopup =  (ITarget:number, visibility : "hidden" | "visible") => 
         document.getElementById(makeIdPopup(ITarget))!.style.visibility = visibility,
      
      getKeyElm = (idClicked:[string,string],i:1|0) =>parseInt(idClicked[i].replace(/\D/g, "")),

      formScript = (idClicked:[string,string]) => {
         if (!!idClicked[0]) {
            Func.updateProductPopup(Func.getKeyElm(idClicked, 0), "hidden")
            Func.changeColorNameInput(idClicked[0],"white")
         }
         if (!!idClicked[1]) {
            if (/name\[\d\]/.test(idClicked[1])) Func.updateProductPopup(Func.getKeyElm(idClicked, 1), "visible")
            Func.changeColorNameInput(idClicked[1],"#ededed")
         }
      }
      
}



export namespace MiniComp {
   export const  
      ProductPopup = (props:{product:Product[], index:number, name:string[], onClick:(product:Product)=>void}) => {
         return <div 
            className={`absolute w-full flex flex-col ${props.product.length === 0 ? "h-fit" : "h-32"} z-[1] bg-white rounded-bl-sm rounded-br-sm overflow-x-auto invisible px-2 py-1 shadow-lg`}
            id={Func.makeIdPopup(props.index)}>
            
            {props.product.length === 0 ? 
               <p className="text-center font-semibold text-lg">Empty</p> :
               Func.productSorter(props.name[props.index], props.product).map(prod=>
                  <button 
                     className="hover:bg-black text-left text-xl border-b mb-2"
                     onClick={()=>props.onClick(prod)}>{prod.name}</button>
               )
            }
         </div>
    
      }
}

export namespace Types {
   export type IdClicked = [number | null, number | null]
}

export namespace Constants  {
   export const 
      PRODUCT_POPUP = "product_popup",
      INPUT_BORDER = "border-r-2 border-b-2 border-black",
      BORDER_TOP = "md:border-t-2 border-t-white",
      BORDER_LEFT = "md:border-l-2 border-l-white",
      BORDER_RIGTH = "md:border-r-2 border-r-white",
      BORDER_BOTTOM = "md:border-b-2 border-b-white",
      Vs_INPUT = "w-[10%]",
      M_INPUT = "w-[15%]",
      L_INPUT = "w-[20%]",
      PADDING_INPUT = "px-2 py-1"
}
