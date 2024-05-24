<template>
  <Page>
    <a-card>
      <a-row>
        <a-col :span="24">
            <a-form class="search-form" ref="formRef" :model="formState">
                <a-row :gutter="24">
                <template v-for="item in searchForm" :key="item.name">
                    <a-col :span="8">
                    <a-form-item :label="item.label" :name="item.name">
                        <component
                        style="width: 100%"
                        v-model:value="formState[item.name]"
                        :is="item.component"
                        allowClear
                        v-bind="item.props"
                        v-on="item.event"
                        @change="(value: Value) => handleChange(item.rangeKey, value)"
                        />
                    </a-form-item>
                    </a-col>
                </template>
                </a-row>
                <a-row>
                <a-col :span="24" style="text-align: right">
                    <a-space>
                        <a-button 
                            type="primary" 
                            html-type="submit" 
                            @click="handleSearch"
                        >
                            搜索
                        </a-button>
                        <a-button @click="handleReset">重置</a-button>
                    </a-space>
                </a-col>
                </a-row>
            </a-form>
        </a-col>
        <a-divider />
      </a-row>
      <a-row>
        <a-col :span="24">
            <a-card
            class="table-card"
            :bordered="false"
            :style="{
                padding: 0,
                width: '100%',
            }"
            >
            <template #title>
                <a-row>
                    <a-col :span="12">
                        <slot name="toolbar"></slot>
                        <a-button type="text" v-if="page.isAction('import')">
                            <i class="ri-upload-line"></i>导入
                        </a-button>
                        <a-button type="text"  v-if="page.isAction('export')">
                            <i class="ri-download-line"></i>导出
                        </a-button>
                        <a-popover placement="right" trigger="click">
                            <template #content>
                                <TableSetting v-model:column="columns" />
                            </template>
                            <a-button type="text">
                                <i class="ri-settings-2-line" /> 列表设置
                            </a-button>
                        </a-popover>
                    </a-col>
                </a-row>
            </template>
            <a-table
                size="small"
                :scroll="{ x:true, y: `calc(100vh - ${bodyHeight / (bodyWidth < 1890 ? 1.7 : 2.1)}px)` }"
                :rowClassName="(_record, index):string => (index % 2 === 1 ? 'table-striped' : '')"
                :pagination="pagination || tablePagination"
                :bordered="bordered"
                :row-selection="rowSelection"
                :columns="tableColumns"
                :dataSource="dataSource"
                @change="handleTableChange"
                @resizeColumn="handleResizeColumn"
                sticky
            >
                <template #bodyCell="{ column, record, index }">
                <template v-if="column.dataIndex === 'index'">
                    {{ index + 1 }}
                </template>
                <template v-if="column.dataIndex === 'operation'">
                    <slot name="operation" :record="{ column, record, index }">
                    <a-button type="link" v-if="page.isAction('view')">
                        <i class="ri-file-search-line" />
                        查看
                    </a-button>
                    <a-button type="link" v-if="page.isAction('edit')">
                        <i class="ri-draft-line" />
                        编辑
                    </a-button>
                    <a-popconfirm
                        v-if="page.isAction('delete')"
                        title="确定要删除该条数据吗？"
                        ok-text="确定"
                        cancel-text="取消"
                    >
                        <a-button danger type="link">
                            <i class="ri-delete-bin-line" />
                            删除
                        </a-button>
                    </a-popconfirm>
                    </slot>
                </template>
                </template>
            </a-table>
            </a-card>
        </a-col>
      </a-row>
    </a-card>
  </Page>
</template>
<script lang="ts" setup>
import { Props } from "ant-design-vue/es/form/useForm"
import type {
  TableProps,
  TableColumnType,
  TablePaginationConfig,
} from "ant-design-vue"
import type { ActionType } from './../hooks/usePage'
import type { ColumnItem } from "./TableSetting.vue"
const page = usePage()

type Value = string | number | (string | number)[] | undefined

interface SearchForm {
  label: string
  name: string
  component: string
  props?: Props
  rangeKey?: string[] | undefined
  event?: Function
}

const props = withDefaults(defineProps<{
  defaultParams?: Record<string, Value>
  maskFields?: string[]
  searchForm: SearchForm[]
  rowSelection?: TableProps["rowSelection"]
  bordered?: boolean
  pagination?: TablePaginationConfig
  api?: string
  method?: 'post' | 'get'
  action?: ActionType[]
}>(), {
  api: '/api',
  method: 'get'
})

watchEffect(() => {
    console.log(props.action)
    page.setAction(props.action as ActionType[])
})

const tablePagination = ref({
  current: 1,
  pageSize: 10,
  total: 1000,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
})

type HandleResizeColumn =
  | ((w: number, col: TableColumnType) => void)
  | undefined
const handleResizeColumn: HandleResizeColumn = (w, col) => (col.width = w)

const formState = ref<Record<string, any>>({})
const columns = defineModel("columns", {
  type: Array<ColumnItem>,
  default: [],
})
const tableColumns = computed(() => {
  const exclude = ["operation", "index"]

  let columnsData = columns.value

  if (
    props.action?.length && 
    props.action?.filter(item => ['view', 'edit', 'delete'].includes(item)).length &&
    !columns.value.find(item => item.dataIndex === 'operation')
  ) {
    columnsData = [...columns.value, {title: '操作', dataIndex: 'operation'} as ColumnItem]
  }

  return columnsData.map((item) => {
      if (item.dataIndex === "index") {
        item.width = 50
      }

      if (item.dataIndex === "operation") {
        item.width = 260
        item.fixed = "right"
      }

      return item
    })
    .filter(
      (item: ColumnItem) =>
        exclude.includes(item.dataIndex as string) || item.isShow
    )
})

const dataSource = defineModel("data", { type: Array, default: [] })
const customRangeKey = ref<string[]>([])

const handleChange = (
  rangeKey: SearchForm["rangeKey"],
  value: Value
) => {
  if (rangeKey && Array.isArray(value)) {
    const [dateStart, dateEnd] = rangeKey
    customRangeKey.value.push(...rangeKey)
    const [start, end] = value

    formState.value[dateStart] = `${start} 00:00:00`
    formState.value[dateEnd] = `${end} 23:59:59`
  }
}

const { height: bodyHeight, width: bodyWidth } = useSize(document.querySelector('body'))
useKeyPress('enter', () => handleSearch())

const formRef = ref()

const handleReset = () => {
  const rangeKey = [...new Set(customRangeKey.value)]
  rangeKey.forEach((key:string) => formState.value[key] = undefined)
  formRef.value.resetFields()
}

const handleTableChange = (pagination: TablePaginationConfig) => {
  tablePagination.value.current = pagination.current as number
  tablePagination.value.pageSize = pagination.pageSize as number
  getData()
}

const handleSearch = () => {
  tablePagination.value.current = 1
  getData()
}

const getData = () => {
  let params: Record<string, Value> = {
    current: tablePagination.value.current,
    pageSize: tablePagination.value.pageSize,
    ...formState.value,
    ...props.defaultParams
  }

  if (props.maskFields?.length) {
    props.maskFields.forEach((key:string) => params[key] = undefined)
  }

  console.log(filterEmptyValues(params))
}
</script>
<style lang="less" scoped>

</style>
