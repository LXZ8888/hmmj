<template>
  <div class="article-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <!-- 头部内容 -->
          <span>共343天记录</span>
          <el-button type="primary" round size="small" icon="el-icon-plus"
            >添加面经</el-button
          >
        </div>
      </template>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="stem" label="标题"> </el-table-column>
        <el-table-column prop="creator" label="作者" width="130">
        </el-table-column>
        <el-table-column prop="likeCount" label="点赞" width="80">
        </el-table-column>
        <el-table-column prop="views" label="浏览数" width="80">
        </el-table-column>
        <el-table-column prop="createdAt" label="更新时间" width="180">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-link @click="fn(scope)"
              ><i style="font-size: 18px" class="el-icon-view"></i
            ></el-link>
            <el-link @click="fn(scope)"
              ><i
                style="font-size: 18px;margin:0 10px;"
                class="el-icon-edit-outline"
              ></i
            ></el-link>
            <el-link @click="fn(scope)"
              ><i
                style="font-size: 18px;margin:0 10px;"
                class="el-icon-delete"
              ></i
            ></el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="5"
        @current-change="changePage"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { articleListAPI } from '@/api/article'
export default {
  name: 'article-page',
  data () {
    return {
      tableData: [],
      pageSize: 5,
      total: 0,
      page: 1
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const res = await articleListAPI({
        current: this.page,
        pageSize: this.pageSize
      })
      console.log(res)
      this.tableData = res.data.rows
      this.total = res.data.total
    },
    changePage (page) {
      // 页面改变事件
      this.page = page
      this.loadData()
    },

    fn () {
      console.log(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
