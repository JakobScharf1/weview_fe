import axios from "axios";

class BackendService{

    async verify(token){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
        const bodyData = new FormData()
        bodyData.append('token', token)
        let requestURI = BACKEND_BASE_URL + "/private/verify"
        let headers = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.post(requestURI, bodyData, headers).then((response) => {
            console.log("verify response: ", response.data)
            if(response.status === 200){
                return true;
            } else {
                return false;
            }
        })
    }

    async uploadFile(file, token){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
        const bodyData = new FormData()
        bodyData.append('file', file)
        bodyData.append('token', token)
        let requestURI = BACKEND_BASE_URL + "/dataUpload"

        return axios.post(requestURI, bodyData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if(file.type.startsWith("video")){
                localStorage.setItem("vidId", response.headers.get("id"))
                localStorage.setItem("video_url", response.headers.get("url"))
                console.log("uploadFile response: ", response.data)
            } else if(file.type.startsWith("image")){
                localStorage.setItem("portrait_url", response.headers.get("url"))
            }
            return response.data.success
        }).catch((error) => {
            console.error("Error uploading file: ", error);
            throw error;
        });
    }

    async generateHTML(token, email){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
        let obj = {}
        obj.token = token
        obj.vidLink = localStorage.getItem("video_url")
        obj.picLink = localStorage.getItem("portrait_url")
        obj.weviewType = localStorage.getItem("view-type")
        obj.name = localStorage.getItem("name")
        obj.position = localStorage.getItem("position")
        obj.location = localStorage.getItem("location")
        obj.tel = localStorage.getItem("tel")
        obj.mail = email
        obj.linkedin = localStorage.getItem("linkedin")
        if(obj.weviewType === "job"){
            obj.pageTitle = localStorage.getItem("job_project")
            obj.region = localStorage.getItem("job_region")
            obj.contractType = localStorage.getItem("job_contracttype")
            obj.salary = localStorage.getItem("job_salary")
            obj.jobportalLink = localStorage.getItem("job_jobportal")
            obj.skills = localStorage.getItem("job_skills")
            obj.description = localStorage.getItem("job_descr")
        } else if(obj.weviewType === "personal"){
            obj.branche = localStorage.getItem("personal_branche")
            obj.region = localStorage.getItem("personal_region")
            obj.contractType = localStorage.getItem("personal_contracttype")
            obj.description = localStorage.getItem("personal_descr")
        } else if(obj.weviewType === "candidate"){
            obj.firstName = localStorage.getItem("candidate_name")
            obj.region = localStorage.getItem("candidate_region")
            obj.contractType = localStorage.getItem("candidate_contracttype")
            obj.skills = localStorage.getItem("candidate_skills")
            obj.description = localStorage.getItem("candidate_descr")
        }

        let jsonString = JSON.stringify(obj)
        let requestURI = BACKEND_BASE_URL + "/generate"
        console.log("JSON sent: ", jsonString)
        const response = await axios.post(requestURI, jsonString, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data.data;
    }

    async generateGIF(token){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL

        const formData = new FormData()
        formData.append("token", token)
        formData.append("fileId", localStorage.getItem("vidId"))

        let requestURI = BACKEND_BASE_URL + "/gif/generate"
        const response = await axios.post(requestURI, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log("Response generateGIF: " + response.data)


        return null;
    }

    async getUserData(email, token){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL

        let requestURI = BACKEND_BASE_URL + "/user/" + email

        const response = await axios.get(requestURI, {
            headers: {
                'Authorization': token
            }
        })

        if(response.status === 200){
            const json = JSON.parse(response.data.data)
            localStorage.setItem("portrait_url", json.picLink)
            localStorage.setItem("name", json.name)
            localStorage.setItem("position", json.position)
            localStorage.setItem("location", json.location)
            localStorage.setItem("tel", json.tel)
            localStorage.setItem("linkedin", json.linkedin)
        }
    }

    async saveUserData(email, token){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
        let requestURI = BACKEND_BASE_URL + "/user/" + email

        let obj = {}
        obj.picLink = localStorage.getItem("portrait_url")
        obj.name = localStorage.getItem("name")
        obj.position = localStorage.getItem("position")
        obj.tel = localStorage.getItem("tel")
        obj.location = localStorage.getItem("location")
        obj.linkedin = localStorage.getItem("linkedin")

        let jsonString = JSON.stringify(obj)
        const response = await axios.post(requestURI, jsonString, {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        })

        if(response.status === 200){
            console.log("User " + localStorage.getItem("name") + " stored in DB successfully.")
        } else {
            console.error("The server responded with a ", response.status)
        }

    }
}


export default new BackendService();