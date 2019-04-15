const fs = require('fs')

const checkfileExists = (path) => {
    return new Promise((resolve, reject) => {
        try {
            fs.stat(path, (error, file) => {
                if (!error && file.isFile()) {
                    return resolve(true);
                }
                if (error && error.code === 'ENOENT') {
                    return resolve(false);
                }
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = checkfileExists;