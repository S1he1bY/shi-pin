import request from '../request/request'

export function getUserInfo(id){
    return request ({
        url:`/user/${id}`,
        method:'get',
        // withCredentials: true
    })
}