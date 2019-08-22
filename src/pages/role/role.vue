<template>
<div>
  <Tree
    checkable
    :autoExpandParent="true"
    v-model="menu_ids"
    :selectedKeys="form.menu_ids"
    :treeData="menus"
    @check="this.onCheck"
  />
  
<Button type="primary" @click="submitForm('form')">保存</Button>
</div>
</template>




<script>
    import {Tree,Button} from 'ant-design-vue';
    export default {
      components:{Tree,Button},
    	data(){
    		return {
          id:0,
          menu_ids:[],
          form: {
            menu_ids:[]
          },
          menus: [],
    		}
    	},
    	
    	methods: {
		    submitForm(){
               this.postData(this.form).then(res=>{
                  if(res.id){
                    this.$message.success(res.msg);
                    this.$router.push('/role')
                  }else{
                    this.$message.error(res.msg);
                  }
               })
          
        },
        removeHalf(datas, arr, v, i, needdelarr) {
          //递归找出半选中的数据
          arr.map((item, index) => {
            if (item.key == v && JSON.stringify(item.children) !== '[]') {
              // datas.splice(i, 1);//因为每次截取会改变原数组，所以不能这样
              needdelarr.push(v);
              this.removeHalf(datas, item.children, v, i, needdelarr);
            } else if (item.key != v && item.children) {
              this.removeHalf(datas, item.children, v, i, needdelarr);
            }
          });
        },
        async postData(param){
          let data = await this.http('put','role/update?id='+this.id,param);
          return data;
        },
        async getDetail(id){
          let data = await this.http('get','role/view',{id:id});
          return data;
        },
        onCheck (checkedKeys,e) {
          this.form.menu_ids = checkedKeys.concat(e.halfCheckedKeys)
        },
        
    	},
      mounted(){
        this.http('get','menu/list',{type:'role'}).then(res=>{
          this.menus = res
        })
        this.id = this.$route.params.id
        this.getDetail(this.id).then(res=>{
          var ss = []
          if(res.menu_ids){
            res.menu_ids.map((v,k)=>{
              this.removeHalf(res.menu_ids,this.menus,v,k,ss)
            });
            let that = this
            setTimeout(function(){
              that.form.menu_ids = that.menu_ids = res.menu_ids.filter(item => !ss.includes(item))
            },100)
            
            
          }
          
        })
        
      }
    
 }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
