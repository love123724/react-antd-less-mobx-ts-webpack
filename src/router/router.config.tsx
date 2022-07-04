import React, { lazy } from 'react';
import RouteType from './type';
import { Redirect} from 'react-router-dom';

import {
  HomeOutlined,
  
  UserOutlined,

  DashboardOutlined,
  
} from '@ant-design/icons'
const routes: RouteType[] = [
  {
    path: '/',
    exact:true,
    key:"home",
    name:"首页",
    icon: <HomeOutlined/>,
    component: lazy(() => import('@/pages/Home')),
  },
  {
     path:"/bill",
     exact:true,
     key:"bill",
     name:"账单管理",
     icon: <DashboardOutlined/>,
     component:lazy(() => import('@/pages/Bill')),
  },
  {
    path: '/manager',
    key:"manager",
    name:"系统管理",
    icon: <UserOutlined/>,
    render:()=>(
      <Redirect to={"/manager/userManager"}/>
  ),
    children:[
      {
        path:"/manager/userManager",
        exact:true,
        key:"manager:userManager",
        name:"用户管理",
        component: lazy(() => import('@/pages/Admin/userManager')),
      },
      {
        path:"/manager/roleManager",
        exact:true,
        key:"manager:roleManager",
        name:"角色管理",
        component: lazy(() => import('@/pages/Admin/roleManager')),
      }
    ]
  }
];

export default routes;