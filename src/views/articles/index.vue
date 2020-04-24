<template>
  <div id="container">
    <el-card>
      <div slot="header"
           class="clearfix">
        <my-bread>内容编辑</my-bread>
      </div>
      <el-form label-width="80px"
               size="small">
        <el-form-item label="status : ">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">ALL</el-radio>
            <el-radio :label="0">CRAFT</el-radio>
            <el-radio :label="1">WAITCONFIRM</el-radio>
            <el-radio :label="2">CONFIRM</el-radio>
            <el-radio :label="3">CONFIRMFAILD</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="channel : ">
          <!-- 放置自己的下拉组件 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="date : ">
          <el-date-picker v-model="dateArr"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="changeDate"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="filt()">FILTER</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章列表 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{count}} 条结果：</div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template v-slot="scope">
            <el-image :src="scope.row.cover.images[0]"
                      fit="contain"
                      style="width:120px;height:80px">
              <div slot="error">
                <img src="../../assets/images/error.gif"
                     style="width:120px;height:80px">
              </div>
            </el-image>
          </template>

        </el-table-column>
        <el-table-column prop="title"
                         label="标题">
        </el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-tag v-if="scope.row.status===0"
                    type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2"
                    type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3"
                    type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4"
                    type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate"
                         label="发布日期">
        </el-table-column>
        <el-table-column label="操作"
                         width="120">
          <template v-slot="scope">
            <el-button type="primary"
                       icon="el-icon-edit"
                       plain
                       circle
                       @click="edit(scope.row.id)"></el-button>
            <el-button type="danger"
                       @click="del(scope.row)"
                       icon="el-icon-delete"
                       plain
                       circle></el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination background
                   v-model="reqParams"
                   :page="reqParams.page"
                   layout="prev, pager, next, total"
                   :total="count"
                   style="text-align:center;margin:30px auto 0"
                   :page-size="reqParams.per_page"
                   @current-change="changePage">
    </el-pagination>
  </div>
</template>
<script>
export default {
  created () {
    // 获取频道下拉选项数据
    // this.getChannelOptions()
    this.getarticles()
  },
  methods: {
    // async getChannelOptions () {
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    //   // console.log(data.channels[0].value)
    // },
    async getarticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      // console.log(data.results)
      this.articles = data.results
      this.count = data.total_count
    },
    filt () {
      // if (this.reqParams.channel_id === '') {
      //   this.reqParams.channel_id = null
      // }
      this.reqParams.page = 1
      this.getarticles()
    },
    changePage (currentPage) {
      this.reqParams.page = currentPage
      this.getarticles()
      console.log(this.reqParams.page)
    },
    changeDate (dateArr) {
      try {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } catch (err) {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(id)
        await this.$http.delete(`articles/${id}`)
        this.getarticles()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    edit (id) {
      this.$router.push(`/publish?${id}`)
    }
  },
  data () {
    return {
      dateArr: [],
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      articles: [],
      // channelOptions: [],
      count: 0
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
