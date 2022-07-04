import {LazyExoticComponent, FC, ComponentType} from "react"
interface RouteType{
   component?: LazyExoticComponent<FC | ComponentType | any>;
   path:string;
   isProtected?: boolean;
   name?:string;
   exact?: boolean;
   redict?:string;
   key?:string,
   routes?:RouteType[];
   meta?:{
       [key:string]:any
   },
   [props:string]:any

}

export default RouteType