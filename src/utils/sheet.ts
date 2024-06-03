import type { ICellData } from '@univerjs/core'
import * as XLSX from 'xlsx'
import { v4 as uuidv4 } from 'uuid'

const fileToB64 = (file: File): any => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

const dataURItoBlob = (dataURI: string):Blob => {  
    var byteString = atob(dataURI.split(',')[1])
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]  
    var ab = new ArrayBuffer(byteString.length)  
    var ia = new Uint8Array(ab)
    for (var i = 0; i < byteString.length; i++) {  
        ia[i] = byteString.charCodeAt(i)
    }  
    return new Blob([ab], {type: mimeString})
}

const parseXLSXToUniverData = (data: string[][]): ICellData[][] => {
    return data.map((row) => {
        return row.map((cell) => {
            return {
                v: cell || '',
            }
        })
    })
}

type Sheets = Record<string, {
    id: string
    name: string
    cellData: ICellData[][]
}>

export const excelImport = async (file: File) => {
    const fileData = await (await fetch(await fileToB64(file))).arrayBuffer()
    const workbook = await XLSX.read(fileData)
    console.log('--->', workbook)
    let sheets:Sheets = {}
    const sheetData = workbook.SheetNames.map(sheetNames => {
        return {
            id: uuidv4(),
            name: sheetNames,
            rawData: XLSX.utils.sheet_to_json(
                workbook.Sheets[sheetNames], { header: 1 }
            )
        }
    })

    sheetData.forEach(item => {
        sheets[item.id] = {
            id: item.id,
            name: item.name,
            cellData: parseXLSXToUniverData(item.rawData as string[][])
        }
    })

    const excelData = {
        id: uuidv4(),
        locale: 'zhCN',
        sheetOrder: sheetData.map(sheet => sheet.id),
        sheets
    }

    console.log(excelData)

    return excelData
}