import controller from './promptDialog.controller';
import './promptDialog.web.scss';

let template = '';
template = require('./promptDialog.web.html');

const promptDialogComponent = {
    restrict: 'A',
    bindings: {
        text: '<',
        type: '<',
        onClick: '&'
    },
    template,
    controller,
    controllerAs: 'vm'

}

export default promptDialogComponent;