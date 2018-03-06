import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import ErrorIcon from 'material-ui-icons/Error';

import Routes from '../routes';
import SignUpContainer from '../../auth/signUp/SignUpContainer';
import LoginContainer from '../../auth/login/LoginContainer';
import ResetPasswordContainer from '../../auth/resetPassword/ResetPasswordContainer';
import PatientsContainer from '../../patients/PatientsContainer';
import SensorsSetUpContainer from '../../settings/SensorsSetUpContainer';
import ErrorDisplay from '../../shared/ErrorDisplay';
import Home from '../../home/Home';
import About from '../../about/About';

import Loading from 'shared/Loading';

import {
  userIsAuthenticatedRedirect,
  userIsNotAuthenticatedRedirect,
} from '../../auth/authWrappers';

const Login = userIsNotAuthenticatedRedirect(LoginContainer);
const SignUp = userIsNotAuthenticatedRedirect(SignUpContainer);
const ResetPassword = userIsNotAuthenticatedRedirect(ResetPasswordContainer);
const SensorsSetUp = userIsAuthenticatedRedirect(SensorsSetUpContainer);
const Patients = userIsAuthenticatedRedirect(PatientsContainer);

const LoadableProfile = Loadable({
  loader: () => import(/* webpackChunkName: "Profile" */ '../../profile/Profile'),
  loading() {
    return <Loading />;
  },
});

const NotFound = () => (
  <ErrorDisplay
    Icon={ErrorIcon}
    title='Что-то пошло не так!'
    caption='Вас не должно быть тут!'
  />
);

const AppContent = ({ className }) => (
  <div className={className}>
    <Switch>
      <Route exact path={Routes.Main.path} component={Home}/>
      <Route path={Routes.Patients.path} component={Patients}/>
      <Route path={Routes.SensorsSetUp.path} component={SensorsSetUp}/>
      <Route path={Routes.Team.path} component={LoadableProfile}/>
      <Route path={Routes.About.path} component={About}/>
      <Route path={Routes.SignUp.path} component={SignUp}/>
      <Route path={Routes.Login.path} component={Login} />
      <Route path={Routes.ResetPassword.path} component={ResetPassword} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

AppContent.propTypes = {
  className : PropTypes.string,
};

export default AppContent;
