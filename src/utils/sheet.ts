import * as XLSX from 'xlsx'

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

export const excelImport = async (file: File) => {
    const fileData = await (await fetch(await fileToB64(file))).arrayBuffer()
    console.log(fileData)
}