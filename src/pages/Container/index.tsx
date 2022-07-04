import React,{useState, useEffect} from "react";
import { observer } from 'mobx-react';
import "./style.less";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import SiderMenu from "@/pages/SideMenu";
import useStores from '../../utils/useStores';
import {useLocation, useHistory} from "react-router-dom";
import Utils from "../../utils";
import { Layout, Menu } from 'antd';
import routerConfig from "@/router/router.config";
import UseChildRoutes from "@/hook";
import RouteType from "@/router/type";
const { Header, Content, Footer } = Layout;
const Container:React.FC<{ routes: RouteType[]}> = (props)=>{
    
    const { routes } = props;
   const globalStore =  useStores("globalStore");
   const userInfo = globalStore?.userInfo || {};
   const location = useLocation();
   const history = useHistory();
   const {token} = userInfo;

    
    useEffect(()=>{

        //处理未登录
        if(!token && location.pathname !== '/login'){
            history.replace({pathname:"/login"});
            return;
        }
        console.log("props",props)
    })
  

  return (
    <Layout >
      <SiderMenu >
       
      </SiderMenu>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(globalStore.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => globalStore.toggleCollapsed(!globalStore.collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
        {UseChildRoutes()}
        </Content>
        <Footer className="page-footer">Copyright© 2022-rayyyyyyy </Footer>
      </Layout>
    </Layout>
  );
}
export default observer(Container)