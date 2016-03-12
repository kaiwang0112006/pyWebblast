function save_download(filename, data, strtype) {
    var blob = new Blob([data], {type: strtype});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem)
        elem.click();        
        document.body.removeChild(elem);
    }
}

/*
 * var BrowserSupportedMimeTypes = {
 "image/jpeg": true,
 "image/png": true,
 "image/gif": true,
 "image/svg+xml": true,
 "image/bmp": true,
 "image/x-windows-bmp": true,
 "image/webp": true,
 "audio/wav": true,
 "audio/mpeg": true,
 "audio/webm": true,
 "audio/ogg": true,
 "video/mpeg": true,
 "video/webm": true,
 "video/ogg": true,
 "text/plain": true,
 "text/html": true,
 "text/xml": true,
 "application/xhtml+xml": true,
 "application/json": true
};
 * */
