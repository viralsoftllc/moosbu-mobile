import CreatePassword from '../../../screens/auth/CreatePassword';
import Login from '../../../screens/auth/Login';
import Register from '../../../screens/auth/Register';
import ResetPassword from '../../../screens/auth/ResetPassword';
import ResetPasswordFailed from '../../../screens/auth/ResetPassword/ResetPasswordFailed';
import ResetPasswordMailSent from '../../../screens/auth/ResetPassword/ResetPasswordMailSent';
import ResetPasswordSuccess from '../../../screens/auth/ResetPassword/ResetPasswordSuccess';
import VerifyEmail from '../../../screens/auth/VerifyEmail';
import routes from '../../../shared/constants/routes';

const authScreens = {
  [routes.LOGIN]: Login,
  [routes.REGISTRATION]: Register,
  [routes.CREATE_PASSWORD]: CreatePassword,
  [routes.VERIFY_EMAIL]: VerifyEmail,
  [routes.RESET_PASSWORD]: ResetPassword,
  [routes.RESET_PASSWORD_DONE]: ResetPasswordMailSent,
  [routes.RESET_PASSWORD_SUCCESS]: ResetPasswordSuccess,
  [routes.RESET_PASSWORD_FAIL]: ResetPasswordFailed,
};

export {authScreens};
