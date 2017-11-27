import controller from './alertDialog.controller';
import './alertDialog.web.scss';

let template = '';
template = require('./alertDialog.web.html');

const alertDialogComponent = {
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

export default alertDialogComponent;