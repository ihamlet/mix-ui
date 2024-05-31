import { Univer, LocaleType, Tools, Workbook, UniverInstanceType } from '@univerjs/core'
import { defaultTheme, zhCN as DesignZhCN  } from '@univerjs/design'
 
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
 
import { UniverUIPlugin, zhCN as UIZhCN } from '@univerjs/ui'
 
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin, zhCN as DocsUIZhCN } from '@univerjs/docs-ui'
 
import { UniverSheetsPlugin, zhCN as SheetsZhCN } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsUIPlugin, zhCN as SheetsUIZhCN } from '@univerjs/sheets-ui'

import { CollaborationPlugin } from '@univerjs-pro/collaboration'
// import { CollaborationClientPlugin } from '@univerjs-pro/collaboration-client'
// import { LiveSharePlugin } from '@univerjs-pro/live-share'
// import { UniverSheetsDataConnectorPlugin } from '@univerjs-pro/sheets-data-connector'
import { SheetsPrintPlugin } from '@univerjs-pro/sheets-print'
import { UniverSheetsExchangeClientPlugin } from '@univerjs-pro/sheets-exchange-client'

import { FUniver } from '@univerjs-pro/facade'

import { UniverDataValidationPlugin } from '@univerjs/data-validation'
import { UniverSheetsDataValidationPlugin, zhCN as SheetsDataValidationZhCN } from '@univerjs/sheets-data-validation'
import { UniverSheetsNumfmtPlugin, zhCN as SheetsNumfmtZhCN } from '@univerjs/sheets-numfmt'
import { UniverFindReplacePlugin,  zhCN as FindReplaceZhCN } from '@univerjs/find-replace'
import { UniverSheetsFindReplacePlugin } from '@univerjs/sheets-find-replace'
import { UniverSheetsConditionalFormattingUIPlugin, zhCN as SheetsConditionalFormattingUIZhCN } from '@univerjs/sheets-conditional-formatting-ui'
import { UniverSheetsZenEditorPlugin, zhCN as SheetsZenEditorZhCN } from '@univerjs/sheets-zen-editor'



const useUniverExcel = (container: Ref<string | HTMLElement | undefined>) => {
    const univerAPI = ref()
    const univerRef = ref<Univer | null>(null)
    const workbook = ref<Workbook | null>(null)
    
    const init = () => {
        if(univerRef.value) return
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
                SheetsDataValidationZhCN,
                SheetsNumfmtZhCN,
                FindReplaceZhCN,
                SheetsConditionalFormattingUIZhCN,
                SheetsZenEditorZhCN
              ),
            },
        })
        
        univerRef.value = univer

        univer.registerPlugin(UniverRenderEnginePlugin)
        univer.registerPlugin(UniverFormulaEnginePlugin)
        
        univer.registerPlugin(UniverUIPlugin, { 
            container: container?.value 
        })
        
        univer.registerPlugin(UniverDocsPlugin, {
            hasScroll: false,
        })
        univer.registerPlugin(UniverDocsUIPlugin)
        // sheet plugins
        univer.registerPlugin(UniverSheetsPlugin)
        univer.registerPlugin(UniverSheetsUIPlugin)
        univer.registerPlugin(UniverSheetsFormulaPlugin)
        // collaboration plugins
        univer.registerPlugin(CollaborationPlugin)
        // univer.registerPlugin(CollaborationClientPlugin)
        // univer.registerPlugin(LiveSharePlugin)
        // // data connector
        // univer.registerPlugin(UniverSheetsDataConnectorPlugin)
        // print
        univer.registerPlugin(SheetsPrintPlugin)
        // exchange
        univer.registerPlugin(UniverSheetsExchangeClientPlugin)
        
        /*-- 补充功能 --*/
        univer.registerPlugin(UniverDataValidationPlugin)
        univer.registerPlugin(UniverSheetsDataValidationPlugin)
        univer.registerPlugin(UniverSheetsNumfmtPlugin)
        univer.registerPlugin(UniverFindReplacePlugin)
        univer.registerPlugin(UniverSheetsFindReplacePlugin)
        univer.registerPlugin(UniverSheetsConditionalFormattingUIPlugin)
        univer.registerPlugin(UniverSheetsZenEditorPlugin)
    
        workbook.value = univer.createUnit(UniverInstanceType.UNIVER_SHEET, {}) as Workbook

        univerAPI.value = FUniver.newAPI(univerRef.value as Univer)
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
    
    return {
        univerRef,
        univerAPI,
        workbook,
        getData
    }
}

export default useUniverExcel