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
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[4, 8, 16]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalItems">
        </el-pagination>
    </div>
    </template>
    
    <script>
    export default {
      data() {
        return {
          search: "",
          tableDataBegin: [
            {
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1518 弄"
            },
            {
              date: "2016-05-02",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1517 弄"
            },
            {
              date: "2016-05-03",
              name: "王二虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              date: "2016-05-04",
              name: "王二虎",
              address: "上海市普陀区金沙江路 1516 弄"
            },
            {
              date: "2016-05-05",
              name: "王三虎",
              address: "上海市普陀区金沙江路 1518 弄"
            },
            {
              date: "2016-05-06",
              name: "王三虎",
              address: "上海市普陀区金沙江路 1517 弄"
            },
            {
              date: "2016-05-07",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              date: "2016-05-08",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1516 弄"
            }
          ],
          tableDataEnd: [],
          currentPage: 4,
          pageSize: 8,
          totalItems: 0,
          filterTableDataEnd:[],
          flag:false
        };
      },
      created() {
        this.totalItems = this.tableDataBegin.length;
        if (this.totalItems > this.pageSize) {
          for (let index = 0; index < this.pageSize; index++) {
            this.tableDataEnd.push(this.tableDataBegin[index]);
          }
        } else {
          this.tableDataEnd = this.tableDataBegin;
        }
      },
      methods: {
        //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
        //用两个变量接收currentChangePage函数的参数
        
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleCurrentChange(1);
        },

        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            //需要判断是否检索
            if (!this.flag) {
                this.currentChangePage(this.tableDataBegin);
                console.log(this.tableDataEnd);
            } else {
                this.currentChangePage(this.filterTableDataEnd);
                console.log(this.tableDataEnd);
            }
        },//组件自带监控当前页码

        currentChangePage(list) {
            let from = (this.currentPage - 1) * this.pageSize;
            let to = this.currentPage * this.pageSize;
            this.tableDataEnd = [];
            for (; from < to; from++) {
                if (list[from]) {
                    this.tableDataEnd.push(list[from]);
                }
            }
        }
  }
  };
 </script>