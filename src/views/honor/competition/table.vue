<template>
    <div>
      <el-table
        :data="tableDataEnd"
        border
        height="750"
        style="width: 100%">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          width="180">
          <template slot="header" slot-scope="scope">
            <div style="display: flex;">
                <el-input
                v-model="search"
                size="mini"
                placeholder="日期"/>
            <el-button icon="el-icon-search" circle></el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
    </template>
    
<script>
import {list} from '@/api/competition';

export default {
  data() {
    return {
      
    };
  },
  created() {
    list();
  },
  methods: {

  }
}; 
 </script>