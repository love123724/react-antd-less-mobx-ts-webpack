import React,{useState} from "react";
import { observer } from 'mobx-react';
import useStores from '../../utils/useStores';
const Bill :React.FC = ()=>{
    const commonStore = useStores('commonStore');
    return <div>
        Bill
    </div>
}
export default observer(Bill)