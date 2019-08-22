<template>
<Card :body-style="{padding: '24px 32px'}" :bordered="false">
<Form :form="form" @submit="onSubmit">
      <form-item label="上级菜单" :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <Select
          v-decorator="['pid']"
          placeholder="请选择上级菜单"
        >
          <select-option v-for="v in menus" :key="v.id" :value="v.id">
            {{v.name}}
          </select-option>
        </Select>
      </form-item>
      <form-item  label="菜单名称" :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <Input placeholder="菜单名称" v-decorator="[
          'name',
           {rules: [{ required: true, message: '请输入菜单名称' }]}
        ]"/>
      </form-item>
      <form-item label="菜单路径" :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <Input placeholder="菜单路径" v-decorator="[
          'url']"/>
      </form-item>
      <form-item  :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <span slot="label">
        菜单图标&nbsp;
        <a href="https://vue.ant.design/components/icon-cn/" target="_blank">
          <tooltip title="点击进入页面复制图标">
          <icon type="question-circle-o" style="color: red"/>
          </tooltip>
        </a>
        
      </span>
        <Input placeholder="菜单图标" v-decorator="[
          'icon']"/>
      </form-item>
      <form-item label="状态" :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <radio-group v-decorator="['status',{initialValue:1}]">
          <a-radio :value="1" >
            启用
          </a-radio>
          <a-radio :value="0">
            禁止
          </a-radio>
        </radio-group>
      </form-item>
      <!--<a-form-item label="是否为菜单" :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-radio-group v-decorator="['is_menu',{initialValue:1}]">
          <a-radio :value="1" >
            是
          </a-radio>
          <a-radio :value="0">
            否
          </a-radio>
        </a-radio-group>
      </a-form-item>-->
      <form-item
        label="备注"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <Textarea
          rows="4"
          placeholder="请输入备注"
          v-decorator="[
            'remark']" />
      </form-item>
</Form>
</Card>
</template>




<script>
    import {Table,Form,Select,Input,Radio,Card,Tooltip,Icon} from 'ant-design-vue';
    export default {
      components:{Table,Form,Select,Input,FormItem:Form.Item,SelectOption:Select.Option,RadioGroup:Radio.Group,ARadio:Radio,Card,Textarea:Input.TextArea,Tooltip,Icon},
    	data(){
    		return {
        menus:[],
        form: this.$form.createForm(this),
    		labelCol:{lg: {span: 7}, sm: {span: 7}},
        wrapperCol:{lg: {span: 10}, sm: {span: 17} }
			 
    		}
    	},
    	mounted(){
    		this.http('get','api/menu').then(res=>{
          this.menus = res.data
        })
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
          let data = await this.http('post','menu/create',param);
          return data;
        }
    	}
    
    
 }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
