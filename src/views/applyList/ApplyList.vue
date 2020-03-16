<template>
  <div>
    <a-table :columns="columns" :dataSource="dataSource" :pagination="pagination" bordered>
      <span slot="action" slot-scope="text, record">
        <a v-if='record.isVerify===2' @click="examineGoods(record)">审核</a>
        <span v-else>已审核</span>
      </span>
    </a-table>
  </div>
</template>

<script>
import {getStorage} from '../../utils/storage'
const accessToken =getStorage('AccessToken')
let columns = [
  {
    title: "申请id",
    align: "center",
    dataIndex: "applyNeedsId"
  },
  {
    title: "商标注册号",
    align: "center",
    dataIndex: "regNo"
  },
  {
    title: "申请类型",
    align: "center",
    dataIndex: "applyType",
    customRender: function(text) {
      let res = "";
      if (text === 1) {
        res = "专家申请";
      }
      if (text === 2) {
        res = "普通商标需求";
      }
      if (text === 3) {
        res = "商标咨询";
      }
      return res;
    }
  },
  {
    title: "手机号",
    align: "center",
    dataIndex: "phone"
  },
  {
    title: "申请时间",
    align: "center",
    dataIndex: "createTime"
  },
  {
    title: "备注",
    align: "center",
    dataIndex: "remark"
  },
  {
    title: "审核时间",
    align: "center",
    dataIndex: "verifyTime"
  },
  {
    title: "用户名称",
    align: "center",
    dataIndex: "userName"
  },
  {
    title: "是否审核",
    align: "center",
    dataIndex: "isVerify",
    customRender: function(text) {
      let res = "";
      if (text === 1) {
        res = "审核";
      }
      if (text === 2) {
        res = "未审核";
      }
      return res;
    }
  },
  {
    title: "操作",
    align: "center",
    key: "action",
    dataIndex: "action",
    width: 200,
    scopedSlots: { customRender: "action" }
  }
];
export default {
  name: "ApplyList",
  data() {
    return {
      columns,
      dataSource: [],
      pagination:{
         current:1,
         total:null,
         pageSize:10,
         onChange:this.pageChange
       },
    };
  },
  mounted() {
    this.getApplyListData(1);
  },
  methods: {
    getApplyListData(page) {
      const headers = {
        accessToken: accessToken
      };
      const params = {
        page: page,
        pageSize:10
      };
      this.$axios({
        method: "get",
        url: "/api/trademark/admin/code/selectApplyNeeds",
        params: params,
        headers: headers
      })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.dataSource = res.data.data.list;
            this.pagination.total=res.data.data.total
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    examineGoods(record) {
      //审核
      console.log(record);
       const headers = {
        accessToken: accessToken
      }
       const params = {
       applyNeedsId:record.applyNeedsId
      };
      this.$axios({
        method:'post',
        url:"/api/trademark/admin/code/checkApplyNeeds",
        data:params,
        headers:headers
      }).then(res=>{
        console.log(res)
        if(res.data.success){
          this.$message.success('审核成功')
          this.getApplyListData(this.pagination.current)
        }
      }).catch(err=>{
        console.log(err)
      }) 
    },
     pageChange(page){
        console.log(page)
        this.pagination.current=page
        this.getApplyListData(page)
     },
  }
};
</script>

<style>
</style>