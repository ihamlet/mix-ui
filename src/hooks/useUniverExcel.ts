import { Univer, LocaleType, Tools, Workbook, UniverInstanceType } from '@univerjs/core'
import { defaultTheme  } from '@univerjs/design'
 
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
 
import { UniverUIPlugin } from '@univerjs/ui'
 
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
 
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'

import { FUniver } from '@univerjs/facade'

import { UniverDataValidationPlugin } from '@univerjs/data-validation'
import { UniverSheetsDataValidationPlugin } from '@univerjs/sheets-data-validation'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverFindReplacePlugin } from '@univerjs/find-replace'
import { UniverSheetsFindReplacePlugin } from '@univerjs/sheets-find-replace'
import { UniverSheetsConditionalFormattingUIPlugin } from '@univerjs/sheets-conditional-formatting-ui'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import { UniverSheetsHyperLinkUIPlugin } from '@univerjs/sheets-hyper-link-ui'
import { UniverDrawingPlugin } from '@univerjs/drawing'
import { UniverDrawingUIPlugin } from '@univerjs/drawing-ui'
import { UniverSheetsDrawingPlugin } from '@univerjs/sheets-drawing'
import { UniverSheetsDrawingUIPlugin } from '@univerjs/sheets-drawing-ui'
import { UniverSheetsFilterPlugin } from '@univerjs/sheets-filter'
import { UniverSheetsFilterUIPlugin } from '@univerjs/sheets-filter-ui'

import DesignZhCN from '@univerjs/design/locale/zh-CN'
import DocsUIZhCN from '@univerjs/docs-ui/locale/zh-CN'
import SheetsZhCN from '@univerjs/sheets/locale/zh-CN'
import SheetsUIZhCN from '@univerjs/sheets-ui/locale/zh-CN'
import UIZhCN from '@univerjs/ui/locale/zh-CN'

import SheetsNumfmtZhCN from '@univerjs/sheets-numfmt/locale/zh-CN'
import SheetsHyperLinkUIZhCN from '@univerjs/sheets-hyper-link-ui/locale/zh-CN'
import DrawingUIZhCN from '@univerjs/drawing-ui/locale/zh-CN'
import SheetsDrawingUIZhCN from '@univerjs/sheets-drawing-ui/locale/zh-CN'
import FindReplaceZhCN from '@univerjs/find-replace/locale/zh-CN'
import SheetsFindReplaceZhCN from '@univerjs/sheets-find-replace/locale/zh-CN'
import SheetsFilterUIZhCN from '@univerjs/sheets-filter-ui/locale/zh-CN'
import SheetsDataValidationZhCN from '@univerjs/sheets-data-validation/locale/zh-CN'
import SheetsConditionalFormattingUIZhCN from '@univerjs/sheets-conditional-formatting-ui/locale/zh-CN'

const useUniverExcel = (container: Ref<string | HTMLElement | undefined>) => {
    const univerAPI = ref()
    const univerRef = ref<Univer | null>(null)
    const workbook = ref<Workbook | null>(null)
    
    const init = () => {
        const univer = new Univer({
            theme: defaultTheme,
            locale: LocaleType.ZH_CN,
            locales: {
              [LocaleType.ZH_CN]: Tools.deepMerge(
                DesignZhCN,
                DocsUIZhCN,
                SheetsZhCN,
                SheetsUIZhCN,
                UIZhCN,
                SheetsNumfmtZhCN,
                SheetsHyperLinkUIZhCN,
                DrawingUIZhCN,
                SheetsDrawingUIZhCN,
                FindReplaceZhCN,
                SheetsFindReplaceZhCN,
                SheetsFilterUIZhCN,
                SheetsDataValidationZhCN,
                SheetsConditionalFormattingUIZhCN
              ),
            },
        })
        
        univerRef.value = univer
        univer.registerPlugin(UniverRenderEnginePlugin)
        univer.registerPlugin(UniverFormulaEnginePlugin)
        
        univer.registerPlugin(UniverUIPlugin, { container: container?.value })
        
        univer.registerPlugin(UniverDocsPlugin, {
            hasScroll: false,
        })
        univer.registerPlugin(UniverDocsUIPlugin)
        // sheet plugins
        univer.registerPlugin(UniverSheetsPlugin)
        univer.registerPlugin(UniverSheetsUIPlugin)
        univer.registerPlugin(UniverSheetsFormulaPlugin)
        
        /*-- 补充功能 --*/
        univer.registerPlugin(UniverDataValidationPlugin)
        univer.registerPlugin(UniverSheetsDataValidationPlugin)
        univer.registerPlugin(UniverSheetsHyperLinkUIPlugin)
        univer.registerPlugin(UniverSheetsNumfmtPlugin)
        univer.registerPlugin(UniverFindReplacePlugin)
        univer.registerPlugin(UniverSheetsFindReplacePlugin)
        univer.registerPlugin(UniverSheetsConditionalFormattingUIPlugin)
        univer.registerPlugin(UniverSheetsZenEditorPlugin)
        univer.registerPlugin(UniverDrawingPlugin)
        univer.registerPlugin(UniverDrawingUIPlugin)
        univer.registerPlugin(UniverSheetsDrawingPlugin)
        univer.registerPlugin(UniverSheetsDrawingUIPlugin)
        univer.registerPlugin(UniverSheetsFilterPlugin)
        univer.registerPlugin(UniverSheetsFilterUIPlugin)
    
        workbook.value = univer.createUnit(UniverInstanceType.UNIVER_SHEET, {}) as Workbook
        univerAPI.value = FUniver.newAPI(univerRef.value as Univer)
        console.log(univerAPI.value)
    }

    const destroyUniver = () => {
        univerRef.value?.dispose()
        univerRef.value = null
        workbook.value = null
    }
    
    onMounted(() => init())
    onBeforeUnmount(() => destroyUniver())

    const getData = () => {
        if (!workbook.value) {
            throw new Error('Workbook is not initialized')
        }
        
        return workbook.value.save()
    }
    
    const createExcel = (data: Record<string, any>) => {
        console.log(workbook.value?.save())
        univerAPI.value.createUniverSheet(data)
    }

    return {
        univerRef,
        univerAPI,
        workbook,
        createExcel,
        getData
    }
}

export default useUniverExcel