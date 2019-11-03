<template>
  <div>
      <!-- baseurl -->
    <h2>上传 {{this.honorType}} Excel</h2>
    <el-upload
          class="upload-demo"
          :action="'http://localhost:1080/api'+'/excel/'+this.path"
          :headers=getAuthHeaders()
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
           multiple
          :limit="1"
          :file-list="fileList"
          :on-success="afterUpload">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip"></div>
    </el-upload>
  </div>
</template>

<script>
import request from "@/utils/request"

export default {
  props: {
    path: '',
  },
  data() {
      return {
          fileList: [],
          honorType: '',
      }
  },
  methods: {
    handleRemove(file, fileList) {
      fileList.remove(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    afterUpload() {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    fetchType(path) {
        if (path === 'competition') {
            // console.log(this._data.honorType)
            this._data.honorType = "竞赛相关"
            return;
        }
    }
  },
  created() {
      this.path && this.fetchType(this.path);
  }
}
</script>