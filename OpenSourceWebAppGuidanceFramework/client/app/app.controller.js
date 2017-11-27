
class AppController {
  constructor($transitions, store,$state) {
    'ngInject';
  this.name = 'App';
  this.$transitions = $transitions;
  this.authenticated = false;
  this.store = store;
  this.token=null;
  var obj = this;

  this.$transitions.onSuccess({}, function($transitions){
      const token = store.get('profile');
       obj.token=token;
       obj.runController();
  });
  }
  runController()
  {
      if(!this.token || this.token==null)
      {
          this.authenticated = false;
      }
       else {
        this.authenticated = true;
       }
  }
}
export default AppController;
