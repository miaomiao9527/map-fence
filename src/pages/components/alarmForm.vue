<template>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="formData.alarmName"
        label="区域名称"
        lazy-rules
        :rules="[ val => val && val.length > 0 || '请输入区域名称']"
      />
			<q-input
        filled
        v-model="formData.alarmNo"
        label="区域编号"
        lazy-rules
        :rules="[ val => val && val.length > 0 || '请输入区域编号']"
      />
			<q-input
        filled
        v-model="formData.alarmDesc"
        label="区域描述"
      />
      <div>
        <q-btn label="确定" type="submit" color="primary"/>
        <q-btn label="重置" type="cancel" color="primary" flat class="q-ml-sm" />
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
        this.$emit('cancel')
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
