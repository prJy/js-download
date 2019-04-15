const path = require('path');

const downloadModule = {
    fetchFilesFromServer: require('../modules/fetchFileFromDirectory'),    
    directoryPath: path.join(__dirname, '../_static/files'),
    checkFileExists: require('../modules/checkFileExists'),
    deleteFile: require('../modules/deleteFile'),
    makeFileNameWithPath: (file) => downloadModule.directoryPath + '/' + file
} 

exports.get = async (req, res, next) => {    
    downloadModule.fetchFilesFromServer(downloadModule.directoryPath)
    .then((data)=>{
        res.status(201).json(data);
    })
    .catch((err)=>{
        res.status(401).json({ error : err.message })
    });    
};

exports.getById = (req, res, next) => {
    id = req.params.id;
    var file = downloadModule.makeFileNameWithPath(id);    
    downloadModule.checkFileExists(file)
    .then((data) =>{
        if (data) {
            res.status(201).download(file); 
        } 
        else { 
            res.status(401).json({ error : 'File not found in server' });
        }
    })
    .catch((err)=>{
        res.status(401).json({ error : err.message })
    });                       
};

exports.post = (req, res, next) => {        
    res.status(201).json({ msg : 'Upload complete!' });
}; 

exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`We dont use it! ${id}`);
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    var file = downloadModule.makeFileNameWithPath(id);      
    downloadModule.deleteFile(file)
    .then((data) =>{
        if (data) {
            res.status(201).json({ msg : 'File removed!' }); 
        } 
        else { 
            res.status(401).json({ error : 'Error removing file!' });
        }
    })
    .catch((err)=>{
        res.status(401).json({ error : err.message })
    });  
};