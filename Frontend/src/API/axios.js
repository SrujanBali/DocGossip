import axios from "axios"

const base_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: base_URL,
    headers: {
        "Content-Type" : "application/json"
    }
})

let getTokenFn = null;

export const setTokenGetter = (fn) => {
    getTokenFn = fn
}

api.interceptors.request.use(
    async(config) => {
        if (getTokenFn) {
            try {
                const token = await getTokenFn()
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error("Error while acquiring token for request", error)

                if (error.error === "login_required"){
                    console.warn("user session expired or missing. Redirecting to login....")
                }
            }
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default api;