<template>
<div>
<Form :form="form" layout="inline" @submit="onSubmit">
      <form-item>
          <Button type="primary" @click="()=>this.showcreate=true">添加</Button>
      </form-item>
      <form-item>
        <Input placeholder="用户名" v-decorator="[
          'username',
          
        ]"/>
      </form-item>
      <form-item label="状态">
        <Select allowClear v-decorator="['status']"  style="width:100px">
          <select-option value="1">启用</select-option>
          <select-option value="0">禁用</select-option>
        </Select>
      </form-item>
      <form-item
      >
        <Button type="primary" icon="search" html-type="submit">
          查询
        </Button>
      </form-item>
</Form>

<Table :columns="columns" :dataSource="tableData" rowKey="id" :pagination="pagination" :pageSize="pageSize" bordered>
  <span slot="action" slot-scope="text, record">
    <router-link :to="'/user/update/'+record.id"><Button type="primary" >编辑</Button></router-link>
    <popconfirm title="你确定要删除吗" @confirm="handleDelete(record)">
      <icon slot="icon" type="question-circle-o" style="color: red" />
      <Button type="danger">删除</Button>
    </popconfirm>
  </span>
  </Table>
    
  <Modal v-model="showcreate" @cancel="cancelModel" @ok="createSubmit" title="添加">
      <create @getList="getUser" @cancel="cancelModel" ref="create"></create>
  </Modal> 
</div>
</template>




<script>
    import {Table,Form,Select,Input,Button,Modal,Icon,Popconfirm} from 'ant-design-vue';
    import Create from './create'
    export default {
      components:{Table,Form,Select,Input,Button,FormItem:Form.Item,SelectOption:Select.Option,Modal,Popconfirm,Create},
    	data(){
    		return {
          pageSize:10,
          pagination:{
            current:1,
            total:0,
            pageSize:10,
            pageSizeOptions:['10','20','30','40'],
            showTotal:(total)=>{return '共'+total+'条'},
            showQuickJumper:true,
            showSizeChanger:true,
            onShowSizeChange:(page,size)=>{this.handleChange(page,size)},
            onChange:(page,size)=>{this.handleChange(page,size)},
          },
          showcreate:false,
      		tableData: [],
          columns:[
              {title:'ID',dataIndex:'id',align:'center'},
              {title:'用户名',dataIndex:'username',align:'center'},
              {title:'状态',dataIndex:'status',align:'center'},
              {title:'添加时间',dataIndex:'created_at',align:'center'},
              {title:'更新时间',dataIndex:'updated_at',align:'center'},
              {title:'操作',scopedSlots: { customRender: 'action' },align:'center'},
          ],
          form:this.$form.createForm(this)
          }
    		},
    	mounted(){
       this.getUser();
    		
		  },
    	methods: {
        async getUser(param={}){
          let req = {page_size:this.pagination.pageSize,page:this.pagination.current};
          
          let data = await this.http('get','api/user',Object.assign(req,param));
          this.tableData = data.data;
          this.pagination.total = 10
        },
		    onSubmit(){//搜索提交
          this.form.validateFields((err, values) => {
            if (!err) {
              this.pagination.current = 1
              this.getUser(values)
            }
          })
        },
        createSubmit(){
          this.$refs.create.onSubmit()
        },
        cancelModel(){
          this.showcreate = false
          this.$refs.create.form.resetFields()
        },
        handleChange(page,size){
          this.pagination.current = page;
          this.pagination.pageSize = size;
          this.getUser()
        },
        handleDelete(row){
          var that = this;
          this.$confirm({
            title: '删除用户',
            content: '你确定要删除该用户吗？',
            onOk() {
              that.deleteData(row.id).then(res => {
                if (res.status == "success") {
                  that.$message.success("删除成功!");
                  that.getUser();
                } else {
                  that.$message.error("删除失败!");
                }
              });
            },
            onCancel() {},
          });
        },
        async deleteData(id){
         let data = await this.http('delete','user/delete',{id:id});
         return  data;
        }
    	}
    
    
 }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
