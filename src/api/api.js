import {
    instance
} from "./instance";

/**
 * 获取申请列表的数据
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getApplyList=(params)=>{
    return instance.get('/trademark/admin/code/selectApplyNeeds',{params:params})
}