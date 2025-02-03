import axios from "axios";

async function checkDb(token, email){

    const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
    let requestURI = BACKEND_BASE_URL + "/db/getuserdata"
    const params = {
        token: token,
        email: email,
    }
    console.log("Übermittelt an: " + requestURI)

    try {
        const response = await axios.get(requestURI, { params })

        //Response: No Content, User not existing
        if(response.status === 204){
            console.error("User is not existing")
            return "exit"
        }

        //Response: Email is found but no other data is existing
        if(response.status === 202){
            console.log("Email is found but no other data is existing")
            return null
        }

        //Response: Matching data is found
        if(response.status === 200){
            console.log("Found matching data")
            const parsed = JSON.parse(response.data.data)[0]
            localStorage.setItem("name", decodeURIComponent(parsed.name))
            localStorage.setItem("location", decodeURIComponent(parsed.location))
            localStorage.setItem("tel", decodeURIComponent(parsed.tel))
            localStorage.setItem("linkedin", decodeURIComponent(parsed.linkedin))
            localStorage.setItem("position", decodeURIComponent(parsed.position))
            console.log("JSON: ", parsed)
            return parsed
        }

    } catch (error) {
        console.error("Error accessing db data: ", error)
        throw error
    }
}

async function saveUserData(token, email){
    const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
    let requestURI = BACKEND_BASE_URL + "/db/saveuserdata"
    const params = {
        token: token,
        email: email,
        name: localStorage.getItem("name"),
        position: localStorage.getItem("position"),
        location: localStorage.getItem("location"),
        tel: localStorage.getItem("tel"),
        linkedin: localStorage.getItem("linkedin")
    }
    console.log("Übermittelt an: " + requestURI)
    console.log("Params: " + params)

    try {
        const response = await axios.post(requestURI, params)
        if(response.status === 200){
            console.log("User " + localStorage.getItem("name") + " stored in DB successfully.")
        } else {
            console.error("The db or be request hasn't respond with a 200.")
        }
    } catch (error) {
        console.log("Error while saving DB Data: ", error)
    }
}

export { checkDb, saveUserData }