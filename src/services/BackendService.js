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
        try {
            axios.post(requestURI, bodyData, headers).then((response) => {
                if(response.status === 200){
                    return true;
                } else {
                    return false;
                }
            })
        } catch (error) {
            return false;
        }
    }

    async uploadFile(file, token, email){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
        const bodyData = new FormData()
        bodyData.append('file', file)
        bodyData.append('token', token)
        bodyData.append('email', email)
        let requestURI = BACKEND_BASE_URL + "/dataUpload"

        try {
            const response = await axios.post(requestURI, bodyData);
            if (response.status === 200){
                console.log("response data: ", response)
                const json = JSON.parse(response.data.data)
                if (file.type.startsWith("video")){
                    localStorage.setItem("view_id", json.view_id)
                    localStorage.setItem("video_url", json.vid_url)
                    localStorage.setItem("gifLink", json.gif_url)
                } else if(file.type.startsWith("image")){
                    localStorage.setItem("portrait_url", json.url)
                }
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new error;
        }
    }

    async generateHTML(token, email){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
        let obj = {}
        obj.token = token
        obj.view_id = localStorage.getItem("view_id")
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

    async getUserPortrait(email, token) {
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
            console.log("Portrait URL: ", json.picLink)
        }
    }

    async getUserWeviews(email, token) {
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
        let requestURI = BACKEND_BASE_URL + "/user/" + email + "/views"
        const response = await axios.get(requestURI, {
            headers: {
                'Authorization': token
            },
        })
        if(response.status === 200){
            const json = JSON.parse(response.data.data)
            console.log(JSON.parse(json.viewArray.toString()))
            return json.viewArray
        }
    }

    async deleteView(token, id){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
        let requestURI = BACKEND_BASE_URL + "/views/" + id
        const response = await axios.delete(requestURI, {
            headers: {
                'Authorization': token
            }
        })
        return response.status === 200;
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
            console.log("User Data: ", json)

            const params = ["name", "position", "location", "tel", "linkedin"]
            params.forEach(key => {
                localStorage.setItem(key, json[key] ?? "");
            });

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
            console.log("User stored in DB successfully.")
        } else {
            console.error("The server responded with a ", response.status)
        }

    }
}

export default new BackendService();