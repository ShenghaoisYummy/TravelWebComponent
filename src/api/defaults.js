import { HTTP_GET, CONTENT_TYPE_FROM_URLENCODED, CONTENT_TYPE_JSON} from "./constants.js";

const DEFAULTS = {

    method:HTTP_GET,
    params: null,
    data: null,
    contentType: CONTENT_TYPE_FROM_URLENCODED,
    responseType:'',
    timeouTime: 0,
    withDredentials:false

}

export default DEFAULTS;