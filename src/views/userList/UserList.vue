<template>
  <div>
    <a-table :columns="columns" :dataSource="dataSource" :pagination="pagination" bordered>
    </a-table>
  </div>
</template>

<script>
import {getStorage} from '../../utils/storage'
const accessToken =getStorage('AccessToken')
let columns = [
   {
    title: "序号",
    align: "center",
    dataIndex: "userId"
  },
  {
    title: "真实姓名",
    align: "center",
    dataIndex: "realName"
  },
  {
    title: "性别",
    align: "center",
    dataIndex: "userSex",
    customRender: function(text) {
      let res = "";
      if (text === 1) {
        res = "男";
      }
      if (text === 2) {
        res = "女";
      }
      if (text === 3) {
        res = "未知";
      }
      return res;
    }
  },
  {
    title: "微信号",
    align: "center",
    dataIndex: "wxAccount",
  },
  {
    title: "手机号",
    align: "center",
    dataIndex: "phone"
  },
  {
    title: "注册时间",
    align: "center",
    dataIndex: "createTime"
  },
  {
    title: "QQ号",
    align: "center",
    dataIndex: "qqAccount"
  },
  {
    title: "e-mail",
    align: "center",
    key: "action",
    dataIndex: "email",
  },
  {
    title: "上次登录时间",
    align: "center",
    dataIndex: "loginTime"
  },
];
export default {
  name: "UserList",
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
    this.getUserListData(1);
  },
  methods: {
    getUserListData(page) {
      const headers = {
        accessToken: accessToken
      };
      const params = {
        page: page,
        pageSize:10
      };
      this.$axios({
        method: "get",
        url: "/api/trademark/admin/code/userList",
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
     pageChange(page){
        console.log(page)
        this.pagination.current=page
        this.getUserListData(page)
     },
  }
};
</script>

<style>
</style>