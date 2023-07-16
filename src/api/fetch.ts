import axios from "axios"

type model = 'GET' | 'POST' | 'PUT' | 'DELETE'
const fetchAPI = async (url: string, token: string, type: model, params?: any) => {
    switch (type) {
        case 'GET':
            return await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(data => {
                console.info("<<<<<<<<<<<<<< HEADERS >>>>>>>>>>>>>", data.headers)
                console.info("<<<<<<<<<<<<<< CONFIG >>>>>>>>>>>>>", data.config)
                console.info("<<<<<<<<<<<<<< DATA >>>>>>>>>>>>>", data.data)
                return data.data
            }).catch(error => {
                console.info("<<<<<<<<<<<<<< ERROR >>>>>>>>>>>>>", error)
                alert("Check Console Log")
            })
        case 'POST':
            return await axios.post(url, params, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(data => {
                console.info("<<<<<<<<<<<<<< HEADERS >>>>>>>>>>>>>", data.headers)
                console.info("<<<<<<<<<<<<<< CONFIG >>>>>>>>>>>>>", data.config)
                console.info("<<<<<<<<<<<<<< DATA >>>>>>>>>>>>>", data.data)
                return data.data
            }).catch(error => {
                switch (error.response && error.response.status) {
                    case 400:
                        console.info("<<<<<<<<<<<<<< 400 >>>>>>>>>>>>>", error.response.config)
                        return error.response.data
                    case 401:
                        console.info("<<<<<<<<<<<<<< 401 >>>>>>>>>>>>>", error.response.config)
                        return error.response.data
                    default:
                        console.info("<<<<<<<<<<<<<< ERROR >>>>>>>>>>>>>", error)
                        break;
                }

            })
        default:
            break;
    }
}

export default fetchAPI