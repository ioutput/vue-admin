<template>
<Form :form="form" @submit="onSubmit">
      <form-item  label="角色名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <Input placeholder="角色名称" v-decorator="[
          'name',
           {rules: [{ required: true, message: '请输入角色名称' }]}
        ]"/>
      </form-item>
      <form-item label="职能描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <Input placeholder="职能描述" v-decorator="['descs']"/>
      </form-item>
      <form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <Input placeholder="备注" v-decorator="['remark']"/>
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
    import {Form,Select,Input,Radio,Card} from 'ant-design-vue';
    export default {
      components:{Form,Select,Input,FormItem:Form.Item,SelectOption:Select.Option,RadioGroup:Radio.Group,ARadio:Radio,Card},
    	data(){
    		return {
        form: this.$form.createForm(this),
        labelCol:{lg: {span: 7}, sm: {span: 7}},
        wrapperCol:{lg: {span: 10}, sm: {span: 17} }
      }
    	},
    	mounted(){
    		
		  },
    	methods: {
		    onSubmit(form){
          this.form.validateFields((err, values) => {
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
          let data = await this.http('post','api/role',param);
          return data;
        }
    	}
    
    
 }
</script>

