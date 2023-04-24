import request from '../request/request'

export function getHot(){
    return request ({
        url:'/home/hot',
        method:'get'
    })
}