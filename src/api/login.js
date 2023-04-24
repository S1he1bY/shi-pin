import request from '../request/request';

// https://note.youdao.com/ynoteshare/index.html?id=b136e8254d0ff3dd48958af8fff8719e&type=note&_time=1679465327106

export function getLogin(phone,password){
    return request ({
        url:'http://www.kangliuyong.com:10002/login',
        method:'post',
        data:{
            appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
            password: password,
            phone: phone
        },
        withCredentials: true
    })
}

export function register(nickname,phone,password){
    return request({
        url:"http://www.kangliuyong.com:10002/register",
        method:"POST",
        data:{
            appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
            password,
            phone,
            nickname
        },
       withCredentials: true
    })
}