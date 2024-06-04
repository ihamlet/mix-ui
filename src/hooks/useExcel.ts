import zhCN from 'x-data-spreadsheet/src/locale/zh-cn'
import Spreadsheet from 'x-data-spreadsheet'

const useExcel = (container: string | HTMLElement = '#excel') => {
    const s = ref()
    const init = () => {
        Spreadsheet.locale('zh-cn', zhCN)
        s.value = new Spreadsheet(container, {
            mode: 'edit',
            showToolbar: false, // 是否展示工具条
            showContextmenu: false, // 是否展示右键菜单
            showBottomBar: false // 是否展示底部功能条
        }).loadData({})
    }

    onMounted(() => init())

    return {
        s
    }
}

export default useExcel