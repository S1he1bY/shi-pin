import request from '../request/request'

export function getRecommend(){
    return request ({
        url:'/home/recommend',
        method:'get'
    })
}