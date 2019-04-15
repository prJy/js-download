$(document).ready(() => {
            
    const buildAPIUrl = (route) => { 
        return `/api/v1/${ route }/`; 
    }   

    const API = {
        fetchFiles: buildAPIUrl("download"),
        downloadFiles: (file) => buildAPIUrl("download") + file,
    }                       

    const fetchDataFromAPI = () =>{                                
        $.getJSON(API.fetchFiles, (data) => {
            if((typeof(data) != "undefined")){
                const files = data.files;                    
                files.forEach((file, index) => {                            
                    let template = 
                    `<tr>
                        <td>${ index + 1 }</td>
                        <td>${ file.fullName }</td>
                        <td>${ file.date }</td>
                        <td><span class="label label-success">${ file.type }</span></td>                    
                        <td>${ file.size }</td>
                        <td><a href="${API.downloadFiles(file.fullName)}" class="btn btn-sm manage" target="_blank">Download Now</a></td>
                    </tr>`;

                    $("#downloadData tbody").append(template);
                });
            }                    
        });         
    }           
    
    fetchDataFromAPI();
});