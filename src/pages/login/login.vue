<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <span class="title">
            后台管理系统
          </span>
        </div>
        <div class="desc">vue后台</div>
      </div>
      <div class="login">
        <Form v-on:submit.prevent="onSubmit" :form="form">
          <Tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
            <Tab tab="账户登录" key="1">
              
              <form-item>
                <Input
                  size="large"
                  v-decorator="['username',{initialValue:'admin',rules: [{ required: true, message: '请输入账户名', whitespace: true}]}]"
                  placeholder="admin"
                >
                  <icon slot="prefix" type="user"/>
                </Input>
              </form-item>
              <form-item>
                <Input
                  size="large"
                  v-decorator="['password',{initialValue:'123456',rules: [{ required: true, message: '请输入密码', whitespace: true}]}]"
                  placeholder="123456"
                  type="password"
                >
                  <icon slot="prefix" type="lock"/>
                </Input>
              </form-item>
              <form-item>
                <Button
                  :loading="loading"
                  style="width: 100%;margin-top: 24px"
                  size="large"
                  html-type="submit"
                  type="primary"
                >登录</Button>
              </form-item>
            </Tab>
            <!-- <a-tab-pane tab="扫码登录" key="2">
              <div id="code"></div>
            </a-tab-pane> -->
          </Tabs>
          <!--<div>
            <a-checkbox :checked="true" >自动登录</a-checkbox>
            <a style="float: right">忘记密码</a>
          </div>-->
          <!--<div>
            其他登录方式
            <a-icon class="icon" type="alipay-circle" />
            <a-icon class="icon" type="taobao-circle" />
            <a-icon class="icon" type="weibo-circle" />
            <router-link style="float: right" to="/" >注册账户</router-link>
          </div>-->
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import {Form,Input,Tabs,Icon,Button,Message} from 'ant-design-vue';
export default {
  components: {Form,FormItem:Form.Item,Tabs,Icon,Button,Tab:Tabs.TabPane,Input},
  data() {
    return {
      error: "",
      loading: false,
      showLogin: false,
      ip: "",
      form: this.$form.createForm(this),
      labelCol: { lg: { span: 7 }, sm: { span: 7 } },
      wrapperCol: { lg: { span: 10 }, sm: { span: 17 } }
    };
  },
  methods: {
    onSubmit(e) {
      
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          let form = new FormData
          form.append('username',values.username)
          form.append('password',values.password)
          this.http("post", "login", form).then(res => {
            this.loading = false;
            if (res.status == 400) {
              Message.error(res.data);
              return false;
            }
            res.data.token = res.token
            this.$store.dispatch("SetUserInfo", res.data);
            this.$router.push("/index");
          });
        } else {
          Message.error("请输入正确的用户名密码");
          return false;
        }
      });
    },

    
  },
  mounted() {
    
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  //background: #f0f2f5 url("../assets/img/login.jpg") no-repeat center;
  //background-size: 100% 100%;
  .content {
    padding: 32px 0;
    flex: 1;
    @media (min-width: 768px) {
      padding: 112px 0 24px;
    }
    .top {
      text-align: center;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
            sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login {
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button {
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }
}
</style>
