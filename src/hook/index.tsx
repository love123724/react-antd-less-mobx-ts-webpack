import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import LoadingPage from '@/components/Loading';
import config from '@/router/router.config';

const renderRoutes = (routes) => {
  if (!Array.isArray(routes)) {
    return null;
  }

  return (
    <Switch>
      {routes.map((route, index) => {
     

        return (
          <Route
            key={route.path || index}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={() => {
              const renderChildRoutes = renderRoutes(route.children);
              console.log(route.path,'renderChildRoutes')
              if (route.component) {
                return (
                  <Suspense fallback={<LoadingPage />}>
                    {/* <route.component route={route}>{renderChildRoutes}</route.component> */}
                    <route.component ></route.component>
                  </Suspense>
                );
                }
              return renderChildRoutes;
            }}
          />
        );
      })}
    </Switch>
  );
};

const AppRouter = () => <Router>{renderRoutes(config)}</Router>;

export default AppRouter;
