import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from "axios";
/*
export function login() {

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result => {
        const token = result.user.multiFactor.user.accessToken;
        let url = process.env.VUE_APP_BACKEND_URL + "/private/saveUser";
        let requestBody = {
            token: token,
            email: result.user.email.toString(),
        }
        localStorage.setItem("token", token)
        localStorage.setItem("email", result.user.email.toString())
        let header = {
                headers: {
                    "Content-Type": "application/json"
                }
        }

        try {
            axios.post(url, requestBody, header)
                .then(response => {
                    console.log("signIn response: ", response.data)
                    if (response.status === 200) {
                        const permissionUrl = process.env.VUE_APP_BACKEND_URL + "/private/getPermission/" + requestBody.email;
                        axios.get(permissionUrl)
                            .then(response => {
                                const parsedJson = JSON.parse(response.data.data)
                                localStorage.setItem("permission", parsedJson.permission)
                            })
                    }
                })
        } catch(error) {
            console.log("Error: ", error)
        }
    }));
}*/

export function login() {
    return new Promise((resolve, reject) => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(result => {
            const token = result.user.multiFactor.user.accessToken;
            const url = process.env.VUE_APP_BACKEND_URL + "/private/saveUser";
            const requestBody = {
                token: token,
                email: result.user.email.toString(),
            };

            localStorage.setItem("token", token);
            localStorage.setItem("email", result.user.email.toString());

            const header = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            axios.post(url, requestBody, header)
                .then(response => {
                    if (response.status === 200) {
                        const permissionUrl = process.env.VUE_APP_BACKEND_URL + "/private/getPermission/" + requestBody.email;
                        axios.get(permissionUrl)
                            .then(response => {
                                const parsedJson = JSON.parse(response.data.data);
                                localStorage.setItem("permission", parsedJson.permission);
                                resolve(parsedJson.permission); // Rückgabe des Werts über resolve
                            })
                            .catch(error => {
                                console.log("Error fetching permission: ", error);
                                reject(error); // Fehler weitergeben
                            });
                    } else {
                        resolve("0");
                    }
                })
                .catch(error => {
                    console.log("Error saving user: ", error);
                    reject(error); // Fehler weitergeben
                });
        }).catch(error => {
            console.log("Error signing in: ", error);
            reject(error); // Fehler weitergeben
        });
    });
}
