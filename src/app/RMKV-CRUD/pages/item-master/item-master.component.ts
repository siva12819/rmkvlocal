/*
'====================================================================================================================
    'Name                 :   Item Master
    'Author               :   Mohammed Sulthan Fazil B
    'Date of Creation     :   08-06-2021
    'Description          :   Item Master

'===========================Modification History=====================================================================
    'Date        |           Modified     |           Purpose                     |              Signature
'====================================================================================================================
 */

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemLoad, ItemMaster } from '../../model/item-master-model';
import { ItemMasterService } from '../../services/item-master/item-master.service';
import { EditMode } from 'src/app/COMMON/models/common-model';
import { ConfirmationDialogComponent } from 'src/app/COMMON/shared/confirmation-dialog/confirmation-dialog.component';
import { ExcelService } from 'src/app/COMMON/shared/directives/excel-service';
import { LocalStorage } from 'src/app/COMMON/shared/local-storage';
declare var jsPDF: any;

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.scss'],
  providers: [DatePipe]
})
export class ItemMasterComponent implements OnInit {

  objLoad: ItemLoad = {
    active: 2
  }

  objItemMaster: ItemMaster = {
    item_code: "-NEW-",
    uom: '',
    active: true,
    item_description: '',
    entered_by: this._localStorage.intGlobalUserId()
  }

  objModifyItemMaster: ItemMaster = {
    item_code: "-NEW-",
    uom: '',
    active: true,
    item_description: '',
    entered_by: this._localStorage.intGlobalUserId()
  }

  objUnchangedItemMaster: ItemMaster = {
    item_code: "-NEW-",
    uom: '',
    active: true,
    item_description: '',
    entered_by: this._localStorage.intGlobalUserId()
  }

  objAction: EditMode = {
    isEditing: false,
    isView: false,
  };

  unChangedAction: EditMode = {
    isEditing: false,
    isView: false,
  };

  componentVisibility: boolean = true;
  itemMasterList: ItemMaster[] = [];
  filterItemMasterList: ItemMaster[] = [];
  searchString: string = "";
  displayedColumns: string[] = ['SNo', 'Item_Code', 'Item_Description', 'Uom', 'Action'];
  dataSource: any = new MatTableDataSource([]);
  value: any = '';
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(
    public _localStorage: LocalStorage,
    public _router: Router,
    public _datePipe: DatePipe,
    public _dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    public _matDialog: MatDialog,
    public _confirmationDialogComponent: ConfirmationDialogComponent,
    public _excelService: ExcelService,
    private _itemMasterService: ItemMasterService,
  ) { }

  

  ngOnInit() {
    this.getItemMaster();
  }

  /************************************************ ITEM MASTER FUNCTIONALITIES ************************************************/

  public saveItemMaster(): void {     // ADD A NEW ITEM MASTER
    if (this.beforeSaveValidate()) {
      let objItem: ItemMaster = {
        item_code: this.objAction.isEditing? this.objItemMaster.item_code : '',
        item_description: this.objItemMaster.item_description.toString().trim(),
        uom: this.objItemMaster.uom.toString().trim(),
        entered_by: this._localStorage.intGlobalUserId()
      }
      this._itemMasterService.saveItemMaster(objItem).subscribe((result: ItemMaster) => {
        if (result) {
          this._confirmationDialogComponent.openAlertDialog(this.objAction.isEditing ? "Changes have been saved" : "New item master added successfully", "Item Master");
          this.resetScreen();
          this.componentVisibility = !this.componentVisibility;
          this.getItemMaster();
        }
      });
    }
  }

  public getItemMaster(): void {    // TO LIST ALL ITEM MASTER IN LIST SCREEN TABLE
    this.matTableConfig([]);
    let active : number;
    if(this.objLoad.active === 2){
     active = 0;
    }else if(this.objLoad.active === 1){
      active = 1;
    }else active = 2;
    let objItem: ItemLoad = {
      active: active
    }
    this._itemMasterService.getItemMaster(objItem).subscribe((result: ItemMaster[]) => {
        console.log(result, 'List');
        this.itemMasterList = result;
        this.filterItemMasterList = result;
        this.itemMasterList != null ? this.matTableConfig(this.itemMasterList) : this._confirmationDialogComponent.openAlertDialogWithTimeout("No records found.", "Item Master");
    });
  }

  public matTableConfig(tableRecords: any[]): void {    // ASSIGN DATA TO TABLE DATASOURCE
      this.dataSource = new MatTableDataSource(tableRecords);
  }

