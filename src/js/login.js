import hash from './hasher';
import config from './config';
import storage from './storage';
import $ from 'jquery';
import { formToJson } from './helper';
import { displayError, displaySuccess } from './alerts';

export default class login {
    constructor() {
        this.$loginForm = $('.js-login-form');
        this.$submitButton = this.$loginForm.find('.js-submit-button');

        this.bindListeners();
    }

    bindListeners() {
        this.$loginForm.on('submit', this.onSubmit.bind(this));
    }

    onSubmit(event) {
        event.preventDefault();
        this.$submitButton.prop('disabled', true);

        this.login(
            (success) => {
                displaySuccess('Login successful! Redirecting...', this.$loginForm);
                setTimeout(() => {
                    window.location.href = '/dashboard.html';
                }, 2000);
            },
            (error) => {
                displayError(error.statusText, this.$loginForm);
                this.$submitButton.prop('disabled', false);
            }
        )
    }

    login(successCallback, errorCallback) {
        const indexUrl = new config().serverUrl + 'auth/index';
        const indexData = formToJson(this.$loginForm);
        delete indexData.password;

        // Get number of hash loops necessary.
        $.ajax({
            type: 'POST',
            url: indexUrl,
            data: JSON.stringify(indexData),
            contentType: 'application/json',
            success: (data) => {
                // Loop password through hash method
                const loginUrl = new config().serverUrl + 'auth/login';
                const loginData = formToJson(this.$loginForm);
                if(loginData.password !== '') {
                    loginData.password = hash(loginData.password, data.index);
                }

                // Make call to login API.
                $.ajax({
                    type: 'POST',
                    url: loginUrl,
                    data: JSON.stringify(loginData),
                    contentType: 'application/json',
                    success: (data) => {
                        // Login successful
                        new storage().isLoggedIn = true;
                        new storage().username = loginData.username;
                        successCallback(data);
                    },
                    error: (error) => {
                        errorCallback(error);
                    },
                });
            },
            error: (error) => {
                errorCallback(error);
            },
        });
    }
};