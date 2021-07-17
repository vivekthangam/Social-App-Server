function getXHR() {
    if (window.XMLHttpRequest) {
        // Chrome, Firefox, IE7+, Opera, Safari
        return new XMLHttpRequest();
    }
    // IE6
    try {
        // The latest stable version. It has the best security, performance, 
        // reliability, and W3C conformance. Ships with Vista, and available 
        // with other OS's via downloads and updates. 
        return new ActiveXObject('MSXML2.XMLHTTP.6.0');
    } catch (e) {
        try {
            // The fallback.
            return new ActiveXObject('MSXML2.XMLHTTP.3.0');
        } catch (e) {
            alert('This browser is not AJAX enabled.');
            return null;
        }
    }
}

class http {


    constructor() {
        this.GET = "GET";
        this.POST = "POST";
        this.DELETE = "DELETE";
        this.PUT = "PUT";
        this.OPTIONAL = "OPTIONAL";

    }

    request(obj) {
        return new Promise((resolve, reject) => {
            let xhr = new getXHR();
            xhr.open(obj.method || "GET", obj.url);
            if (obj.headers) {
                Object.keys(obj.headers).forEach(key => {
                    xhr.setRequestHeader(key, obj.headers[key]);
                });
            }
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(obj.body);
        });
    };
    get(url, body, headers) {
        var obj = {
            method: this.GET,
            url: url,
            body: body,
            headers: headers
        };
        return this.request(obj);
    };
    post(url, body, headers) {
        var obj = {
            method: this.POST,
            url: url,
            body: body,
            headers: headers
        };
        console.log(body);
        return this.request(obj);

    };

    put(url, body, headers) {
        var obj = {
            method: PUT,
            url: url,
            body: body,
            headers: headers
        };
        return this.request(obj);
    };

    delete(url, body, headers) {
        var obj = {
            method: DELETE,
            url: url,
            body: body,
            headers: headers
        };
        return this.request(obj);
    };

}