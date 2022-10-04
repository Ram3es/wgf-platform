import { ComponentType, FunctionComponent } from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { ROLES } from '@constants/user-roles';
import { useAppSelector } from '@services/hooks/redux';
import { ROUTES } from '@constants/routes';

interface IPrivateRoleRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

export const PrivateRoleRoute: FunctionComponent<IPrivateRoleRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { role } = useAppSelector((state) => state.user);

  if (![ROLES.superAdmin, ROLES.trainerAdmin].includes(role as ROLES)) {
    return <Redirect to={ROUTES.dashboard} />;
  }

  const renderRoute = (props: any) => <Component {...props} />;
  return <Route {...rest} render={renderRoute} />;
};
