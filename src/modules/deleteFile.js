var fs = require('fs');

const deleteFile = (path) => {
    return new Promise((resolve, reject) =>{
        try {
            fs.unlink(path, (err) => {
                if(err) resolve(false);
                resolve(true);
            }); 
        }
        catch(err) {
            reject(err);
        }
    });    
}

module.exports = deleteFile;