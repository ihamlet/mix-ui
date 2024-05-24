<template>
    <a-layout>
        <a-layout-content class="page-container">        
            <a-flex vertical>
                <keep-alive v-if="keepAlive">
                    <slot />
                </keep-alive>
                <slot v-else />
            </a-flex>
        </a-layout-content>
    </a-layout>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{
    keepAlive?: boolean
}>(), {
    keepAlive: true
})
</script>
<style lang="less" scoped>
.page-container{
    padding: 10px;
    min-height: 100vh;
}
</style>