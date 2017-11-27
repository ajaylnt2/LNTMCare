// const logo = '../images/logo.png';
// const tagline = '../images/tagline.png';
import './login.scss';
class LoginController {

  constructor(store,$state,auth) {
    'ngInject';
    this.name = 'login';
    this.auth = auth;
    const token = store.get('profile');
    if(token!=null)
    {
      $state.go("/");
    }
  }


}

export default LoginController;
