<template>
  <div>
    <a-table :columns="columns" :dataSource="dataSource" :pagination="pagination"   :rowKey="record => (record.registerId)" bordered>
      <span slot="action" slot-scope="text, record">
        <a @click="searchDetail(record)">查看详情</a>
        <a-divider type="vertical"/>
       <a v-if="record.isVerify===2" @click="examineOrder(record)">审核</a>
        <span v-else>已审核</span>
      </span>
    </a-table>
    <a-modal
      title="订单详情"
      :visible="visible"
      width="900px"
      :footer="null"
      @cancel="handleCancel"
    >
      <div class='detail'>
         <div class='detail1'>
            订单号：{{currentRecord.orderNo}}
            用户名称：{{currentRecord.realName}}
            用户手机号：{{currentRecord.phone}}
            金额：{{currentRecord.totalPrice}}
            <p>订单创建时间：{{currentRecord.createTime}}</p>
         </div>
         <div class="detail2">
             <span>商品服务信息:</span>
             <div class='goodsInfoItem' v-for="(item,index) in currentRecord.orderGoodsList" :key="index">
                 <div>第{{item.classifyNum}}类---{{item.classifyName}}</div>
                 <div><span v-for="(item2,index2) in item.goods" :key="index2">{{item2}};</span></div>
             </div>
         </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { getStorage } from "../../utils/storage";
const accessToken = getStorage("AccessToken");
let columns = [
  {
    title: "注册商标名称",
    align: "center",
    dataIndex: "trademarkName"
  },
  {
    title: "商标说明",
    align: "center",
    dataIndex: "trademarkExplain"
  },
  {
    title: "商标图片",
    align: "center",
    dataIndex: "trademarkImage",
    scopedSlots: { customRender: "goodsImg" }
  },
  {
    title: "商标类型",
    align: "center",
    dataIndex: "trademarkStatus",
    customRender: function(text) {
      let res = "";
      if (text === 1) {
        res = "文字商标";
      }
      if (text === 2) {
        res = "图形商标";
      }
      if (text === 3) {
        res = "文字图形组合商标 ";
      }
      return res;
    }
  },
  {
    title: "商标颜色",
    align: "center",
    dataIndex: "trademarkColor",
    customRender: text => {
      let res = "";
      if (text === 1) {
        res = "黑白";
      }
      if (text === 2) {
        res = "彩色";
      }
      return res;
    }
  },
  {
    title: "支付状态",
    align: "center",
    dataIndex: "payStatus",
    customRender: text => {
      let res = "";
      if (text === 0) {
        res = "未支付";
      }
      if (text === 1) {
        res = "支付成功";
      }
      if (text === 2) {
        res = "退款";
      }
      return res;
    }
  },
  {
    title: "支付方式",
    align: "center",
    dataIndex: "payType",
    customRender: text => {
      let res = "";
      if (text === 1) {
        res = "微信";
      }
      if (text === 2) {
        res = "支付宝";
      }
      return res;
    }
  },
  {
    title: "审核状态",
    align: "center",
    dataIndex: "isVerify",
    customRender: text => {
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
  name: "OrderList",
  data() {
    return {
      columns,
      dataSource: [],
      pagination: {
        current: 1,
        total: null,
        pageSize: 10,
        onChange: this.pageChange
      },
      visible: false,
      confirmLoading: false,
      currentRecord:{}//当前选中的订单
    };
  },
  mounted() {
    this.getOrderListData(1);
  },
  methods: {
    getOrderListData(page) {
      const headers = {
        accessToken: accessToken
      };
      const params = {
        page: page,
        pageSize: 10
      };
      this.$axios({
        method: "get",
        url: "/api/trademark/admin/code/selectOrderList",
        params: params,
        headers: headers
      })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.dataSource = res.data.data.list;
            this.pagination.total = res.data.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchDetail(record) {
      console.log(record);
      this.currentRecord=record
      this.showModal()
    },
    pageChange(page) {
      console.log(page);
      this.pagination.current = page;
      this.getOrderListData(page);
    },
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    examineOrder(record){//审核订单
        //审核
      console.log(record);
       const headers = {
        accessToken: accessToken
      }
       const params = {
        orderNo:record.orderNo
      };
      this.$axios({
        method:'post',
        url:"/api/trademark/admin/code/checkOrder",
        data:params,
        headers:headers
      }).then(res=>{
        console.log(res)
        if(res.data.success){
          this.$message.success('审核成功')
          this.getOrderListData(this.pagination.current)
        }
      }).catch(err=>{
        console.log(err)
      }) 
    }
  }
};
</script>

<style>
</style>