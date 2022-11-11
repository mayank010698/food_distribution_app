import axios from 'axios'
import { CLIENT_URL } from './../const'

export const registerApi = async(data)=> {
    return
    
    const result = await axios.post(`${CLIENT_URL}/api/register`,data)

    return result
}

export const loginApi = async(data)=> {
    return
    const result = await axios.post(`${CLIENT_URL}/api/login`,data)
    // JSON.stringify, JSON.parse
    
    localStorage.setItem('user', JSON.stringify(result.data.user))
    localStorage.setItem('token', result.data.token)
    return result
}

export const secureRequest = async (data) => {
    return
    const sendData = {
        note_title : 'note_title by rugzzz',
        user_id : 3
    }
    const headers = {
        headers:{
          'Authorization':''+localStorage.token,
        //   'token':''+localStorage.token,
        //   'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const result= await axios.post(`${CLIENT_URL}/api/put_note`,sendData,headers)
    return result
}