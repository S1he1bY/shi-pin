import request from '../request/request';

export function getPlayDetail(id){
    return request ({
        url:'/article/' + id,
        method:'get'
    })
}

export function getSimilarVideo(id){
    return request ({
        url:'/article/' + id + '/next',
        method:'get'
    })
}

export function getVideoComment(id){
    return request ({
        url:`/comments?resource_id=${id}`,
        method:'get'
        // `/comments?resource_id=${id}&type=article&page=2`
    })
}