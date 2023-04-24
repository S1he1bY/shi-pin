import request from '../request/request'

export function getNotes(){
    return request ({
        url:'/notes',
        method:'get',
        // withCredentials: true
    })
}

export function getNoteContent(id){
    return request ({
        url:'/note/' + id,
        method:'get',
        // withCredentials: true
    })
}

export function getNoteCommment(id){
    return request ({
        url:'note/' + id + '/comment',
        method:'get',
        // withCredentials: true
    })
}