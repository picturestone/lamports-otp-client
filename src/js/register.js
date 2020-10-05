import hash from './hasher';
import config from './config';
import $ from 'jquery';
import { formToJson, displayError, displaySuccess } from './helper';

export default class register {
    constructor() {
        this.$registerForm = $('.js-register-form');
        this.$submitButton = this.$registerForm.find('.js-submit-button');

        this.bindListeners();
    }

    bindListeners() {
        this.$registerForm.on('submit', this.onSubmit.bind(this));
    }

    onSubmit(event) {
        event.preventDefault();
        this.$submitButton.prop('disabled', true);

        this.register(
            (success) => {
                displaySuccess('Registering successful!', this.$registerForm);
                this.$submitButton.prop('disabled', false);
            },
            (error) => {
                displayError(error.statusText, this.$registerForm);
                this.$submitButton.prop('disabled', false);
            }
        )
    }

    register(successCallback, errorCallback) {
        const indexUrl = new config().serverUrl + 'auth/index';

        // Get number of hash loops necessary.
        $.ajax({
            type: 'GET',
            url: indexUrl,
            success: (data) => {
                // Loop password through hash method
                const registerUrl = new config().serverUrl + 'users';
                const registerData = formToJson(this.$registerForm);
                if(registerData.password !== '') {
                    registerData.password = hash(registerData.password, data.index);
                }

                // Make call to register API.
                $.ajax({
                    type: 'POST',
                    url: registerUrl,
                    data: JSON.stringify(registerData),
                    contentType: 'application/json',
                    success: (data) => {
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