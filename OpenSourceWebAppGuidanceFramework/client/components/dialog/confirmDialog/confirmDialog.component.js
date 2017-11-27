import controller from './confirmDialog.controller';
import './confirmDialog.web.scss';

let template = '';
template = require('./confirmDialog.web.html');

const confirmDialogComponent = {
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

export default confirmDialogComponent;