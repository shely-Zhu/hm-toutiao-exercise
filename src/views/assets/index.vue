<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <el-radio-group v-model="reqImg.collect"
                      size="small"
                      @change="changeType">
        <el-radio-button :label="false"
                         type="primary">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success"
                 size="small"
                 style="float:right"
                 @click="dialogVisible = true">添加素材</el-button>
      <div class="img-list">
        <div class="img-item"
             v-for="item in results"
             :key="item.id">
          <img :src="item.url"
               alt="">
          <div class="footer"
               v-if="!reqImg.collect">
            <span class="el-icon-star-off"
                  @click="CollectImg(item)"
                  :class="{ selected: item.is_collected }"></span>
            <span class="el-icon-delete"
                  @click="delImg(item.id)"></span>
          </div>
        </div>
      </div>
      <!-- 分页组件 -->
      <el-pagination background
                     layout="prev, pager, next"
                     :total="total"
                     :current-page="reqImg.page"
                     :page-size="reqImg.per_page"
                     @current-change="changePage"
                     v-if="total > reqImg.per_page">
      </el-pagination>
    </el-card>
    <el-dialog title="添加素材"
               :visible.sync="dialogVisible"
               width="300px">
      <el-upload class="avatar-uploader"
                 action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess"
                 name="image"
                 :headers="headers">
        <img v-if="imageUrl"
             :src="imageUrl"
             class="avatar">
        <i v-else
           class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqImg: {
        collect: false,
        page: 1,
        per_page: 5
      },
      results: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getUserImg()
  },
  methods: {
    // 删除图片素材
    delImg (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除成功')
        this.getUserImg()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取成功之后的事
    handleAvatarSuccess (res) {
      this.imageUrl = res.data.url
      setTimeout(() => {
        this.$message.success('上传成功')
        this.dialogVisible = false
        this.getUserImg()
      }, 1000)
    },
    // 收藏图片
    async CollectImg (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      console.log(data, item.is_collected)
      item.is_collected = data.collect
    },
    // 获取图片
    async getUserImg () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqImg })
      console.log(data)
      this.results = data.results
      this.total = data.total_count
    },
    changeType (label) {
      this.reqImg.page = 1
      this.getUserImg()
    },
    changePage (currentPage) {
      this.reqImg.page = currentPage
      this.getUserImg()
    }
  }
}
</script>

<style lang="less" scoped>
.img-list {
  margin-top: 20px;
  .img-item {
    width: 160px;
    height: 160px;
    border: 1px dashed #ccc;
    margin: 20px 20px;
    position: relative;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      text-align: center;
      span {
        margin: 0 20px;
        cursor: pointer;
        &.selected {
          color: red;
        }
      }
    }
  }
}
.el-pagination {
  text-align: center;
}
.dialog-footer {
  text-align: center;
}
.avatar-uploader {
  text-align: center;
}
</style>
