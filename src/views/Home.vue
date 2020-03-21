<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height:100%;">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1" @click="go('applyList')">
          <a-icon type="user" />
          <span>查看申请列表</span>
        </a-menu-item>
         <a-menu-item key="2" @click="go('orderList')">
          <a-icon type="user" />
          <span>查看订单列表</span>
        </a-menu-item>
         <a-menu-item key="3" @click="go('userList')">
          <a-icon type="user" />
          <span>用户订单列表</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <span style="float: right; margin-right: 2rem">
          <span style="margin-right: 1rem">您好,{{userName}}</span>
          <a @click="logout">
            <a-icon type="logout" />登出
          </a>
        </span>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { getStorage,removeStorage } from "../utils/storage";
export default {
  data() {
    return {
      collapsed: false,
      userToken: "",
      userName:""
    };
  },
  created() {
    const accessToken = getStorage("AccessToken");
    const userName=getStorage("UserName")
    if (!accessToken) {
      this.$message.error("登录失效, 请重新登录!");
      this.$router.push("/login");
    } else {
      this.userToken = accessToken;
      this.userName=userName
    }
  },
  methods: {
    go(name) {
      this.$router.push({ name: name });
    },
    logout(){
      removeStorage('AccessToken')
      this.$router.push("/login");
    }
  }
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>