<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form v-model="reqParams"
               label-width="75px">
        <el-form-item label="TITLE :">
          <el-input v-model="reqParams.title"></el-input>
        </el-form-item>
        <el-form-item label="CONTENT:">
          <quill-editor ref="myQuillEditor"
                        v-model="reqParams.content"
                        :options="editorOption" />
        </el-form-item>
        <el-form-item label="COVER :">
          <el-radio-group v-model="reqParams.cover.type">
            <el-radio :label="0">单图</el-radio>
            <el-radio :label="1">三图</el-radio>
            <el-radio :label="2">无图</el-radio>
            <el-radio :label="3">自动</el-radio>
          </el-radio-group>
          <!-- 放置自定义的图片按组件 -->
          <div v-if="reqParams.cover.type===0">
            <my-image v-model="reqParams.cover.images[0]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="CHANNEL:">
          <!-- 自定义下拉框组件 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
      </el-form>
      <el-button type="primary"
                 @click="submit(false)">发布</el-button>
      <el-button @click="submit(true)">存入草稿</el-button>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      reqParams: {
        channel_id: '',
        title: '',
        cover: {
          type: 0,
          images: []
        },
        content: ''
      },
      editorOption: {
        placeholder: null,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      }
    }
  },
  methods: {
    async submit (draft) {
      const { data } = await this.$http.post(`articles?draft=${draft}`, this.reqParams)
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
