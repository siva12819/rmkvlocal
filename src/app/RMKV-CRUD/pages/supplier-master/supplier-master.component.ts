/*
'====================================================================================================================
    'Name                 :   Supplier Master
    'Author               :   Jayavenkateshwaramoorthy
    'Date of Creation     :   08-06-2021
    'Description          :   Supplier Master

'===========================Modification History=====================================================================
    'Date        |           Modified     |           Purpose                     |              Signature
'====================================================================================================================
 */

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { KeyPressEvents } from 'src/app/COMMON/shared/directives/key.press.events';
import { SupplierMaster } from '../../model/supplier-master-model';
import { SupplierMasterService } from '../../services/supplier-master/supplier-master.service';
import { EditMode } from 'src/app/COMMON/models/common-model';
import { ConfirmationDialogComponent } from 'src/app/COMMON/shared/confirmation-dialog/confirmation-dialog.component';
import { ExcelService } from 'src/app/COMMON/shared/directives/excel-service';
import { LocalStorage } from 'src/app/COMMON/shared/local-storage';
declare var jsPDF: any;
 
@Component({
  selector: 'app-supplier-master',
  templateUrl: './supplier-master.component.html',
  styleUrls: ['./supplier-master.component.scss'],
  providers: [DatePipe]
})
export class SupplierMasterComponent implements OnInit {

  componentVisibility: boolean = true;
  
  displayedColumns: string[] = ['Sno','Code', 'Name', 'GSTno', 'Action'];
  
  searchString: string = "";

  objAction: EditMode = {
    isEditing: false,
    isView: false
  };

  unChangedAction: EditMode = {
    isEditing: false,
    isView: false
  };

  objSupplierMaster: SupplierMaster = {
   supplier_code : '',
   supplier_name : '',
   supplier_gst_no : '',
   active : true,
   entered_by : this._localStorage.intGlobalUserId(),
  }

  objModifySupplierMaster: SupplierMaster = {
    supplier_code : '',
    supplier_name : '',
    supplier_gst_no : '',
    active : true,
    entered_by : this._localStorage.intGlobalUserId(),
   }

   unchangedModifySupplierMaster: SupplierMaster = {
    supplier_code : '',
    supplier_name : '',
    supplier_gst_no : '',
    active : true,
    entered_by : this._localStorage.intGlobalUserId(),
   }
  supplierMasterList: SupplierMaster[] = [];
  filterSupplierMasterList: SupplierMaster[] = [];
  dataSource: any = new MatTableDataSource([]);

  constructor(
    private _supplierMasterService: SupplierMasterService,
    public _localStorage: LocalStorage,
     public _keyPressEvents: KeyPressEvents,
    public _router: Router,
    private _confirmationDialogComponent: ConfirmationDialogComponent,
    public _matDialog: MatDialog,
    public _excelService: ExcelService,
    public _datePipe: DatePipe,
  ) { }

  ngOnInit() {
  this.getSupplierMasterList()
  }

   /************************************************ CRUD OPERATION ************************************************/

   public getSupplierMasterList(): void {
    this.matTableConfig([]);
      let obj = {
        active : 0
      }
      this._supplierMasterService.getSupplierMaster(obj).subscribe((result: SupplierMaster[]) => {
        console.log(result, "list")
        this.supplierMasterList = result;
        this.filterSupplierMasterList = result;
        this.supplierMasterList != null ? this.matTableConfig(this.supplierMasterList) : this._confirmationDialogComponent.openAlertDialogWithTimeout("No record found", "supplier Master List");
      });
    }

  public matTableConfig(tableRecords: SupplierMaster[]): void {
    this.dataSource = new MatTableDataSource(tableRecords);
  }

  public addSupplierMaster(): void {
    if (this.beforeSaveValidate()) {
      let objSave: any = {
          supplier_code: this.objSupplierMaster.supplier_code.toString().trim(),
          supplier_name: this.objSupplierMaster.supplier_name.toString().trim(),
          supplier_gst_no:this.objSupplierMaster.supplier_gst_no.toString().trim(),
          entered_by: this._localStorage.intGlobalUserId()
      };
      this._supplierMasterService.addSupplierMaster(objSave).subscribe((result: SupplierMaster) => {
        debugger;
        this.openSaveAlertDialog(this.objAction.isEditing ? "Changes have been saved" : "New supplier master record has been created", "Supplier Master", false);
        this.getSupplierMasterList();
      });
    }
  } 

