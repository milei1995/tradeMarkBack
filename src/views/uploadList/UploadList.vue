<!-- 组件说明 -->
<template>
  <div class="uploadList">
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      :rowKey="(record) => record.registerId"
      bordered
      :scroll="{ x: 2000 }"
    >
      <span slot="imgSlot" slot-scope="text, record">
        <a-popover title="图片详情">
          <template slot="content">
            <img :src="record.tmImg" style="width:200px;height:200px;" />
          </template>
          <img :src="record.tmImg" style="width:40px;height:40px;" />
        </a-popover>
      </span>
      <span slot="action" slot-scope="text, record">
        <span v-if="record.verifyStatus === 1">已审核</span>
        <a v-if="record.verifyStatus === 0" @click="examineUpload(record)"
          >审核</a
        >
        <a-divider type="vertical" />
      </span>
    </a-table>
  </div>
</template>

<script>
import { getStorage } from "../../utils/storage";
const accessToken = getStorage("AccessToken");
const columns = [
  {
    title: "注册号",
    width: "80px",
    align: "center",
    fixed: "left",
    dataIndex: "regNo",
  },
  {
    title: "商标名称",
    width: "80px",
    align: "center",
    fixed: "left",
    dataIndex: "tmName",
  },
  {
    title: "商标分类",
    width: "80px",
    align: "center",
    dataIndex: "intCls",
  },
  {
    title: "商标图片",
    dataIndex: "tmImg",
    align: "center",
    width: "100px",
    scopedSlots: { customRender: "imgSlot" },
  },
  {
    title: "具体服务",
    align: "center",
    dataIndex: "serviceItems",
    width: "1000px",
  },
  {
    title: "商标状态",
    align: "center",
    dataIndex: "currentStatus",
    customRender: function(text) {
      let res = "";
      if (text == "1") {
        res = "商标审查";
      }
      if (text == "2") {
        res = "商标形式审查";
      }
      if (text == "3") {
        res = "商标异议";
      }
      if (text == "4") {
        res = "商标有效注册";
      }
      return res;
    },
  },
  {
    title: "备注",
    align: "center",
    dataIndex: "remark",
    width: "200px",
  },
  {
    title: "商标价格",
    align: "center",
    dataIndex: "tmPrice",
    width: "100px",
  },
  {
    title: "操作",
    align: "center",
    fixed: "right",
    dataIndex: "action",
    width: 150,
    scopedSlots: { customRender: "action" },
  },
];
//import x from ''
export default {
  components: {},
  data() {
    return {
      columns,
      dataSource: [],
      pagination: {
        current: 1,
        total: null,
        pageSize: 8,
        onChange: this.pageChange,
      },
    };
  },
  computed: {},
  methods: {
    getUploadList(page) {
      const headers = {
        accessToken: accessToken,
      };
      const params = {
        page: page,
        pageSize: 8,
        isAdminType: 1,
      };
      this.$axios({
        method: "post",
        url:
          "/api/trademark/carefullyChosenTrademark/queryCarefullyChosenTrademarkList",
        data: params,
        headers: headers,
      }).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.pagination.total = res.data.data.total;
          this.dataSource = res.data.data.list;
        }
      });
    },
    examineUpload(record) {
      const headers = {
        accessToken: accessToken,
      };
      const params = {
        trademarCarefullyChosenId: record.trademarCarefullyChosenId,
      };
      this.$axios({
        method: "post",
        url: "/api/trademark/admin/code/checkCarefullyChosenTrademark",
        data: params,
        headers: headers,
      }).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.$message.success("审核成功");
          this.getUploadList(1);
        }
      });
    },
    pageChange(page) {
      this.pagination.current = page;
      this.getUploadList(page);
    },
  },
  mounted() {
    this.getUploadList(1);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="scss" src=""></style>
