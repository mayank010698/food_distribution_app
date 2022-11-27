import axios from 'axios'
import { CLIENT_URL } from './../const'

export const registerApi = async(data)=> {
    const result = await axios.post(`${CLIENT_URL}/register`,data)

    return result
}

export const loginApi = async(data)=> {
    // return
    console.log("Will call loginApi next")
    const result = await axios.post(`${CLIENT_URL}/login`,data)
    console.log("Just called loginApi")
    // JSON.stringify, JSON.parse
    const userRow = result.data.response.data.rows
    console.log(userRow)
    localStorage.setItem('UserID', userRow[0][0])

    // localStorage.setItem('token', result.data.token)
    return result
}

export const foodOptionsApi = async()=> {
    const result = await axios.post(`${CLIENT_URL}/foodOptions`)
    return result.data.response.data.rows
}

export const getFoodWastageData = async(data)=> {
    console.log("calling getFoodWaste now")
    const result = await axios.post(`${CLIENT_URL}/getWaste`, data)
    return result.data.response.data
}

export const getSelfOffers = async(data)=> {
    const result = await axios.post(`${CLIENT_URL}/getOffers`, data)
    return result.data.response.data
}

export const getOffersAll = async(data)=> {
    const result = await axios.post(`${CLIENT_URL}/getOffersAll`)
    return result.data.response.data
}

// check
export const getOfferDetail = async(data)=> {
    const result = await axios.post(`${CLIENT_URL}/getOfferDetail`, data)
    console.log("result")
    console.log(result.data.data)
    return result.data.data
}

export const getFeedbacksApi = async(data)=> {
    const result = await axios.post(`${CLIENT_URL}/feedback`,data)
    return result.data.response.data
}

export const deleteFeedback = async(data) => {
    const result = await axios.post(`${CLIENT_URL}/deleteFeedback`,data)
    console.log(result)
    return result.data.response
}

export const placeOrder = async(data)=> {
    console.log("calling submitOrder now")
    const result = await axios.post(`${CLIENT_URL}/placeOrder`, data)
    return result.data
}

export const submitFoodForm = async(data)=> {
    console.log("calling getFoodWaste now")
    const result = await axios.post(`${CLIENT_URL}/insertItem`, data)
    return result.data.response.data
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