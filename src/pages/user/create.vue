<template>
<Form :form="form" @submit.prevent="onSubmit">
      <form-item  label="用户名" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <Input autocomplete="off" placeholder="用户名" v-decorator="[
          'username',{rules: [{ required: true, message: '请输入账号' }]}
        ]"/>
      </form-item>
      <form-item label="密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <Input autocomplete="off" type="password" placeholder="密码" v-decorator="[
          'password',
           {rules: [{ required: true, message: '请输入密码' }]}
        ]"/>
      </form-item>
      <form-item label="角色" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <Select
        v-decorator="[
          'role_id',
          {rules: [{ required: true, message: '请选择角色' }]}
        ]"
        placeholder="请选择角色"
      >
        <select-option v-for="v in roles" :key="v.id" :value="v.id">
          {{v.name}}
        </select-option>
        </Select>
      </form-item>
      
      <form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <radio-group v-decorator="['status',{initialValue:1}]" >
          <a-radio :value="1" >
            启用
          </a-radio>
          <a-radio :value="0">
            禁止
          </a-radio>
        </radio-group>
    </form-item>
</Form>
</template>

<script>
    import {Table,Form,Select,Input,Radio} from 'ant-design-vue';
    export default {
      components:{Table,Form,Select,Input,FormItem:Form.Item,SelectOption:Select.Option,RadioGroup:Radio.Group,ARadio:Radio},
    	data(){
    		return {
            roles:[],
            form:this.$form.createForm(this),
            labelCol:{lg: {span: 7}, sm: {span: 7}},
            wrapperCol:{lg: {span: 10}, sm: {span: 17} }
    		}
    	},
    	mounted(){
    		this.http("get", "api/role",{page_size:100}).then(
            res => {
              this.roles = res.data;
            }
          );
          
		  },
    	methods: {
		    onSubmit(){
          this.form.validateFields((err, values) => {console.log(err);return false
            if(!err){
              this.postData(values).then(res=>{
                if(res.id){
                  this.$message.success(res.msg);
                  this.$emit('cancel')
                  this.$emit('getList')
                }else{
                  this.$message.error(res.msg);
                }
              })
              
            }
          })
          
        },
        async postData(param){
          let data = await this.http('post','api/user',param);
          return data;
        }
    	}
    
    
 }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
