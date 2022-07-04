import React from 'react';
import ReactDom from 'react-dom';
import { ConfigProvider, Button } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './styles/main.less';
import { Provider } from 'mobx-react';
import stores from "./store"
import AppRouter from "@/router"
import "./index.less";
const App = ()=>(
    <ConfigProvider locale={zhCN}>
      <Provider {...stores}>
        <AppRouter/>
      </Provider>
    </ConfigProvider>
)

ReactDom.render(<App/>,document.getElementById('app'))