  public fetchItemMaster(isEditing: boolean, element:ItemMaster, isView?: boolean): any {   // TO FETCH DATA IN LIST SCREEN TO EDIT OR VIEW
    this.objAction = {
      isEditing: isEditing ? true : false,
      isView: isView ? true : false,
    }
    this._itemMasterService.fetchItemMaster(element).subscribe((result: ItemMaster) => {
      if (result) {
        this.objItemMaster = JSON.parse(JSON.stringify(result[0]));
        this.objModifyItemMaster = JSON.parse(JSON.stringify(result[0]));
        this.componentVisibility = !this.componentVisibility;
      }
    });
  }

  public deActiveItemMaster(element: ItemMaster): void {     // CALLING SERVICE TO DEACTIVATE A ROW IN ITEM MASTER
    let objApprove: any = {
      item_code: element.item_code.toString().trim(),
      active: false,
      entered_by: this._localStorage.intGlobalUserId(),
    }
    this._itemMasterService.cancelItemMaster(objApprove).subscribe((result: any) => {
      if (result) {
        this.getItemMaster();
        this._confirmationDialogComponent.openAlertDialog('Deactive successfully', 'Item Master');
      }
    });
  }

  public activeItemMaster(element: ItemMaster): void {     // CALLING SERVICE TO ACTIVATE A ROW IN ITEM MASTER
    let objApprove: any = {
      item_code: element.item_code.toString().trim(),
      active: true,
      entered_by: this._localStorage.intGlobalUserId(),
    }
    this._itemMasterService.cancelItemMaster(objApprove).subscribe((result: any) => {
      if (result) {
        this.getItemMaster();
        this._confirmationDialogComponent.openAlertDialog('Active successfully', 'Item Master');
      }
    });
  }

