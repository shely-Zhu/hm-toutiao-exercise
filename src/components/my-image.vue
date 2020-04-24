<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="item-list">
      <div class="item-img">
        <img :src="value||defaultImg"
             @click="openDialog()"
             alt="">
      </div>
    </div>
    <!-- 对话框组件 -->
    <el-dialog :visible.sync="dialogVisible"
               width="750px">
      <el-tabs v-model="activeName"
               type="card">
        <el-tab-pane label="素材库"
                     name="first">
          <!-- 全部与收藏按钮 -->
          <el-radio-group v-model="reqParams.collect"
                          size="mini"
                          @change="changeCollect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 图片遍历 -->
          <div class="item-list">
            <div class="item-img"
                 :class="{selected: selecteImg===item.url}"
                 @click="selecteImg=item.url"
                 v-for="item in results"
                 :key="item.id">
              <img :src="item.url"
                   alt="">
            </div>
          </div>
          <!-- 分页组件 -->
          <el-pagination background
                         layout="prev, pager, next"
                         :total="total"
                         v-if="total > reqParams.per_page"
                         :current-page="reqParams.page"
                         :page-size="reqParams.per_page"
                         @current-change="changePage">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片"
                     name="second">
          <el-upload class="avatar-uploader"
                     action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                     :show-file-list="false"
                     :headers="headers"
                     name="image"
                     :on-success="handleAvatarSuccess">
            <img v-if="imgUrl"
                 :src="imgUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImg from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      reqParams: {
        collect: false,
        page: 1,
        per_page: 5
      },
      selecteImg: null,
      dialogVisible: false,
      activeName: 'first',
      results: [],
      imgUrl: '',
      defaultImg,
      total: 0
    }
  },
  methods: {
    confirm () {
      if (this.activeName === 'first') {
        this.$emit('input', this.selecteImg)
      } else {
        this.$emit('input', this.imgUrl)
      }
      this.dialogVisible = false
    },
    handleAvatarSuccess (res) {
      this.imgUrl = res.data.url
    },
    changePage (currentPage) {
      this.reqParams.page = currentPage
      this.getUserImg()
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getUserImg()
    },
    openDialog () {
      this.dialogVisible = true
      this.selecteImg = null
      this.imgUrl = null
      this.getUserImg()
    },
    async getUserImg () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.results = data.results
      // console.log(data.results)
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader {
  text-align: center;
}
.item-list {
  margin-top: 15px;
  .item-img {
    width: 160px;
    height: 120px;
    border: 1px dashed #ccc;
    display: inline-block;
    margin-right: 10px;
    position: relative;
    &.selected {
      &::after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.3) url(../assets/images/selected.png)
          no-repeat center / 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }
}
.el-pagination {
  text-align: center;
}
</style>
