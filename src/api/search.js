import request from '../request/request';

//输入框搜索结果
export function getSearch(kw){
    return request ({
        url:'/search?kw=' +kw,
        method:'get'
    })
}

// 热门搜索关键词
export function getHotKw(){
    return request ({
        url:'/search/recommend_kws',
        method:'get'
    })
}

// 搜索页面的数据
export function searchIndex(){
    return request ({
        url:'/page/discovery',
        method:'get'
    })
}


export function searchType(id){
    return request ({
        url:`/articles?category_id=${id}`,
        method:'get'
    })
}