export default class storage {
    set isLoggedIn(isLoggedIn) {
        let val = 'false';
        if(isLoggedIn) {
            val = 'true';
        }

        localStorage.setItem('isLoggedIn', val);
    }

    get isLoggedIn() {
        let val = false;
        if(localStorage.getItem('isLoggedIn') === 'true') {
            val = true;
        }

        return val;
    }

    set username(username) {
        localStorage.setItem('username', username);
    }

    get username() {
        return localStorage.getItem('username');
    }

    removeUsername() {
        localStorage.clear('username');
    }
};