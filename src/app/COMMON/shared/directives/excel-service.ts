import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Xliff2 } from '@angular/compiler';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {
    constructor() { }
    
    // public exportAsExcelFile(json: any[], excelFileName: string, datetime: string): void {
    //    
    //     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    //     const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    //     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //     this.saveAsExcelFile(excelBuffer, excelFileName, datetime);
    // }
    public exportAsExcelFile(json: any[], excelFileName: string, datetime: any): void {
       
        const header = Object.keys(json[0]);
        var wscols = [];
        for (var i = 0; i < header.length; i++) {  // columns length added
            wscols.push({ wch: header[i].length + 5 })
        }
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        worksheet["!cols"] = wscols;
        // worksheet['!rows'] = [{ hpx: 40}];
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array', cellDates: true, cellStyles: true });
        this.saveAsExcelFile(excelBuffer, excelFileName, datetime);
        worksheet['B1'].s = { font: { bold: true } };
    }
    private saveAsExcelFile(buffer: any, fileName: string, datetime: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        let dateTime = datetime.split(" ").join(" at ");
        FileSaver.saveAs(data, fileName + ' Excel on ' + dateTime + EXCEL_EXTENSION);
    }

    public exportAsExcelFileSupplier(json: any[], excelFileName: string, datetime: string): void {
       
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        // if (json.length > 0) {

        //     for (let i = 0; i < Object.keys(json[0]).length; i++)
        //         worksheet.getColumn((i + 1)).width = 15;
        // }
        this.saveAsExcelFile(excelBuffer, excelFileName, datetime);
    }

    public exportAsExcelTableRecord(tableName: string, excelFileName: string, datetime: string): void {
        const tableRecord: HTMLElement = document.getElementById(tableName);
        const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_book(tableRecord).Sheets.Sheet1;
        const workbook: XLSX.WorkBook = { SheetNames: [excelFileName], Sheets: { excelFileName: worksheet } };
        workbook.Sheets[excelFileName] = worksheet;
        let dateTime = datetime.split(" ").join(" at ");
        return XLSX.writeFile(workbook, excelFileName + ' Excel on ' + dateTime + "." + 'xlsx');
    }
}