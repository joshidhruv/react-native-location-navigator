import axios from "axios";
import { store } from '../store';
var TOKEN = '';
store.subscribe(listener);
function select(state) {
    return state.auth.token
}
function listener() {
    let token = select(store.getState())
    axios.defaults.headers.common['Authorization'] = token;
    TOKEN = token;
}
const fetchClient = () => {
    const defaultOptions = {
        baseURL: 'http://127.0.0.1:3000',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.confirm-api.v1"
        }
    }
    const instance = axios.create(defaultOptions);
    instance.interceptors.request.use((config) => {
        const token = TOKEN;
        config.headers.Authorization = token;
        return config;
    });
    return instance;
}
export default fetchClient();