import hash from './hasher';
import config from './config';
import storage from './storage';
import $ from 'jquery';
import { formToJson } from './helper';
import { displayError, displaySuccess, displayWarning } from './alerts';

export default class login {
    constructor() {
        this.storage = new storage();
        this.$notLoggedInView = $('.js-dashboard-not-logged-in');
        this.$loggedInView = $('.js-dashboard-logged-in');

        if(this.storage.isLoggedIn) {
            this.showLoggedInView();
        } else {
            this.showNotLoggedInView();
        }

        this.$changePasswordForm = $('.js-change-password-form');
        this.$submitButton = this.$changePasswordForm.find('.js-submit-button');
        this.$logoutForm = $('.js-logout-form');
        this.$logoutButton = this.$logoutForm.find('.js-submit-button');

        this.bindListeners();
    }

    showLoggedInView() {
        this.$loggedInView.removeClass('d-none');
        $('.js-dashboard-headline').text(`Welcome, ${this.storage.username}`);
    }

    showNotLoggedInView() {
        this.$notLoggedInView.removeClass('d-none');
    }

    bindListeners() {
        this.$changePasswordForm.on('submit', this.onChangePassword.bind(this));
        this.$logoutForm.on('submit', this.onLogout.bind(this));
    }

    onChangePassword(event) {
        event.preventDefault();
        this.$submitButton.prop('disabled', true);

        this.changePassword(
            (success) => {
                displaySuccess('Password change successful!', this.$changePasswordForm);
                this.$submitButton.prop('disabled', false);
            },
            (error) => {
                displayError(error.statusText, this.$loginForm);
                this.$submitButton.prop('disabled', false);
            }
        )
    }

    changePassword(successCallback, errorCallback) {
        const indexUrl = new config().serverUrl + 'auth/index';

        // Get number of hash loops necessary.
        $.ajax({
            type: 'GET',
            url: indexUrl,
            success: (data) => {
                // Loop password through hash method
                const changePasswordUrl = new config().serverUrl + 'users';
                const changePasswordData = formToJson(this.$changePasswordForm);
                if(changePasswordData.password !== '') {
                    changePasswordData.password = hash(changePasswordData.password, data.index);
                }

                // Make call to change password API.
                $.ajax({
                    type: 'PUT',
                    url: changePasswordUrl,
                    data: JSON.stringify(changePasswordData),
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

    onLogout(event) {
        event.preventDefault();
        this.$logoutButton.prop('disabled', true);

        const indexUrl = new config().serverUrl + 'auth/index';
        const indexData = { 'username' : this.storage.username };

        // Get number of hash loops necessary.
        $.ajax({
            type: 'POST',
            url: indexUrl,
            data: JSON.stringify(indexData),
            contentType: 'application/json',
            success: (data) => {
                if(data.index < 0) {
                    // A password-change is necessary. Display alert and don't logout the user.
                    displayWarning('Your password ran out of uses. You need to change it before logging out.', this.$logoutForm);
                    this.$logoutButton.prop('disabled', false);
                } else {
                    // A password-change is not necessary. Logout the user.
                    this.logout(
                        (success) => {
                            displaySuccess('Logout successful! Redirecting...', this.$logoutForm);
                            setTimeout(() => {
                                window.location.href = '/';
                            }, 2000);
                        },
                        (error) => {
                            displayError(error.statusText, this.$loginForm);
                            this.$logoutButton.prop('disabled', false);
                        }
                    )
                }
            },
            error: (error) => {
                displayError(error.statusText, this.$loginForm);
                this.$logoutButton.prop('disabled', false);
            },
        });
    }

    logout(successCallback, errorCallback) {
        const logoutUrl = new config().serverUrl + 'auth/logout';

        // Get number of hash loops necessary.
        $.ajax({
            type: 'GET',
            url: logoutUrl,
            success: (data) => {
                this.storage.isLoggedIn = false;
                this.storage.removeUsername();
                successCallback(data);
            },
            error: (error) => {
                errorCallback(error);
            },
        });
    }
};