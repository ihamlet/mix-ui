<template>
    <a-config-provider 
      :locale="zhCN" 
      prefixCls="mix"
      :wave="{ disabled: true }"
      :theme="{
         algorithm: [width < 1890 ? compactAlgorithm : defaultAlgorithm]
      }"
    >
        <router-view />
    </a-config-provider>
 </template>
 <script setup lang="ts">
 import { theme } from 'ant-design-vue'
 import zhCN from 'ant-design-vue/es/locale/zh_CN'
 const { darkAlgorithm, compactAlgorithm, defaultAlgorithm } = theme
 const { width } = useSize(document.querySelector('body'))
 </script>