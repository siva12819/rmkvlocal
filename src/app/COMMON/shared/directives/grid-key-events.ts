import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class GridKeyEvents {

    private focusInput(rowIndex: number, key: string, _this: any): void {
        let inputEls = _this[key].toArray();
        let splitedValue = Object.keys(inputEls[0]);
        if ("nativeElement" === splitedValue[0].toString()) {
            inputEls[rowIndex].nativeElement.focus();
            if (inputEls[rowIndex].nativeElement.select)
                inputEls[rowIndex].nativeElement.select();
        } else {
            _this[key]._results[rowIndex].filterInput.nativeElement.focus();
        }
    }

    public focusDown(rowIndex: number, colIndex: number, listObjectKey: any, _this: any, toArray: any): void {
        rowIndex = Math.min(rowIndex + 1, toArray.length - 1);
        this.focusInput(rowIndex, listObjectKey[colIndex].display, _this);
    }

    public focusUp(rowIndex: number, colIndex: number, listObjectKey: any, _this: any): void {
        rowIndex = Math.max(0, rowIndex - 1);
        this.focusInput(rowIndex, listObjectKey[colIndex].display, _this);
    }

    public focusLeft(rowIndex: number, colIndex: number, listObjectKey: any, _this: any, toArray: any): void {
        if (colIndex === colIndex - 1 - listObjectKey.slice(0, colIndex).reverse().findIndex((c: any) => c.editable)
            && rowIndex < toArray.length && rowIndex > 0) {
            rowIndex = rowIndex - 1;
            colIndex = listObjectKey.length;
        }
        colIndex = colIndex - 1 - listObjectKey.slice(0, colIndex).reverse().findIndex((c: any) => c.editable);
        this.focusInput(rowIndex, listObjectKey[colIndex].display, _this);
    }

    public focusRight(rowIndex: number, colIndex: number, listObjectKey: any, _this: any, toArray: any): void {
        if (colIndex === listObjectKey.length - 1 && rowIndex !== toArray.length - 1) {
            rowIndex = rowIndex + 1;
            colIndex = 0;
        }
        colIndex = colIndex + 1 + listObjectKey.slice(colIndex + 1).findIndex((c: any) => c.editable);
        this.focusInput(rowIndex, listObjectKey[colIndex].display, _this);
    }

    public onEnterKeyFocus(rowIndex: number, colIndex: number, listObjectKey: any, _this: any, toArray: any): boolean {
        let isAddNewRow: boolean = false;
        if (colIndex === listObjectKey.length - 2 && rowIndex !== toArray.length - 1) {
            rowIndex = rowIndex + 1;
            colIndex = 0;
        } else if (colIndex === listObjectKey.length - 2 && rowIndex === toArray.length - 1) {
            isAddNewRow = true;
        }
        colIndex = colIndex + 1 + listObjectKey.slice(colIndex + 1).findIndex((c: any) => c.editable);
        this.focusInput(rowIndex, listObjectKey[colIndex].display, _this);
        return isAddNewRow;
    }

    findTableIndex(event: KeyboardEvent | any): number {
        var i = 0;
        var elementparent = event.srcElement.parentElement.parentElement.children;
        for (i = 0; i < elementparent.length; i++) {
          var first = event.srcElement.parentElement.outerHTML;
          var second = elementparent[i].outerHTML;
          if (first === second) {
            return i;
          }
        }
      }

    public checkDuplicateColumn(listKey: any, objKey: string): boolean {
        for (let i = 0; i < listKey.length; i++) {
            for (let j = 0; j < listKey.length; j++) {
                if (i !== j && listKey[i][objKey].toString().trim() === listKey[j][objKey].toString().trim()) {
                    return false;
                }
            }
        }
        return true;
    }
}
