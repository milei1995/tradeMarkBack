<template>
    <div class="login-page">
        <a-row>
            <a-col :offset="9" :span="6">
                <a-card :bordered="false" class="login-box-card" style="width: 100%">
                    <template slot="title" style="align:center">
                        <span class="title">后台登录</span>
                    </template>
                    <a-form :form="form" class="user-layout-login" id="formLogin" ref="formLogin">
                        <a-form-item>
                            <a-input
                                    placeholder="请输入帐户名"
                                    size="large"
                                    type="text"
                                    v-decorator="['username',validatorRules.username]">
                                <a-icon :style="{ color: 'rgba(0,0,0,.25)' }" slot="prefix" type="user"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input
                                    autocomplete="false"
                                    placeholder="密码"
                                    size="large"
                                    type="password"
                                    v-decorator="['password',validatorRules.password]">
                                <a-icon :style="{ color: 'rgba(0,0,0,.25)' }" slot="prefix" type="lock"/>
                            </a-input>
                        </a-form-item>
                    </a-form>
                    <a-form-item style="margin-top:24px">
                        <a-button
                                :disabled="loginBtn"
                                :loading="loginBtn"
                                @click.stop.prevent="handleSubmit"
                                class="login-button"
                                htmlType="submit"
                                size="large"
                                type="primary">登录
                        </a-button>
                    </a-form-item>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    // import {sysUserLogin} from "../api/api";
    import {setStorage} from "../../utils/storage.js";
    export default {
        name: "LoginPage",
        data() {
            return {
                form: this.$form.createForm(this),
                validatorRules: {
                    username: {rules: [{required: true, message: '请输入用户名!', validator: 'click'}]},
                    password: {rules: [{required: true, message: '请输入密码!', validator: 'click'}]},
                },
                loginBtn: false,
            };
        },
        created() {

        },
        methods: {
            handleSubmit() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log(values)
                        const params={
                            account:values.username,
                            password:values.password
                        }
                        this.$axios({
                            method:'post',
                            url:'/api/trademark/admin/login',
                            data:params
                        }).then(res=>{
                            console.log(res)
                            if(res.data.success){
                                this.$router.push({path:'/'})
                                setStorage("UserName",res.data.data.userName)
                                setStorage("AccessToken",res.data.data.token)
                            }else{
                                this.$message.error(res.data.message)
                            }
                        })
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .user-layout-login label {
        font-size: 14px;
    }

    .login-button {
        padding: 0 15px;
        font-size: 16px;
        height: 40px;
        width: 100%;
    }

    .login-page {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .login-box-card {
        margin-top: 30%;
        opacity: 0.95;
    }

    .title {
        font-size: 2rem;
        color: darkgray;
    }
</style>