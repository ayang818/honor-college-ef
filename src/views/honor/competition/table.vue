<template>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="70"
          v-if="showMap.get('id')">
        </el-table-column>
        <el-table-column
          prop="competitionType"
          label="竞赛类别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="competitionLevel"
          label="竞赛级别"
          width="80">
        </el-table-column>
        <el-table-column
          prop="competitionTotalName"
          label="竞赛全称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="competitionYear"
          label="竞赛年份"
          width="70">
        </el-table-column>
        <el-table-column
          prop="teamNumber"
          label="组号"
          width="70">
        </el-table-column>
        <el-table-column
          prop="studentName"
          label="学生姓名"
          width="70">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="年级"
          width="70">
        </el-table-column>
        <el-table-column
          prop="schoolNumber"
          label="学号"
          width="90">
        </el-table-column>
        <el-table-column
          prop="major"
          label="专业"
          width="180">
        </el-table-column>
        <el-table-column
          prop="college"
          label="学院"
          width="70">
        </el-table-column>
        <el-table-column
          prop="guidanceTeacher"
          label="指导老师"
          width="70">
        </el-table-column>
        <el-table-column
          prop="honorLevel"
          label="获奖等级"
          width="180">
        </el-table-column>
        <el-table-column
          prop="message"
          label="备注"
          width="180">
        </el-table-column>        
      </el-table>
    </div>
    </template>
    
<script>
import {list} from '@/api/competition';

export default {
  data() {
    return {
      tableData: [],
      showMap: new Map(),
    };
  },
  created() {
    list(10, 0).then(res => {
      for (const key in res) {
          for (const item in res[key]) {
            this.showMap.set(item, true);
          }
          break;
      }
      this.tableData = res;
    })
  },
  methods: {

  }
}; 
 </script>