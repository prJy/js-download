const path = require('path');
const fs = require('fs');;

const fetchFilesFromDirectory = async (directory) => {
    
    const foundFiles = {        
        files: [],        
    };

    const formatFileBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];    
        const index = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, index)).toFixed(dm)) + ' ' + sizes[index];
    }

    let files = await fs.readdirSync(directory);            
    if (files.length == 0) {
        return foundFiles;
    }    
    
    const absPath = path.resolve(directory);     
    for (let file of files) {      
        try 
        {
            let stats = await fs.statSync(absPath + '/' + file);            
            
            if (!stats.isFile()) continue;

            foundFiles.files.push({                
                name: file.substring(0, file.lastIndexOf('.')),
                fullName: file,
                type: file.substring(file.lastIndexOf('.') + 1),
                size: formatFileBytes(stats["size"]),
                date: stats["mtime"]
            });
        
        } 
        catch (err) {
            throw err;            
        }
    }                

    return foundFiles;
}


module.exports =  fetchFilesFromDirectory;