<template>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md q-pa-md"
    >
      <q-input
        filled
        v-model="formData.alarmName"
        label="区域名称"
        :rules="[ val => val && val.length > 0 || '请输入']"

      />
			<q-input
        filled
        v-model="formData.alarmNo"
        label="区域编号"
        :rules="[ val => val && val.length > 0  || '请输入']"
      />
			<q-input
        filled
        v-model="formData.alarmDesc"
        label="区域描述"
        :rules="[ val => val && val.length > 0 || '请输入']"
      />
      <div>
        <q-btn label="确定" type="submit" color="primary"/>
        <q-btn label="取消" @click="onReset" color="primary" flat class="q-ml-sm" />
      </div>
		</q-form>
</template>

<script>
  export default {
    data () {
      return{
        formData:{},// 表单

      };
    },
    components: {

    },
    methods: {
      onSubmit(){
        this.$emit('onSubmit',this.formData)
      },
			onReset(){
        this.$emit('cancelEdit')
      }
    },
    props:{
      id:{
        type: String,
      }
    }
  }
</script>

<style lang='scss' scoped>
.q-gutter-md{
  background-color:#fff;
}
</style>