  public searchItem(searchValue: string): void {    // SEARCH BOX FUNCTIONALITIES TO SEARCH A PARTICULAT ITEM CODE or DESCRIPTION or UOM IN ITEM MASTER
    searchValue = searchValue.toString().trim();
    searchValue = searchValue ? searchValue.toString().toLocaleLowerCase() : "";
    this.searchString = searchValue;
    let filteredItemMasterList = this.filterItemMasterList.filter(element =>
      element.item_code.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      element.item_description.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      element.uom.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    this.matTableConfig(filteredItemMasterList);
  }

  public radioChange(event: MatRadioChange): void {   // RADIO BUTTON CHANGE FUNCTIONALITIES
    debugger;
    this.filterItemMasterList = [];
    if (event.value === 1) {
      this.itemMasterList.forEach(element => {
        if (+element.active === 1) {
          this.filterItemMasterList.push(element);
        }
      });
    } else if (event.value === 0) {
      this.itemMasterList.forEach(element => {
        if (+element.active === 0) {
          this.filterItemMasterList.push(element);
        }
      });
    } else {
      this.itemMasterList.forEach(element => {
        this.filterItemMasterList.push(element);
      });
    }
    this.searchItem(this.searchString);
  }

  /************************************************ VALIDATIONS **************************************************/

  private beforeSaveValidate(): boolean {     // BEFORE SAVE VALIDATIONS FOR MANDOTARY FIELDS DURING SAVE
    if ([null, 'null', undefined, 'undefined', NaN, 'NaN', 0, '0', ''].indexOf(+this.objItemMaster.uom.toString().trim()) !== -1) {
      document.getElementById('uom').focus();
      this._confirmationDialogComponent.openAlertDialog('Enter uom', 'Item Master');
      return false;
    } else if ([null, 'null', undefined, 'undefined', NaN, 'NaN', 0, '0', ''].indexOf(+this.objItemMaster.item_description.toString().trim()) !== -1) {
      document.getElementById('textarea').focus();
      this._confirmationDialogComponent.openAlertDialog('Enter item description', 'Item Master');
      return false;
    } else return true;
  }

  public newClick(): void {  // WHILE CLICKING NEW BUTTON REDIRECTS TO NEW ENTRY SCREEN
    this.objAction.isEditing = false;
    this.objAction.isView = false;
    this.componentVisibility = !this.componentVisibility;
    this.resetScreen();
  }

  public onListClick(): void {  // WHILE CLICK X BUTTON FROM ENTRY SCREEN, REDIRECTS TO LIST SCREEN
    this.objAction = JSON.parse(JSON.stringify(this.unChangedAction));
    this.componentVisibility = !this.componentVisibility;
  }

  public onClickExit(): void {  // WHILE CLICK EXIT or X BUTTON FROM LIST SCREEN, REDIRECTS TO MENU SCREEN
    this._router.navigate(['/RMKV-CRUD']);
  }

  public onClear(exitFlag: boolean): void {   // WHILE CLICK CLEAR or X BUTTON ASKS FOR ALERT IF ANY CHANGES MADE IN NEW ENTRY SCREEN
    if (this.checkAnyChangesMade())
      this.openConfirmationDialogs(exitFlag ? "Changes will be lost. Are you sure?" : "Do you want to clear the fields?", exitFlag);
    else if (exitFlag)
      this.onListClick();
  }

  private checkAnyChangesMade(): boolean {   // CHECKS FOR CHANGES IN FORM
    if (JSON.stringify(this.objItemMaster) !== ((this.objAction.isEditing || this.objAction.isView) ? JSON.stringify(this.objModifyItemMaster)
      : JSON.stringify(this.objUnchangedItemMaster)))
      return true;
    else
      return false;
  }

  private resetScreen(): void {   // RESET NEW SCREEN
    if (this.objAction.isEditing) {
      this.objItemMaster = JSON.parse(JSON.stringify(this.objModifyItemMaster));
      this.objModifyItemMaster = JSON.parse(JSON.stringify(this.objModifyItemMaster));
    } else {
      this.objAction = JSON.parse(JSON.stringify(this.unChangedAction));
      this.objItemMaster = JSON.parse(JSON.stringify(this.objUnchangedItemMaster));
      this.objModifyItemMaster = JSON.parse(JSON.stringify(this.objUnchangedItemMaster));
    }
  }

  /************************************************ POP UP BOX FUNCTIONALITIES **************************************************/

  private openConfirmationDialogs(message: string, exitFlag?: boolean): void {    // OPEN CONFIRMATION ALERT POP UP WHEN CLICK THE CLEAR BUTTON
    let dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    dialogRef.componentInstance.confirmMessage = message;
    dialogRef.componentInstance.componentName = "Item Master";
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        exitFlag ? this.onListClick() : this.resetScreen();
      dialogRef = null;
    });
  }

  public onClickActive(element: any): any {
    this._dialogRef = this._matDialog.open(ConfirmationDialogComponent, {   // OPEN CONFIRMATION ALERT POP UP WHEN CLICK THE ACTIVE BUTTON
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    this._dialogRef.componentInstance.confirmMessage =
      "Do you want to active this item code '" + element.item_code.toString().trim() + "'";
    this._dialogRef.componentInstance.componentName = 'Item Master';
    return this._dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.activeItemMaster(element)
      } this._dialogRef = null;
    });
  }

  public onClickDeactive(element: any): any {   // OPEN CONFIRMATION ALERT POP UP WHEN CLICK THE DEACTIVATE BUTTON
    this._dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    this._dialogRef.componentInstance.confirmMessage =
      "Do you want to deactive this item code '" + element.item_code.toString().trim() + "'";
    this._dialogRef.componentInstance.componentName = 'Item Master';
    return this._dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deActiveItemMaster(element)
      } this._dialogRef = null;
    });
  }

  /************************************************ FILE Exports FUNCTIONALITIES **************************************************/

  public exportToExcel(): void {    // EXPORT A FILE IN EXCEL FORMAT
    if (this.dataSource.data.length != 0) {
      const datetime = this._datePipe.transform(new Date(), "dd-MM-yyyy hh:mm:a");
      const customerArr = [];
      for (let i = 0; i < this.dataSource.data.length; i++) {
        customerArr[i] = Object.assign({
          'Item Code': this.dataSource.data[i].item_code,
          'Item Description': this.dataSource.data[i].item_description,
          "UOM": this.dataSource.data[i].uom,
        });
      }
      this._excelService.exportAsExcelFile(
        customerArr,
        "Item_Master",
        datetime
      );
    } else
      this._confirmationDialogComponent.openAlertDialogWithTimeout("No record found, Load the data first", "Item Master");
  }

  public exportToPdf(): void {    // EXPORT A FILE IN PDF FORMAT
    if (this.dataSource.data.length != 0) {
      var prepare = [];
      this.dataSource.data.forEach(e => {
        var tempObj = [];
        tempObj.push(e.item_code);
        tempObj.push(e.item_description);
        tempObj.push(e.uom);
        prepare.push(tempObj);
      });
      const doc = new jsPDF('l', 'pt', "a4");
      doc.autoTable({
        head: [["Item Code", "Project Description", "UOM"]],
        body: prepare,
        styles: { overflow: 'linebreak', columnWidth: 'wrap' },
        columnStyles: { text: { columnWidth: 'auto' } },
        didParseCell: function (table) {
          if (table.section === 'head') {
            table.cell.styles.textColor = '#FFFFFF';
            table.cell.styles.fillColor = '#d32f2f';
          }
        }
      });
      doc.save('Item_Master' + '.pdf');
    } else
      this._confirmationDialogComponent.openAlertDialogWithTimeout("No record found, Load the data first", "Item Master");
  }

}
