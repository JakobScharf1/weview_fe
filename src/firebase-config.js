import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from "axios";
import router from "@/router";

function login() {

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result => {
        const token = result.user.multiFactor.user.accessToken;
        let url = process.env.VUE_APP_BACKEND_URL + "/private/saveUser";
        let requestBody = {
            token: token,
            email: result.user.email.toString(),
        }
        localStorage.clear();
        localStorage.setItem("token", token);
        localStorage.setItem("email", result.user.email.toString());

        try {
            axios.post(url, requestBody)
                .then(response => {
                    if (response.status === 200) {
                        const permissionUrl = process.env.VUE_APP_BACKEND_URL + "/private/getPermission/" + requestBody.email;
                        axios.get(permissionUrl)
                            .then(response => {
                                localStorage.setItem("permission", response.data.toString());
                                if (response.data.toString() !== "0" || response.data.toString() !== "-1") {
                                    router.push("/home");
                                }
                            })
                    }
                })
        } catch(error) {
            console.log("Error: ", error)
        }

    }));
}

function logout() {
    router.push("/login")
    localStorage.clear();
}

export { login };
export { logout };