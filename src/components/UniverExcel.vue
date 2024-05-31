<template>
    <a-page-header 
        :title="title" 
        :sub-title="subTitle" 
        @back="router.go(-1)"
        style="padding: 0 24px; border-bottom: 1px solid #ddd;"
    >
        <template #extra>
            <a-button><i class="ri-upload-line"></i>导入Excel</a-button>
            <a-button><i class="ri-download-line"></i>导出Excel</a-button>
            <a-button type="primary"><i class="ri-save-line"></i>保存</a-button>
        </template>
    </a-page-header>
    <div ref="univerExcelRef" style="height: calc(100vh - 41px)"></div>
</template>
<script lang="ts" setup>
const router = useRouter()
const univerExcelRef = ref()
const univerExcel = useUniverExcel(univerExcelRef)

withDefaults(defineProps<{
    title: string
    subTitle: string
}>(), {
    title: 'Excel',
    subTitle: '创建EXCEL表单'
})
</script>
<style lang="less" scoped>

</style>