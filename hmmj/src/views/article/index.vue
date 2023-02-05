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
          <span>共{{ total }}天记录</span>
          <el-button
            type="primary"
            round
            size="small"
            icon="el-icon-plus"
            @click="drawer = true"
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
            <!-- 预览 -->
            <el-link @click="showDrawer('view', scope.row.id)"
              ><i style="font-size: 18px" class="el-icon-view"></i
            ></el-link>
            <!-- 编辑 -->
            <el-link @click="showDrawer('edit', scope.row.id)"
              ><i
                style="font-size: 18px;margin:0 10px;"
                class="el-icon-edit-outline"
              ></i
            ></el-link>
            <!-- 删除 -->
            <el-link @click="del(scope.row.id)"
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
    <!-- 抽屉效果组件 -->
    <el-drawer
      :title="title"
      :visible.sync="drawer"
      direction="rtl"
      :size="600"
      :before-close="beforeClose"
    >
      <div class="article-preview" v-if="type === 'view'">
        <h5>{{ form.stem }}</h5>
        <div v-html="form.content"></div>
      </div>

      <!-- 抽屉 -->
      <el-form
        v-else
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="stem">
          <el-input v-model="form.stem"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- bidirectional data binding（双向数据绑定） -->
          <quill-editor
            v-model="form.content"
            @blur="$refs.form.validateField('content')"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">确认</el-button>
          <el-button @click="beforeClose(done)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {
  articleListAPI,
  addArticleAPI,
  delArticleAPI,
  detailAPI,
  updateAPI
} from '@/api/article'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  name: 'article-page',
  data () {
    return {
      tableData: [],
      pageSize: 5,
      total: 0,
      page: 1,
      drawer: false,
      type: 'add',
      form: {
        stem: '',
        content: ''
      },
      rules: {
        stem: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      }
      // 用来保存被点击的抽屉的类型。
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    beforeClose (done) {
      // console.log('关闭了')
      // this.$refs.form.resetFields()
      this.form = {
        stem: '',
        content: ''
      }
      if (this.type !== 'view') {
        this.$refs.form.clearValidate(['stem', 'content'])
      }

      this.drawer = false
      done()
    },
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

    async showDrawer (type, id) {
      // 先发请求再显示，新增不需要再发送请求。
      if (type !== 'add') {
        const res = await detailAPI({ id })
        console.log('llll', res)
        this.form = res.data
      }

      this.type = type
      this.drawer = true
    },
    // 点击确认触发的事件。
    async save (id) {
      try {
        // 整个表单校验
        await this.$refs.form.validate()
        if (this.type === 'add') {
          // 能来到这，证明校验通过，就发起请求做新增
          const res = await addArticleAPI(this.form)
          console.log(res)
          // 弹出成功提示
          this.$message.success('新增成功')

          // 跳转到第一个
          this.page = 1
        } else {
          // 要么是新增要么是修改，预览只是给你来看的
          await updateAPI({
            id: this.form.id,
            content: this.form.content,
            stem: this.form.stem
          })
          this.$message.success('修改成功')
        }

        // 渲染数据
        this.loadData()
        // 关闭抽屉
        // this.drawer = false
        this.beforeClose()
      } catch {}
    },
    // 删除面经
    async del (id) {
      const res = await delArticleAPI({
        id
      })
      console.log(res)
      // 弹出提示
      this.$message.success('删除成功')
      if (this.tableData.length === 1 && this.page !== 1) {
        this.page--
      }
      this.loadData()
    }
  },
  computed: {
    title () {
      if (this.type === 'add') {
        return '添加面经'
      } else if (this.type === 'edit') {
        return '修改面经'
      } else {
        return '面经预览'
      }
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
