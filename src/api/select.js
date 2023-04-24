import request from '../request/request';

export function getSelection(){
    return request ({
        url:'/home/selection',
        method:'get'
    })
}