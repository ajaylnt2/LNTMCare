
class ButtonElementController {
  constructor() {
    // set the default values for the component
    this.name = 'button';
    this.decimals = 2;


  }
  onClick = function(){
        //  console.log('close dialog');

      }
  getClass(type) {

    switch (type) {
      case 'default':
        return ['btn-default']
      case 'primary':
        return ['btn-primary']
      case 'success':
        return ['btn-success']
        case 'info':
        return ['btn-info']
    }
  }
}

export default ButtonElementController;