  public modifyorView(isEditing: boolean, element:SupplierMaster, isView?: boolean): void {
    debugger;
    this.objAction = {
      isEditing: isEditing ? true : false,
      isView: isView ? true : false
    }
    this._supplierMasterService.fetchSupplierMaster(element).subscribe((result: SupplierMaster) => {
      if (result) {
        debugger;
        this.objAction.isEditing = true;
        this.objSupplierMaster = JSON.parse(JSON.stringify(result[0]));
        this.objModifySupplierMaster = JSON.parse(JSON.stringify(result[0]));
        this.componentVisibility = !this.componentVisibility;
      }
    });
  }

  public deActiveteSupplierCode(i): void {
    debugger
    let objCancel: SupplierMaster = {
      supplier_code: this.dataSource.data[i].supplier_code.toString().trim(),
      active: false,
      entered_by: this._localStorage.intGlobalUserId()
    }
    this._supplierMasterService.cancelSupplierMaster(objCancel).subscribe((result: SupplierMaster) => {
      debugger;
      if (result) {
        this._confirmationDialogComponent.openAlertDialog("deactiveted", "Supplier Master List");
        this.getSupplierMasterList();
      }
    });
  }

  public activeteSupplierMaster(i): void {
    debugger
    let objCancel: SupplierMaster = {
      supplier_code: this.dataSource.data[i].supplier_code.toString().trim(),
      active: true,
      entered_by: this._localStorage.intGlobalUserId()
    }
    this._supplierMasterService.cancelSupplierMaster(objCancel).subscribe((result: SupplierMaster) => {
      debugger;
      if (result) {
        this._confirmationDialogComponent.openAlertDialog("Activeted", "Supplier Master List");
        this.getSupplierMasterList();
      }
    });
  }
  /************************************************ Validation ************************************************/
  
  public onListClick(): void {
    this.objAction = JSON.parse(JSON.stringify(this.unChangedAction));
    this.getSupplierMasterList()
    this.componentVisibility = !this.componentVisibility;
  }

  public newClick(): void {
    this.objAction = JSON.parse(JSON.stringify(this.unChangedAction));
    this.resetScreen();
    this.componentVisibility = !this.componentVisibility;
  }
  
  public onClickExit(): void {
    this._router.navigate(['/RMKV-CRUD']);
  }

  private beforeSaveValidate(): boolean { 
    if ([null, undefined, 0, ""].indexOf(this.objSupplierMaster.supplier_gst_no) !== -1 || !this.objSupplierMaster.supplier_gst_no.toString().trim()) {
      document.getElementById('gstNo').focus();
      this._confirmationDialogComponent.openAlertDialog("Enter gst no", "Supplier Master");
      this.objSupplierMaster.supplier_gst_no = ""
      return false;
    } else if ([null, undefined, 0, ""].indexOf(this.objSupplierMaster.supplier_name) !== -1 || !this.objSupplierMaster.supplier_name.toString().trim()) {
      document.getElementById('supplierName').focus();
      this._confirmationDialogComponent.openAlertDialog("Enter supplier name", "Supplier Master");
      this.objSupplierMaster.supplier_name = ""
      return false;
    } else {
      return true;
    }
  }

  public searchSupplierCode(searchValue: string): void {
    searchValue = searchValue.toString().trim();
    searchValue = searchValue ? searchValue.toString().toLocaleLowerCase() : "";
    this.searchString = searchValue;
    let FilterSupplierMaster = this.filterSupplierMasterList.filter(element =>
      element.supplier_code.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    this.matTableConfig(FilterSupplierMaster);
  }

  public radioChange(event: MatRadioChange): void {
    this.filterSupplierMasterList = [];
    if (event.value === 1) {
      this.supplierMasterList.forEach(element => {
        if (+element.active === 1) {
          this.filterSupplierMasterList.push(element);
        }
      });
    } else if (event.value === 0) {
      this.supplierMasterList.forEach(element => {
        if (+element.active === 0) {
          this.filterSupplierMasterList.push(element);
        }
      });
    } else {
      this.supplierMasterList.forEach(element => {
        this.filterSupplierMasterList.push(element);
      });
    }
    this.searchSupplierCode(this.searchString);
  }

  public onClear(exitFlag: boolean): void {
    if (this.checkAnyChangesMade())
      this.openConfirmationDialogs(exitFlag ? "Changes will be lost. Are you sure?" : "Do you want to clear the fields?", exitFlag);
    else if (exitFlag)
      this.onListClick();
  }

  private resetScreen(): void {
    if (this.objAction.isEditing) {
      this.objSupplierMaster = JSON.parse(JSON.stringify(this.objModifySupplierMaster));
      this.objModifySupplierMaster = JSON.parse(JSON.stringify(this.objModifySupplierMaster));
    } else {
      this.objAction = JSON.parse(JSON.stringify(this.unChangedAction));
      this.objSupplierMaster = JSON.parse(JSON.stringify(this.unchangedModifySupplierMaster));
      this.objModifySupplierMaster = JSON.parse(JSON.stringify(this.unchangedModifySupplierMaster));
    }
  }
  
private checkAnyChangesMade(): boolean {
  debugger;
  if (JSON.stringify(this.objSupplierMaster) !== ((this.objAction.isEditing) ? JSON.stringify(this.objModifySupplierMaster)
    : JSON.stringify(this.unchangedModifySupplierMaster)))
    return true;
  else
    return false;
}

/************************************************ Dialogs ************************************************/

private openConfirmationDialogs(message: string, exitFlag?: boolean): void {
  let dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
    panelClass: "custom-dialog-container",
    data: { confirmationDialog: 1 }
  });
  dialogRef.componentInstance.confirmMessage = message;
  dialogRef.componentInstance.componentName = "Supplier Master";
  dialogRef.afterClosed().subscribe(result => {
    if (result)
      exitFlag ? this.onListClick() : this.resetScreen();
    dialogRef = null;
  });
}

