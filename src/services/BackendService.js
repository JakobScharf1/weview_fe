import axios from "axios";

class BackendService{

    async verify(token){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
        const bodyData = new FormData()
        bodyData.append('token', token)
        let requestURI = BACKEND_BASE_URL + "/private/verify"
        axios.post(requestURI, bodyData).then((response) => {
            console.log("verify response: ", response.data)
            if(response.status === 200){
                return true;
            } else {
                return false;
            }
        })
    }

    async uploadFile(file){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
        const token = this.$cookies.get("token")
        const bodyData = new FormData()
        bodyData.append('file', file)
        bodyData.append('token', token)
        let requestURI = BACKEND_BASE_URL + "/dataUpload"

        return axios.post(requestURI, bodyData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log("DataUpload Response: " + response)
            return response.data
        }).catch((error) => {
            console.error("Error uploading file: ", error);
            throw error;
        });
    }

    async generateHTML(){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
        let obj = {}
        obj.token = this.$cookies.get("token")
        obj.vidLink = localStorage.getItem("video_url")
        obj.picLink = localStorage.getItem("portrait_url")
        obj.weviewType = localStorage.getItem("view-type")
        obj.name = localStorage.getItem("name")
        obj.position = localStorage.getItem("position")
        obj.location = localStorage.getItem("location")
        obj.tel = localStorage.getItem("tel")
        obj.mail = this.$cookies.get("email")
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

    async generateGIF(){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL

        let obj = {}
        obj.token = this.$cookies.get("token")
        obj.vidLink = localStorage.getItem("video_url")
        let jsonString = JSON.stringify(obj)
        let requestURI = BACKEND_BASE_URL + "/gif/generate"
        const response = await axios.post(requestURI, jsonString, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log("Response generateGIF: " + response.data)

        return null;
    }
}


export default new BackendService();