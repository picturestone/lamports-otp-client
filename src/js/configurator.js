import config from './config';

export default class configurator {
    get serverUrl() {
        return `http://${config.HOST}:${config.PORT}/`;
    }
};