public onClickDeactivate(i): any {
  let _dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
    panelClass: "custom-dialog-container",
    data: { confirmationDialog: 1 }
  });
  _dialogRef.componentInstance.confirmMessage =
  "Do you want to deactive of supplier code'" + this.dataSource.data[i].supplier_code + "'";
  _dialogRef.componentInstance.componentName = "Supplier Master";
  return _dialogRef.afterClosed().subscribe(result => {
    if (result)
      this.deActiveteSupplierCode(i);
    _dialogRef = null;
  });
}

public onClickActive(i): any {
  let _dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
    panelClass: "custom-dialog-container",
    data: { confirmationDialog: 1 }
  });
  _dialogRef.componentInstance.confirmMessage =
  "Do you want to activate of supplier code'" + this.dataSource.data[i].supplier_code + "'";
  _dialogRef.componentInstance.componentName = "Supplier Master";
  return _dialogRef.afterClosed().subscribe(result => {
    if (result)
      this.activeteSupplierMaster(i);
    _dialogRef = null;
  });
}

private openSaveAlertDialog(message: string, componentName?: string, isRemove?: boolean) {
  let _dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
    panelClass: "custom-dialog-container",
    data: { confirmationDialog: 0 }
  });
  _dialogRef.componentInstance.alertMessage = message;
  _dialogRef.componentInstance.componentName = componentName;
  _dialogRef.afterClosed().subscribe(result => {
    if (result && !isRemove)
      this.onListClick();
    else
      this.getSupplierMasterList();
    _dialogRef = null;
  });
}

public onlyAllowCharacters(event: KeyboardEvent | any): boolean {
  const pattern = /^[a-zA-Z ]*$/;
  if (!pattern.test(event.key))
    return false;
  else
    return true;
} 

/************************************************ Exports ************************************************/
exportToExcel(): void {
  debugger
  if (this.dataSource.data.length != 0) {
    const datetime = this._datePipe.transform(new Date(), "dd-MM-yyyy hh:mm:a");
    const customerArr = [];
    for (let i = 0; i < this.dataSource.data.length; i++) {
      customerArr[i] = Object.assign({
        "Supplier Code": this.dataSource.data[i].supplier_code,
        "Supplier Name": this.dataSource.data[i].supplier_name,
        "GST No": this.dataSource.data[i].supplier_gst_no,
      });
    }
    this._excelService.exportAsExcelFileSupplier(
      customerArr,
      "Supplier Master",
      datetime
    );
  } else
    this._confirmationDialogComponent.openAlertDialogWithTimeout("No record found, Load the data first", "Supplier Master");
}

exportToPdf(): void {
  debugger
  if (this.dataSource.data.length != 0) {
    var prepare = [];
    this.supplierMasterList.forEach(e => {
      var tempObj = [];
      tempObj.push(e.supplier_code);
      tempObj.push(e.supplier_name);
      tempObj.push(e.supplier_gst_no);
      prepare.push(tempObj);
    });
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Supplier Code','Supplier Name', 'GST No']],
      body: prepare,
      didParseCell: function (table) {
        if (table.section === 'head') {
          table.cell.styles.textColor = '#FFFFFF';
          table.cell.styles.fillColor = '#d32f2f';
        }
      }
    });
    doc.save('Supplier Master' + '.pdf');
  } else
    this._confirmationDialogComponent.openAlertDialogWithTimeout("No record found, Load the data first", "Supplier Master");
}


}
