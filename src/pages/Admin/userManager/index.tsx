import React,{useState} from "react";
import { observer } from 'mobx-react';
import useStores from '../../../utils/useStores';
interface Person {
    name: string;
    run(): void;
    eat(): void;
  }
  const p: Person = {
    name: "why",
    run() {
      console.log("running");
    },
    eat() {
      console.log("eating");
    },
    
  };
const UserManager :React.FC = ()=>{
   
    return <div>
        UserManager
    </div>
}
export default observer(UserManager)