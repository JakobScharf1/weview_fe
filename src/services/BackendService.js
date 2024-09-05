import axios from "axios";

class BackendService{
    async uploadFile(file){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
        const token = localStorage.getItem("token")
        const bodyData = new FormData()
        bodyData.append('file', file)
        bodyData.append('token', token)
        let requestURI = BACKEND_BASE_URL + "/dataUpload"
        console.log("Übermittelt an: " + requestURI)
        try {
            const response = await axios.post(requestURI, bodyData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log("Response: " + response.data)
            return response.data.data
        } catch (error) {
            console.error("Error uploading file: ", error)
            throw error
        }
    }

    async generateHTML(){
        const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
        let obj = {}
        obj.token = localStorage.getItem("token")
        obj.vidLink = localStorage.getItem("video_url")
        obj.picLink = localStorage.getItem("portrait_url")
        obj.weviewType = localStorage.getItem("view-type")
        obj.name = localStorage.getItem("name")
        obj.position = localStorage.getItem("position")
        obj.location = localStorage.getItem("location")
        obj.tel = localStorage.getItem("tel")
        obj.mail = localStorage.getItem("email")
        obj.linkedin = localStorage.getItem("linkedin")
        if(obj.weviewType === "job"){
            obj.pageTitle = localStorage.getItem("job_project")
            obj.region = localStorage.getItem("job_region")
            obj.contractType = localStorage.getItem("job_contracttype")
            obj.salary = localStorage.getItem("job_salary")
            obj.jobportalLink = localStorage.getItem("job_jobportal")
            obj.skills = localStorage.getItem("job_skills")
            obj.description = localStorage.getItem("job_descr")
        }

        let jsonString = JSON.stringify(obj)
        let requestURI = BACKEND_BASE_URL + "/generate"
        console.log("JSON send: ", jsonString)
        const response = await axios.post(requestURI, jsonString, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response.data.data;
    }
}


export default new BackendService();