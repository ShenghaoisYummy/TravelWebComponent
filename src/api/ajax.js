import DEFAULTS from './defaults.js';
import { serialize, addURLData } from './utils.js'
import { HTTP_GET } from "./constants.js";
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

        this.setResponseType( );
        this.setCookie();
        this.setTimeout();
        this.xhr.send();

    }

    setResponseType(){

        this.xhr.responseType = this.options.responseType;

    }

    setCookie(){

        if(this.options.withCredentials){
            this.xhr.withCredentials = true;
        }

    }

    sendData() {

        const xhr = this.xhr;

        if (!this.isSendData()){
            return xhr.send(null);
        }
    }

    isSendData(){

        const { data, method } = this.options;

        if(!data) return false;

        if(method.toLowerCase()===  HTTP_GET.toLowerCase()) return false;
        
    }
    
    success() {

    }

    httpCodeError() {

    }

    error() {

    }

    abort() {

    }

    setTimeout() {

        const { timeoutTime } = this.options;

        if(timeouTime > 0) {
            this.xhr.timeout = timeoutTime;
        }
    }

    addParam(){

        const { params } = this.options;

        if(!params) return '';

        return `${addURLData(serialize(params))}`
        
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