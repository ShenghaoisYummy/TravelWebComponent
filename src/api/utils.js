// utilitis function

// combine two values 
const serialize = param => {

    //     params : {
    //     username: "alex",
    //     age: "18"
    // }

    const results = [];

    for(const [key, value] of Object.entries(param)){

        results.push(`${encodeURIComponent(key)} = ${encodeURIComponent(value)}`)

    }

    
    return results.join('&');

}

//check wheather the url includes values and return params with ? or & mark
const addURLData = (url, data) => {

    if(!data)return'';

    const mark = url.includes('?')?'&':'?';

    return `${mark}${data}`;

}

export { serialize, addURLData };