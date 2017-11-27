class promptDialogController{
    constructor(ngDialog){
      'ngInject'
        this.name = 'promptDialog';
        this.ngDialog = ngDialog;        
    }

    closeThisDialog = function(){ 
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

export default promptDialogController;