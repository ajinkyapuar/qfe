import config from 'config'

export const jobService={
    save_name,
    upload,
    allprojects,
    projectById,
    deleteById
}

function save_name(job){
    // console.log("in services",JSON.stringify(project))
    const data = {
        method: 'POST',
        headers: { "Authorization": "bearer " + localStorage.getItem('user').token, 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
    };

    return fetch(`${config.apiUrl}/job/save-name`, data).then(handleResponse)
           
}

function upload(imageData){
    console.log("track serup",imageData)
    const data = {
        method: 'POST',
        headers: { "Authorization": "bearer " + localStorage.getItem('user').token},
        body: imageData['formData']
    };

    return fetch(`${config.apiUrl}/job/upload/${imageData['id']}`, data).then(handleResponse)
}

function allprojects(pageNo,value,id){
   
    const data = {
        method: 'GET',
        headers: { "Authorization": "bearer " + localStorage.getItem('user').token},
    };

    return fetch(`${config.apiUrl}/project/projects/${pageNo}?value=${value}&user_id=${id}`, data).then(handleResponse)
}


function projectById(id){
    const data = {
        method: 'GET',
        headers: { "Authorization": "bearer " + localStorage.getItem('user').token},
    };

    return fetch(`${config.apiUrl}/project/${id}`, data).then(handleResponse)
}

function deleteById(id){
    const data = {
        method: 'DELETE',
        headers: { "Authorization": "bearer " + localStorage.getItem('user').token},
    };

    return fetch(`${config.apiUrl}/project/delete/${id}`, data).then(handleResponse)
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        // console.log("data",data)
        return data;
    });
}