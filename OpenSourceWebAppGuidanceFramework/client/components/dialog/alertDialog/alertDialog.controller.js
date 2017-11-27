class alertDialogController{
    constructor(ngDialog){
      'ngInject'
        this.name = 'alertDialog';
        this.ngDialog = ngDialog;
      
    }

    closeThisDialog = function(){
          //  console.log('close dialog');
            this.ngDialog.close();
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

export default alertDialogController;
