import '../node_modules/bootstrap/dist/js/bootstrap';
import './styles/index.scss';
import login from './js/login';
import register from './js/register';
import dashboard from './js/dashboard';
import $ from 'jquery';

$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    }
});

new login();
new register();
new dashboard();