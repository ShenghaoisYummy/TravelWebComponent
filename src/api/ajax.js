import DEFAULTS from './defaults.js';
import {
    serialize,
    addURLData,
    serializeJson
} from './utils.js'
import {
    CONTENT_TYPE_FROM_URLENCODED,
    HTTP_GET,
    CONTENT_TYPE_JSON
} from "./constants.js";
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

        this.setResponseType();
        this.setCookie();
        this.setTimeout();
        this.xhr.sendData();

    }

    setResponseType() {

        this.xhr.responseType = this.options.responseType;

    }

    setCookie() {

        if (this.options.withCredentials) {

            this.xhr.withCredentials = true;

        }

    }

    sendData() {

        const xhr = this.xhr;

        if (!this.isSendData()) {
            return xhr.send(null);
        }

        let resultData = null;
        const {data} = this.options.data;
 
        if (this.isFormData()) {
            resultData = data;
        }
        
        else if (this.isFormUrlEncodedData()) {

            this.setContentType(CONTENT_TYPE_FROM_URLENCODED)
            resultData = serialize(data);

        }

        else if (this.isJsonData()){

            this.setContentType(CONTENT_TYPE_JSON)
            resultData = serializeJson(data);

        }

        xhr.send(resultData);
        
    }

    setContentType() {

        const contentType = this.options.contentType;
        if(!contentType) return

        this.xhr.setRequestHeader('Content-type', contentType);
    }

    isFormUrlEncodedData() {

        return this.options.toLowerCase().includes(CONTENT_TYPE_FROM_URLENCODED);

    }

    isJsonData() {

        return this.options.toLowerCase().includes(CONTENT_TYPE_JSON);

    }

    isSendData() {

        const {
            data,
            method
        } = this.options;

        if (!data) return false;

        if (method.toLowerCase() === HTTP_GET.toLowerCase()) return false;

        if (this.isFormData()){

            return true;
        }

        return true;

    }

    isFormData() {

        return this.options.data instanceof Formdata;

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

        const {
            timeoutTime
        } = this.options;

        if (timeouTime > 0) {
            this.xhr.timeout = timeoutTime;
        }
    }

    addParam() {

        const {
            params
        } = this.options;

        if (!params) return '';

        return `${addURLData(serialize(params))}`

    }

    ok() {

        xhr = this.xhr;
        xhr.status >= 200 && xhr.status < 300 || xhr.status == 304

    }

    bindEvent() {

        const xhr = this.xhr;

        xhr.addEventListener('load', () => {

                if (this.ok()) {
                    this.success(xhr.response, xhr);
                } else {
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

    getXhr() {
        
        return this.xhr;
    }
}

export default Ajax;