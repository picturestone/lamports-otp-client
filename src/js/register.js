import hash from './hasher';
import configurator from './configurator';
import $ from 'jquery';
import { formToJson } from './helper';
import { displayError, displaySuccess } from './alerts';

export default class register {
    constructor() {
        this.$registerForm = $('.js-register-form');
        this.$submitButton = this.$registerForm.find('.js-submit-button');
        this.configurator = new configurator();

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
        const indexUrl = this.configurator.serverUrl + 'auth/index';

        // Get number of hash loops necessary.
        $.ajax({
            type: 'GET',
            url: indexUrl,
            success: (data) => {
                // Loop password through hash method
                const registerUrl = this.configurator.serverUrl + 'users';
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