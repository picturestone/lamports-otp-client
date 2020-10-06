# Lamports-OTP-Client

This client is made to work with the lamports-otp server found in the [lamports-otp repository](https://github.com/picturestone/lamports-otp-client).

## Installation

### Prerequisits

The following are prerequisits for running this website.

* git, downloadable [here](https://git-scm.com/downloads)
* node, downloadable [here](https://nodejs.org/en/download)
* a browser, for example firefox or google chrome

### Setup

This is the setup procedure:

1. Do the setup of the lamports-top server. For instructions, go to [https://github.com/picturestone/lamports-otp-client](https://github.com/picturestone/lamports-otp-client)
1. Enter in the terminal: `git clone https://github.com/picturestone/lamports-otp-client`
1. Go to the folder `lamports-otp-client`
1. Download dependencies: `npm install`
1. Configurate (see Installation > Configuration) - This is optional.
1. Build the website: `npm run build`
1. Host the website on the included webserver: `npm run serve`, or alternatively copy the files from the `lamports-otp-client/dist` to a webserver of your choice.

If all configurations are unchanged and the website is hosted on the included webserver, the website is reachable via the url [http://localhost:8000/](http://localhost:8000/)

### Configuration

This chapter lists all configurable parameters:

To configurate the connection to the otp-server (downloadable [here](https://github.com/picturestone/lamports-otp):

1. Open the following file `lamports-otp-client/src/js/config.js`
1. Change the value of the PORT parameter to the port the otp-server is running on, e.g. if the otp-server is configured to run on port 4430 change the line `    'PORT': '3000',` to `'PORT': '4430',`. The default port is `3000`, which corresponds to the default of the opt-server.
1. Change the value of the HOST parameter to the host the otp-server is running on, e.g. if the otp-server is configured to run on host 192.168.0.46 change the line `'HOST': 'localhost'` to `'HOST': '192.168.0.46'`. The default host is `localhost`, which corresponds to the default of the opt-server.

To configurate the included webserver:

1. Open the following file `lamports-otp-client/package.json`
1. The following parameters can be changed in line 10 (`"serve": "./node_modules/.bin/http-server ./dist -a localhost -p 8000 -c-1",`):
    1. `-a localhost` - replace `localhost` with the host of the machine the webserver should run on.
    1. `-p 8000` - replace `8000` with the port the webserver should run on

