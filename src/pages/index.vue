<template>
    <PageQueryTable 
        ref="pageQueryTableRef"
        :searchForm="searchFormItem" 
        v-model:columns="columns"
        v-model:data="data"

        :maskFields="['searchKey4']"
        :action="['add', 'edit', 'delete', 'view', 'export', 'import']"
        method="post"
    />
</template>

<script lang="ts" setup>
const pageQueryTableRef = ref()

const searchFormItem = [{
    label: '搜索条件1',
    name: 'searchKey1',
    component: 'a-input',
}, {
    label: '搜索条件2',
    name: 'searchKey2',
    component: 'a-input'
}, {
    label: '搜索条件3',
    name: 'searchKey3',
    component: 'a-select',
    props: {
        options: [{
            label: '选项1',
            value: 1
        }, {
            label: '选项2',
            value: 2
        }]
    }
}, {
    label: '搜索条件4',
    name: 'searchKey4',
    component: 'a-range-picker',
    rangeKey: ['date1', 'date2'],
    props: {
        valueFormat: 'YYYY-MM-DD'
    }
}]

const columns = ref([{
    title: '序号',
    dataIndex: 'index'
},{
    title: 'Key',
    dataIndex: 'key',
    isShow: true
}, {
    title: 'Name',
    dataIndex: 'name',
    isShow: true
}, {
    title: 'Age',
    dataIndex: 'age',
    isShow: true
}, {
    title: 'Address',
    dataIndex: 'address',
    isShow: true
}])

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
]
</script>

<style lang="less" scoped>

</style>