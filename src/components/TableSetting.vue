<template>
   <div class="table-setting">
        <VueDraggableNext :list="column" filter=".index,.operation">
            <a-card
                v-for="(item, index) in (column as ColumnItem[])"
                size="small" 
                :key="`draggable-card-${index}`"
                :class="['table-setting-draggable-card', item.dataIndex]"
            >
                <template #title>
                    <div style="padding-right: 50px;">
                        {{ item.title }}
                    </div> 
                </template>
                <template #extra v-if="!['index', 'operation'].includes(item.dataIndex as string)">
                    <a-checkbox
                        v-model:checked="item.isShow">
                        {{ item.isShow ? '显示' : '隐藏' }}
                    </a-checkbox>
                    <i class="ri-draggable draggable"></i>
                </template>
            </a-card>
        </VueDraggableNext>
   </div>
</template>
<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import type { TableColumnType } from 'ant-design-vue'
export interface ColumnItem extends TableColumnType {
    isShow: boolean
}

const column = defineModel('column', {type: Array<ColumnItem>, default: []})
</script>
<style scoped lang="less">
.draggable{
    cursor: grab;
    &:active {
        cursor: grabbing;
    }
}
</style>