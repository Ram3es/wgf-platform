/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType, FunctionComponent } from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';

import { storageService } from '@services/storage/storage';

import { ROUTES } from '@constants/routes';

interface IPrivateRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

export const PrivateRoute: FunctionComponent<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isToken = storageService.getToken();
  const user = storageService.getUser();

  if (!isToken || !user) {
    return <Redirect push to={ROUTES.signIn} />;
  }

  const renderRoute = (props: any) => <Component {...props} />;

  return <Route {...rest} render={renderRoute} />;
};
