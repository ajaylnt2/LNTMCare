class ConfirmDialogController{
    constructor(ngDialog){
      'ngInject'
        this.name = 'ConfirmDialog';
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

export default ConfirmDialogController;