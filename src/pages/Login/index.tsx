import React,{useState, CSSProperties, useEffect} from "react";
import {useHistory} from "react-router-dom";
import { observer } from 'mobx-react';
import "./style.less";
import { Form, Input, Checkbox, Button, Tabs, message, Card } from 'antd';
import {UserOutlined,LockOutlined, MobileOutlined} from '@ant-design/icons';

import QRCode from 'qrcode.react';
import ParticlesBg from 'particles-bg';
import useStores from '../../utils/useStores';
const { TabPane } = Tabs;
type LoginType = 'phone' |'account' |'qrcode';
const iconStyles:CSSProperties = {
    marginLeft:"16px",
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
}
const flatCss:CSSProperties = {
    color:'red'
}
const Login:React.FC = ()=>{
    const [loginType, setLoginType] = useState<LoginType>('account');
    const [btnLoding, setBtnLoading] = useState<boolean>(false);
    const globalStore = useStores('globalStore');
    const commonStore = useStores('commonStore');
    const history = useHistory();
    let config = {
        num: [4, 7],
        rps: 0.1,
        radius: [5, 40],
        life: [1.5, 3],
        v: [2, 3],
        tha: [-40, 40],
        alpha: [0.6, 0],
        scale: [.1, 0.4],
        position: "all",
        color: ["random", "#ff0000"],
        cross: "dead",
        // emitter: "follow",
        random: 15
      };
  
      if (Math.random() > 0.85) {
        config = Object.assign(config, {
          onParticleUpdate: (ctx:any, particle:any) => {
            ctx.beginPath();
            ctx.rect(
              particle.p.x,
              particle.p.y,
              particle.radius * 2,
              particle.radius * 2
            );
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.closePath();
          }
        });
      }
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const onFinish = (user:any)=>{
        if(commonStore.repeatSubmit){
           return;
        }
        commonStore.resetRepeatSubmit(true);
        commonStore.login({...user},(data:any)=>{
               globalStore.setData({userInfo:data});
               location.hash="/"
            //    history.replace("/home")
        })
      }
      useEffect(()=>{
        console.log("????????????")
      })
    return (
       <div  style={{ height: '100vh', background: 'snow' }} className={"login"}>
               
               <div>
               <div className="login-title">{globalStore.appTitle}</div>
               <Tabs style={{textAlign:'center'}} defaultActiveKey="account" onChange={(activeKey)=>{
                  
                    setLoginType(activeKey as LoginType);
                    setBtnLoading(false)

               }}>
                   {

                   }
    <TabPane tab="???????????????" key="phone">
    <Form  onFinish={onFinish}
        onFinishFailed={onFinishFailed} className="login-form">
             
        <Form.Item  name="mobile" rules={[ {
                          required: true,
                          message: '?????????????????????',
                        },
                        {
                          pattern: /^1\d{10}$/,
                          message: '????????????????????????',
                        },]}>
        <Input
              prefix={<MobileOutlined type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="?????????"
            />,
        </Form.Item>
        <Form.Item  name="password" rules={[{ required: true, message:'?????????' }]} >
         <Input
              prefix={<LockOutlined type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
             
              placeholder="???????????????"
            />
            <Button type="default" >
            ???????????????
          </Button>
        </Form.Item>
        <Form.Item style={flatCss}>
         <Checkbox>????????????</Checkbox>
          <a className="login-form-forgot" href="javascript:;" style={{float:"right"}}>
           ????????????
          </a>
          </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            ??????
          </Button>
        </Form.Item>
      </Form>
    </TabPane>
    <TabPane tab="??????????????????" key="account">
    <Form  onFinish={onFinish}
        onFinishFailed={onFinishFailed} className="login-form">
            
        <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
        <Form.Item   name="lock" rules={[{ required: true, message:'????????????' }]}>
        <Input
              prefix={<LockOutlined type="lock"  />}
              type="password"
              placeholder="Password"
            />
        </Form.Item>
        <Form.Item style={flatCss}>
         <Checkbox  style={{
                      float: 'left',
                    }}>????????????</Checkbox>
         <a href="#!"
                    style={{
                      float: 'right',
                    }}
                  >
                    ????????????
                  </a>
          </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            ??????
          </Button>
        </Form.Item>
      </Form>
    </TabPane>
    <TabPane tab="???????????????" key="qrcode">
    <Card>
                      <QRCode
                        style={{ width: '100%', height: '100%' }}
                        level="M"
                        value="https://gitee.com/jinxin0517/vite-react-ts-admin"
                      />
                    </Card>
                    <Checkbox  style={{
                      float: 'left',
                    }}>????????????</Checkbox>
         <a href="#!"
                    style={{
                      float: 'right',
                    }}
                  >
                    ????????????
                  </a>
    </TabPane>
  </Tabs>,
               </div>
                 <ParticlesBg
            type="custom"
            config={config as any} 
            bg={
              {
                zIndex: 0,
                position: 'absolute',
                top: '0px',
                left: '0px',
                pointerEvents: 'none',
              } as any
            }
          />
       </div>
    )
}
export default observer(Login)