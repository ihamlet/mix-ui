<template>
    <a-page-header 
        :title="title" 
        :sub-title="subTitle" 
        @back="router.go(-1)"
        style="padding: 0 24px; border-bottom: 1px solid #ddd;"
    >
        <template #extra>
            <a-button @click="open = true"><i class="ri-upload-line"></i>导入Excel</a-button>
            <a-button><i class="ri-download-line"></i>导出Excel</a-button>
            <a-button type="primary"><i class="ri-save-line"></i>保存</a-button>
        </template>
    </a-page-header>
    <div ref="univerExcelRef" style="height: calc(100vh - 41px)"></div>
    <a-modal v-model:open="open" title="导入Excel" @ok="handleOk">
        <a-upload-dragger
            :beforeUpload="beforeUpload"
            v-model:fileList="fileList">
            <a-space direction="vertical">
                <i style="font-size:45px" class="ri-file-excel-2-line"></i>
                <a-typography-text>点击或拖拽导入Excel文件</a-typography-text>
                <a-typography-text type="secondary">仅支持excel格式文件 .xls .xlsx .cvs</a-typography-text>
            </a-space>
        </a-upload-dragger>
    </a-modal>
</template>
<script lang="ts" setup>
import type { UploadProps } from 'ant-design-vue'
const router = useRouter()
const univerExcelRef = ref()
const univerExcel = useUniverExcel(univerExcelRef)

const open = ref(false)
const fileList = ref()

withDefaults(defineProps<{
    title: string
    subTitle: string
}>(), {
    title: 'Excel',
    subTitle: '创建EXCEL表单'
})

const beforeUpload:UploadProps['beforeUpload'] = async (file:File) => {
    const data = await excelImport(file)
    univerExcel.createExcel(data)
    return false
}

const handleOk = () => {
    univerExcel.getData()
}
</script>
<style lang="less" scoped>

</style>