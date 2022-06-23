import { BASE_URL, FLICKR_KEY } from "../../env"
import axios from 'axios';
import mock from './__mock'


export const getApi = async (url, params = {}) => {
    // console.log("url", url)
    // console.log("params", params)
    let query = Object.keys(params)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
             .join('&');
    // https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1a89a1354ef0e453f58af9f8756102f0&text=abc&format=json&nojsoncallback=1
    // axios.get(BASE_URL + url, {
    //     params: params,
    //     headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         "Access-Control-Allow-Origin" : "*"
    //     }
    // })
    return mock
    fetch(BASE_URL + url + query, {
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
        }
    })
    .then(response => response.json())
    .then(res => {
        console.log("res api",mock)
        return res})
    .catch(error => {
        console.log("error ===> ", error)
    })

}
