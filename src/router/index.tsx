import React, { Suspense } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import routes from './router.config';
import Loading from '@/components/Loading';
import Login from "@/pages/Login";
import Container from "@/pages/Container";

const RouterView:React.FC = () => {
  return (
    // 建议使用 HashRouter
    <HashRouter>
      <Suspense fallback={<Loading />}>
     
     <Switch>
        <Route exact path="/login" component={Login} />
        <Route
         path="/"
         key="container"
         render={(props: any) => <Container {...props} routes={routes}/>}
    />
     </Switch>
     </Suspense>

    </HashRouter>
    
  );
};

export default RouterView;
