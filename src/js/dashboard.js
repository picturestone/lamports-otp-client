import hash from './hasher';
import config from './config';
import storage from './storage';
import $ from 'jquery';
import { formToJson, displayError, displaySuccess } from './helper';

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
        this.$logoutForm.on('submit', this.onSubmit.bind(this));
    }

    onSubmit(event) {
        event.preventDefault();
        this.$logoutButton.prop('disabled', true);

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