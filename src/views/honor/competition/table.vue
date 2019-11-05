<template>
    <div>
      <el-form>
        <el-form-item label="选择展示列">
           <el-radio v-model="label"  label="1" @change="selectAll">全选</el-radio>
           <el-radio v-model="label"  label="2"  @change="selectNone">全不选</el-radio>
          <el-checkbox-group v-model="selectShownData">
            <el-checkbox v-for="(value, index) in dataMap" :key="index" :label="value" :v-model="index" @change="selectPart"></el-checkbox>
            <el-button type="primary" @click="select">
              选择
            </el-button>         
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="搜索">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="searchItem">
            </el-input>
          </el-col>
          <el-col :span="6">
             <el-button icon="el-icon-search" @click="search" circle></el-button>
          </el-col>  
          </el-row>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <!-- <el-table-column
        type="selection"
        width="55">
        </el-table-column> -->
        <template v-for="(value, index) in dataMap">
            <el-table-column
            :key="index"
            :prop="index"
            :label="value"
            :id="index"
            v-if="showMap[index]"
            >
          </el-table-column>
        </template> 
      </el-table>
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[20, 40, 60, 80]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageNum">
    </el-pagination>   
    </div>
    </template>
    
<script>
import {list, count, search, countBykeyWord} from '@/api/competition';

export default {
  data() {
    return {
      tableData: [],
      selectShownData: [],
      showMap: {},
      dataMap: {},
      label: "",
      pageNum: 1,
      currentPage: 1,
      currentSize: 20,
      searchItem: "",
      searchDto: {}
    };
  },
  created() {
    this.dataMap.id = "编号";
    this.dataMap.competitionType = "竞赛类别";
    this.dataMap.competitionLevel = "竞赛级别";
    this.dataMap.competitionTotalName = "竞赛全称";
    this.dataMap.competitionYear = "竞赛年份";
    this.dataMap.teamNumber = "组号";
    this.dataMap.studentName = "学生姓名";
    this.dataMap.grade = "年级";
    this.dataMap.schoolNumber = "学号";
    this.dataMap.major = "专业";
    this.dataMap.college = "学院";
    this.dataMap.guidanceTeacher = "指导老师";
    this.dataMap.honorLevel = "获奖等级";
    this.dataMap.message = "备注";
    this.dataMap.pass = "是否通过";
    this.dataMap.gmtCreate = "创建时间";
    this.dataMap.gmtModified = "修改时间";
    list(20, 0).then(res => {
      for (const key in this.dataMap) {
          this.showMap[key] = true;
      }
      this.tableData = res;
    })
    this.getCount();
  },
  methods: {
    getCount() {
      count().then((res) => {
        this.pageNum = res;
      })
    },
    select() {
      for (let index in this.showMap) {
        this.showMap[index] = true;
      }
      let map = this.showMap;
      let list = this.selectShownData;
      let valueList = [];
      Object.keys(this.dataMap).forEach((value) => {
        valueList.push(this.dataMap[value])
      })
      let deleteNodeList = []
      valueList.forEach((value, index) => {
        if (list.indexOf(value) == -1) {
          deleteNodeList.push(value)
        }       
      })
      for(let index in this.dataMap) {
        for (let jndex in deleteNodeList) {
          if (deleteNodeList[jndex] === this.dataMap[index]) {
              map[index] = false;
          } 
        }
      }
      Object.assign({}, this.showMap, map);
      this.$forceUpdate();
    },
    selectNone() {
      this.selectShownData = [];
    },
    selectAll() {
      for (let index in this.dataMap) {
        this.selectShownData.push(this.dataMap[index]);
      }
    },
    selectPart() {
      this.label = "3";
    },
    handleSizeChange(val) {
      this.currentSize = val;
      if (this.searchItem) {
        this.search();
        return;
      }
      list(this.currentSize, (this.currentPage-1)*this.currentSize).then(res => {
        this.tableData = res;
      })
      this.$forceUpdate();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.searchItem) {
        this.search();
        return;
      }
      list(this.currentSize, (this.currentPage-1)*this.currentSize).then(res => {
        this.tableData = res;
      })
      this.$forceUpdate();
    },
    search() {
      this.searchDto.keyword = this.searchItem;
      this.searchDto.limit = this.currentSize;
      this.searchDto.offset = (this.currentPage-1)*this.currentSize;
      search(this.searchDto).then((res) => {
        this.tableData = res;
      })
      countBykeyWord(this.searchItem).then((res) => {
        this.pageNum = res;
      })
      this.$forceUpdate();
    }
  },
}; 
 </script>
