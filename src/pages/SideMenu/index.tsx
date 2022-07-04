import React,{useState,useEffect, useMemo} from "react";
import { observer } from 'mobx-react';
import useStores from '../../utils/useStores';
import { Layout, Menu } from 'antd';
import { Link, withRouter, useLocation  } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import routerConfig from "@/router/router.config"
import "./style.less";
import type { MenuProps } from 'antd';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
const {  Sider } = Layout;
const { SubMenu } = Menu;
type MenuItem = Required<MenuProps>['items'][number];
const SiderComponent :React.FC = (props)=>{
    const globalStore =  useStores("globalStore");
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys,setOpenKeys] = useState([]);
    const onOpenChange = (keys:any) => {
      setOpenKeys(keys);
    };
    useEffect(() => {
      const list = pathname.split('/').splice(1);
      console.log(list,pathname)
      setOpenKeys(list.map((item, index) => `/${list.slice(0, index + 1).join('/')}`));
    },[]);
    const getSelectedKeys = useMemo(() => {
      const list = pathname.split('/').splice(1);
      return list.map((item, index) => `/${list.slice(0, index + 1).join('/')}`);
    }, [pathname]);
    const  getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
      ):MenuItem=>{
        return {
            key,
            icon,
            children,
            label,
          } as MenuItem;
    }
        const renderMenu=(data:any)=>{
             
            return data.map((item:any) => {
                return getItem(<Link to={item.path}>{item.name}</Link>,item.key,item.icon,item.children ? renderMenu(item.children): undefined)
            })
   
        }
    return <Sider trigger={null} collapsible collapsed={globalStore.collapsed}>
         {/* <header>
                            <Link to="/">
                                <Menu className="logo-menu">
                                   <Menu.Item key="2" className="logo-area">
                                        <img src={logo} alt="后台首页" />
                                        <h2 >后台管理</h2>
                                    </Menu.Item> 
                                </Menu>    
                                
                            </Link>
                        </header> */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['home']}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={renderMenu(routerConfig)}
        ></Menu>
      </Sider>
}
export default observer(SiderComponent)