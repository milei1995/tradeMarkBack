<template>
  <div>
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      :rowKey="record => (record.registerId)"
      bordered
    >
      <span slot="action" slot-scope="text, record">
        <a @click="searchDetail(record)">查看详情</a>
        <a-divider type="vertical" />
        <a v-if="record.isVerify===2" @click="examineOrder(record)">审核</a>
        <span v-else>已审核</span>
      </span>
    </a-table>
    <a-modal title="订单详情" :visible="visible" width="500px" :footer="null" @cancel="handleCancel">
      <div class="detail">
        <span>1.用户信息:</span>
        <div class="detail1">
          <div class="detail1-part">用户名：{{currentRecord.realName}}</div>
          <div class="detail1-part">微信号：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">QQ号：{{currentRecord.qqAccount}}</div>
          <div class="detail1-part">登陆手机号：{{currentRecord.phone}}</div>
        </div>
        <span>2.商标信息</span>
         <div class="detail2">
          <div class="detail1-part">注册商标名称：{{currentRecord.realName}}</div>
          <div class="detail1-part">商标说明：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">商标图片：{{currentRecord.qqAccount}}</div>
          <div class="detail1-part">商标类型：{{currentRecord.phone}}</div>
          <div class="detail1-part">订单号：{{currentRecord.phone}}</div>
        </div>
        <span>3.具体购买商品</span>
         <div class="detail3">
          <div class="detail1-part">类别名称：{{currentRecord.realName}}</div>
          <div class="detail1-part">具体商品/服务：{{currentRecord.wxAccount}}</div>
        </div>
         <span>4.企业申请人信息</span>
         <div class="detail3">
          <div class="detail1-part">申请类型：{{currentRecord.realName}}</div>
          <div class="detail1-part">企业名称：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">主体资格证明文件：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">省市区：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">营业执照地址：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">联系人：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">联系人电话：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">传真：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">联系人邮箱：{{currentRecord.wxAccount}}</div>
        </div>
        <span>5.用户申请人信息</span>
         <div class="detail3">
          <div class="detail1-part">申请用户名称：{{currentRecord.realName}}</div>
          <div class="detail1-part">身份证：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">身份证正面：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">身份证反面：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">主体资格证明文件：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">省市区：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">身份证地址：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">联系人：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">联系人手机号：{{currentRecord.wxAccount}}</div>
          <div class="detail1-part">联系人邮箱：{{currentRecord.wxAccount}}</div>
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
      currentRecord: {} //当前选中的订单
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
      this.currentRecord = record;
      this.showModal();
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
    examineOrder(record) {
      //审核订单
      //审核
      console.log(record);
      const headers = {
        accessToken: accessToken
      };
      const params = {
        orderNo: record.orderNo
      };
      this.$axios({
        method: "post",
        url: "/api/trademark/admin/code/checkOrder",
        data: params,
        headers: headers
      })
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.$message.success("审核成功");
            this.getOrderListData(this.pagination.current);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style  scoped>
.detail1,.detail2,.detail3 {
  width: 400px;
  border-top: 1px solid #000000;
  border-left:1px solid #000000;
  border-right:1px solid #000000;
}
.detail1-part{
  width:100%;
  height:20px;
  line-height: 20px;
  border-bottom:1px solid black;
}
</style>