import DEFAULTS from './defaults.js';

class Ajax {

    constructor(url, options) {
        this.url = url;
        this.options = {
            ...DEFAULTS,
            ...options
        }
        this.init();
    }

    init() {

        const xhr = new XMLHttpRequest();
        this.xhr = xhr;
        this.bindEvent();
        xhr.open(this.options.method, this.url + this.addParam(params), true);

    }
    
    success() {

    }

    httpCodeError() {

    }

    error() {

    }

    abort() {

    }

    timeout() {

    }

    ok(){
        xhr = this.xhr;
        xhr.status >= 200 && xhr.status < 300 || xhr.status == 304

    }
    bindEvent() {

        const xhr = this.xhr;

        xhr.addEventListener('load', () => {

                if (this.ok()) {
                    this.success(xhr.response, xhr);
                }
                else{
                    this.httpCodeError(xhr.status, xhr)
                }
            },
            false);

            xhr.addEventListener('error', () => {
                this.error(xhr);
            },
            false);

            xhr.addEventListener('abort', () => {
                this.abort(xhr);
            },
            false);

    }
}

export default Ajax;