
//存储localStorage
export const setStorage=(keyword,content)=>{
    if(!keyword) return;
    return localStorage.setItem(keyword,JSON.stringify(content))
}

//获取localStorage
export const getStorage=(keyword)=>{
    if(!keyword) return;
    return JSON.parse(localStorage.getItem(keyword))
}

//删除localStorage
export const removeStorage=(keyword)=>{
    if(!keyword) return;
    return  localStorage.removeItem(keyword)
}