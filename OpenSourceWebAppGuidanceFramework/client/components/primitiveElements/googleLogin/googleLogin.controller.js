class GoogleLoginController {
  constructor($http, $state, $timeout, $stateParams) {
    'ngInject';
    this.$http = $http;
    this.$state = $state;
    this.name = 'googleLogin';
    this.$timeout = $timeout;
    this.app_name = 'localhost';
    this.showState = 'login';
    this.user = {};
  }
  login(event) {
    // dont refresh on submit
    event.preventDefault();
    this.loginError = '';

    if (this.user.email && this.user.password) {
      this.loading = true;
      const data = { email: this.user.email, password: this.user.password };
      this.auth.login(data);

    }
  }
  register(event) {
    event.preventDefault();

    this.registerSuccess = false;
    this.registerError = '';

    if (this.user.email && this.user.password && this.user.name) {
      this.loading = true;
      const data = { name: this.user.name, email: this.user.email, password: this.user.password };
      this.auth.register(data).then((response) => {
        this.loading = false;
        if (response.data === 'success') {
          this.registerSuccess = true;
          this.registerError = '';
        } else {
          const message = response.data;
          let errorMessage = message;
          try {
            errorMessage = JSON.parse(message.replace('Client Error: ', '')).message;
          } catch (e) {
            console.log('error parsing response: ', e);
            console.warn("The 'Client Error: ' portion of the register response may have been removed! Update me!");
          }
          this.registerError = errorMessage;
        }
      });
    } else {
      const errors = [];
      if (!this.user.name) {
        errors.push('No name given.');
      }
      if (!this.user.email) {
        errors.push('No email supplied.');
      }
      if (!this.user.password) {
        errors.push('No password supplied');
      }
      this.registerError = errors.join(' ');
    }
  }
  reset(event) {
    event.preventDefault();

    this.resetSuccess = false;
    this.resetError = '';

    if (this.user.email) {
      // Send email along with token by using murano
      this.loading = true;
      const data = { email: this.user.email, app: this.app_name };
      this.auth.reset(data).then((response) => {
        this.loading = false;
        if (response.status === '200') {
          this.resetSuccess = true;
          this.resetError = '';
          this.user.email = '';
        } else {
          const message = response.data;
          let errorMessage = message; // eslint-disable-line no-unused-vars
          try {
            errorMessage = JSON.parse(message.replace('Client Error: ', '')).message;
          } catch (e) {
            console.log('error parsing response: ', e);
            console.warn("The 'Client Error: ' portion of the reset response may have been removed! Update me!");
          }
          this.resetError = 'Your email address is not registered.Please register!'; // errorMessage
        }
      });
    } else {
      const errors = [];
      if (!this.user.newpassword) {
        errors.push('No email given.');
      }
      this.registerError = errors.join(' ');
    }
  }

  resetPassword(event) {
    event.preventDefault();

    this.resetSuccess = false;
    this.resetError = '';
    if (this.user.password && this.user.confirm) {
      const errors = [];

      if (this.user.password !== this.user.confirm) {
        errors.push("These passwords don't match.");
        this.resetPasswordError = errors.join(' ');
        return;
      }

      // Validate for the same password in UI
      this.loading = true;
      const data = { password: this.user.password, token: this.token, id: this.id };

      this.auth.changePassword(data).then((response) => {
        this.loading = false;
        if (response.data.status_code === '204') {
          this.resetPasswordSuccess = true;
          this.resetPasswordError = '';
          this.user.confirm = '';
          this.user.password = '';
          this.showState = 'login';
        } else {
          const message = response.data;
          let errorMessage = message;
          try {
            errorMessage = JSON.parse(message.replace('Client Error: ', '')).message;
          } catch (e) {
            console.log('error parsing response: ', e);
            console.warn("The 'Client Error: ' portion of the register response may have been removed! Update me!");
          }
          this.resetPasswordError = errorMessage;
        }
      });
    } else {
      const errors = [];
      if (!this.user.newpassword) {
        errors.push('No password given.');
      }
      if (!this.user.confirmpassword) {
        errors.push('No password supplied.');
      }
      this.resetPasswordError = errors.join(' ');
    }
  }
  changeState(toState) {
    this.loginError = '';
    this.registerError = '';
    this.resetPasswordError = '';
    this.resetError = '';
    this.showState = toState;
  }
}

export default GoogleLoginController;
