import request from '../request/request'

export function getShort(){
    return request ({
        url:'/home/cateRecommend?channel=home_channel_plot&cateName=剧情短片',
        method:'get'
    })
}