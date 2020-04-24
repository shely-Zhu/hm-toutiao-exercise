<template>
  <el-select :value="value"
             placeholder="请选择"
             clearable
             @change="fn">
    <el-option v-for="item in channelOptions"
               :key="item.id"
               :label="item.name"
               :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    // 获取频道下拉选项数据
    // console.log(1)
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
      // console.log(this.channelOptions)
    },
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
