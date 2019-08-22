<template>
<Card :body-style="{padding: '24px 32px'}" :bordered="false">
<Form :form="form" @submit="onSubmit">
      <form-item  label="用户名" :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <Input placeholder="用户名" v-decorator="[
          'username',
           {rules: [{ required: true, message: '请输入账号' }]}
        ]"/>
      </form-item>
      <form-item label="密码" :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <Input type="password" placeholder="密码" v-decorator="[
          'password']"/>
      </form-item>
      <form-item label="角色" :labelCol="labelCol"
        :wrapperCol="wrapperCol">
      <Select
        v-decorator="['role_id']"
        placeholder="请选择角色"
      >
        <select-option v-for="v in roles" :key="v.id" :value="v.id">
          {{v.name}}
        </select-option>
        </Select>
      </form-item>
      <form-item label="状态" :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <radio-group v-decorator="['status']">
          <a-radio :value="1" >
            启用
          </a-radio>
          <a-radio :value="0">
            禁止
          </a-radio>
        </radio-group>
      </form-item>
      <form-item
        label="描述"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <Textarea
          rows="4"
          placeholder="请输入描述"
          v-decorator="[
            'descs']" />
      </form-item>
      <form-item style="text-align: center">
        <Button type="primary" html-type="submit">
          提交
        </Button>
      </form-item>
</Form>
</Card>
</template>




<script>
    import {Form,Select,Input,Radio,Card,Button} from 'ant-design-vue';
    export default {
      components:{Form,Select,Input,FormItem:Form.Item,SelectOption:Select.Option,RadioGroup:Radio.Group,ARadio:Radio,Card,Textarea:Input.TextArea,Button},
    	data(){
    		return {
          id:0,
          status:1,
          roles:[],
          members:[],
      		form:this.$form.createForm(this),
  			  labelCol:{lg: {span: 7}, sm: {span: 7}},
          wrapperCol:{lg: {span: 10}, sm: {span: 17} }
    		}
    	},
    	methods: {
		    onSubmit(form){
          this.form.validateFields((err, values) => {
            if(!err){
               this.postData(values).then(res=>{
                  if(res.id){
                    this.$message.success(res.msg);
                    this.$router.push('/user')
                  }else{
                    this.$message.warning(res.msg);
                  }
               })
              
            }
          })
          
        },
        async postData(param){
          let data = await this.http('put','api/user?id='+this.id,param);
          return data;
        },
        async getUser(id){
          let data = await this.http('get','api/user/'+id);
          data.data.role_id = String(data.data.role_id)
          this.form.setFieldsValue(data.data)
        }
    	},
      mounted(){

        this.id = this.$route.params.id
        this.getUser(this.id)
        this.http("get", "api/role",{page_size:100}).then(
            res => {
              this.roles = res.data;
            }
          );
      }
    
 }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
