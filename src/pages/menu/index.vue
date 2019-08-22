<template>
<div>
<Form :form="form" layout="inline" @submit="onSubmit">
      <form-item>
          <Button type="primary" @click="()=>this.showcreate=true">添加</Button>
      </form-item>
      <form-item >
        <Input placeholder="菜单名称" v-decorator="['name']"/>
      </form-item>
      
      <form-item>
        <Button type="primary" icon="search" html-type="submit">
          查询
        </Button>
      </form-item>
</Form>

<Table :columns="columns" :dataSource="tableData" rowKey="id" :pagination="pagination" bordered>
  <span slot="action" slot-scope="text, record">
    <router-link :to="'/menu/update/'+record.id"><Button type="primary" >编辑</Button></router-link>
    <Button type="danger" @click="handleDelete(record)">删除</Button>
  </span>
  </Table>
    
  <Modal v-model="showcreate" @cancel="cancelModel" @ok="createSubmit" title="添加菜单">
      <create @getList="getList" @cancel="cancelModel" ref="create"></create>
  </Modal>   
</div>
 

    
</template>

<script>
import {Table,Form,Select,Input,Button,Modal,Icon,Popconfirm} from 'ant-design-vue';
import Create from './create'
export default {
  components:{Table,Form,Select,Input,Button,FormItem:Form.Item,SelectOption:Select.Option,Modal,Create},
  data() {
    return {
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
      tableData: [],
      columns:[
        {title:'ID',dataIndex:'id',align:'center'},
        {title:'菜单名称',dataIndex:'name',align:'center'},
        {title:'菜单路径',dataIndex:'url',align:'center'},
        {title:'状态',dataIndex:'status',align:'center'},
        //{title:'是否为菜单',dataIndex:'is_menu',align:'center'},
        {title:'操作',scopedSlots: { customRender: 'action' },align:'center'},
      ],
      form: this.$form.createForm(this),
      showcreate:false,
      search:{}
    }
  },

  mounted() {
    this.getList();
  },
  methods: {
    async getList(param = {}) {
      let req = { page_size: this.pagination.pageSize, page: this.pagination.current };

      let data = await this.http(
        "get",
        "api/menu",
        Object.assign(req, param)
      );
      this.tableData = data.data;
      this.pagination.total = 10;
    },
    onSubmit(){//搜索提交

      this.form.validateFields((err, values) => {
        if (!err) {
          this.pagination.current = 1
          this.search = values
          this.getList(values)
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
    handleChange(page,size) {
      //列表展示条数改变
      this.pagination.current = page
      this.pagination.pageSize = size;
      this.getList(this.search);
    },
    handleDelete(row) {
      var that = this;
      this.$confirm({
        title: '删除菜单',
        content: '你确定要删除该菜单吗？',
        onOk() {
          that.deleteData(row.id).then(res => {
            if (res.status == "success") {
              that.$message.success("删除成功!");
              that.getList();
            } else {
              that.$message.error("删除失败!");
            }
          });
        },
        onCancel() {},
      });
    },
    async deleteData(id) {
      let data = await this.http("delete", "menu/delete", { id: id });
      return data;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
