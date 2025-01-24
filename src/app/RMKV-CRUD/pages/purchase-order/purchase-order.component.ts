/*
'====================================================================================================================
    'Name                 :   Purchase Order
    'Author               :   Nazima Begum MS
    'Date of Creation     :   09-06-2021
    'Description          :   Purchase Order

'===========================Modification History=====================================================================
    'Date        |           Modified     |           Purpose                     |              Signature
'====================================================================================================================
 */
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, ElementRef, forwardRef, OnInit, ViewChildren } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DateValidation } from 'src/app/COMMON/shared/Datepicker/DatePickerValidation';
import { GridKeyEvents } from 'src/app/COMMON/shared/directives/grid-key-events';
import { KeyPressEvents } from 'src/app/COMMON/shared/directives/key.press.events';
import { ItemLoad, ItemMaster } from '../../model/item-master-model';
import { ItemsLookup, KeyColumns, LookupDetails, PurchaseOrder, PurchaseOrderAdd, PurchaseOrderDetails, PurchaseOrderList, PurchaseOrderLoad, ResultType, SupplierLookup } from '../../model/purchae-order-model';
import { SupplierMaster } from '../../model/supplier-master-model';
import { ItemMasterService } from '../../services/item-master/item-master.service';
import { PurchaseOrderService } from '../../services/purchase-order/purchase-order.service';
import { SupplierMasterService } from '../../services/supplier-master/supplier-master.service';
import { ItemCodeLookupComponent } from '../../shared/item-code-lookup/item-code-lookup.component';
import { SupplierLookupComponent } from '../../shared/supplier-lookup/supplier-lookup.component';
import { EditMode } from 'src/app/COMMON/models/common-model';
import { ConfirmationDialogComponent } from 'src/app/COMMON/shared/confirmation-dialog/confirmation-dialog.component';
import { ExcelService } from 'src/app/COMMON/shared/directives/excel-service';
import { FormatInvalidInput } from 'src/app/COMMON/shared/directives/format-invalid-input';
import { LocalStorage } from 'src/app/COMMON/shared/local-storage';
declare var jsPDF: any;

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss'],
  providers: [DatePipe, DecimalPipe]
})
export class PurchaseOrderComponent implements OnInit {

  displayedColumns: string[] = ['position', 'PONo', 'Date', 'SupplierCode', 'GrandTotal', 'Action']; //'ItemCode', 'Qty', 'Rate', 'Total',
  dataSource = new MatTableDataSource([]);
  fromDate1: Date = new Date();
  toDate1: Date = new Date();
  public dateValidation: DateValidation = new DateValidation();

  minimumDate = new Date(+this._localStorage.getMinDate().split("/")[2], +this._localStorage.getMinDate().split("/")[1], +this._localStorage.getMinDate().split("/")[0]);
  maximumDate = new Date();
  minDate: string = this._localStorage.getMinDate();
  maxDate: string = this._datePipe.transform(new Date(), 'dd/MM/yyyy');
  componentVisibility: boolean = true;
  focusFlag: boolean = false;
  itemCodeLookupList: ItemsLookup[] = [];
  supplierLookupList: SupplierLookup[] = [];

  objLoad: PurchaseOrderLoad = {
    FromDate: this._datePipe.transform(new Date(), 'dd/MM/yyyy'),
    ToDate: this._datePipe.transform(new Date(), 'dd/MM/yyyy'),
    supplier_code: '',
    supplier_name: '',
    valid_supplier: false,
  }

  objAction: EditMode = {
    isEditing: false,
    isView: false
  }

  objUnChangedAction: EditMode = {
    isEditing: false,
    isView: false
  }

  objPO: PurchaseOrder = {
    po_no: '-New-',
    po_date: new Date(),
    supplier_code: '',
    supplier_name: '',
    valid_supplier: false,
    grand_total: '0.00'
  }

  objModifyPO: PurchaseOrder = {
    po_no: '-New-',
    po_date: new Date(),
    supplier_code: '',
    supplier_name: '',
    valid_supplier: false,
    grand_total: '0.00'
  }

  objUnChangedPO: PurchaseOrder = {
    po_no: '-New-',
    po_date: new Date(),
    supplier_code: '',
    supplier_name: '',
    valid_supplier: false,
    grand_total: '0.00'
  }

  poDetailsList: PurchaseOrderDetails[] = [{
    item_code: '',
    item_description: '',
    uom_description: '',
    item_qty: '0.00',
    item_rate: '0.00',
    valid_item: false,
    total_amount: '0.00'
  }]

  modifyPODetailsList: PurchaseOrderDetails[] = [{
    item_code: '',
    item_description: '',
    uom_description: '',
    item_qty: '0.00',
    item_rate: '0.00',
    valid_item: false,
    total_amount: '0.00'
  }]

  unChangedPODetailsList: PurchaseOrderDetails[] = [{
    item_code: '',
    item_description: '',
    uom_description: '',
    item_qty: '0.00',
    item_rate: '0.00',
    valid_item: false,
    total_amount: '0.00'
  }]

  objPODetailsList: PurchaseOrderDetails = {
    item_code: '',
    item_description: '',
    uom_description: '',
    item_qty: '0.00',
    item_rate: '0.00',
    valid_item: false,
    total_amount: '0.00'
  }

  columns: KeyColumns[] = [
    { display: 'sNo', editable: false },
    { display: "itemCode", editable: true },
    { display: "itemDescription", editable: false },
    { display: "itemQty", editable: true },
    { display: "itemRate", editable: true },
    { display: "totalAmt", editable: false },
    { display: "action", editable: true },
  ]

  @ViewChildren('loadSupplierCode') loadSupplierCode: ElementRef | any;
  @ViewChildren('newSupplierCode') newSupplierCode: ElementRef | any;

  @ViewChildren('itemCode') itemCode: ElementRef | any;
  @ViewChildren('itemDescription') itemDescription: ElementRef | any;
  @ViewChildren('itemQty') itemQty: ElementRef | any;
  @ViewChildren('itemRate') itemRate: ElementRef | any;
  @ViewChildren('totalAmt') totalAmt: ElementRef | any;
  @ViewChildren('action') action: ElementRef | any;


  constructor(
    public _datePipe: DatePipe,
    public _localStorage: LocalStorage,
    public _router: Router,
    public _format: FormatInvalidInput,
    private _matDialog: MatDialog,
    private _decimalPipe: DecimalPipe,
    private _excelService: ExcelService,
    private _gridKeyEvents: GridKeyEvents,
    private _itemService: ItemMasterService,
    private _keyPressEvents: KeyPressEvents,
    private _supplierService: SupplierMasterService,
    private _purchaseOrderService: PurchaseOrderService,
    private _confirmationDialog: ConfirmationDialogComponent,
    private _dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  ) {
    this.loadItemCodes();
    this.loadSuppliers();
    this.objLoad.FromDate = this._datePipe.transform(new Date().setDate(new Date().getDate() - 7), 'dd/MM/yyyy');
    this.fromDate1 = new Date(new Date().setDate(new Date().getDate() - 7));
  }

  ngOnInit() {

  }
  /*************************************************************************************************************
  *                                              Key Events                                                    *
  *************************************************************************************************************/

  public onKeyFocusGlobal(event: KeyboardEvent | any, rowIndex: number, colIndex: number): void { //To handle the key events inside the Entry table
    switch (event.keyCode) {
      case 13: // Enter Key
        let response = this._gridKeyEvents.onEnterKeyFocus(rowIndex, colIndex, this.columns, this, this.poDetailsList);
        if (response)
          this.addNewRowToPoDetails(rowIndex);
        break;

      case 37: // Arrow Left
        this._gridKeyEvents.focusLeft(rowIndex, colIndex, this.columns, this, this.poDetailsList);
        break;

      case 38: // Arrow Up
        this._gridKeyEvents.focusUp(rowIndex, colIndex, this.columns, this);
        break;

      case 39: // Arrow Right
        this._gridKeyEvents.focusRight(rowIndex, colIndex, this.columns, this, this.poDetailsList);
        break;

      case 40: // Arrow Down
        this._gridKeyEvents.focusDown(rowIndex, colIndex, this.columns, this, this.poDetailsList);
        break;
    }
  }

  public validateFromDate(): void { //To validate from date
    debugger;
    let date = this.dateValidation.validateDate(this.objLoad.FromDate, this.fromDate1, this.minDate, this.maxDate);
    this.objLoad.FromDate = date[0];
    this.fromDate1 = date[1];
  }
  public validateToDate(): void { //To validate to date
    let date = this.dateValidation.validateDate(this.objLoad.ToDate, this.toDate1, this._datePipe.transform(this.fromDate1, 'dd/MM/yyyy'), this.maxDate);
    this.objLoad.ToDate = date[0];
    this.toDate1 = date[1];
  }

  /*************************************************************************************************************
  *                                            Lookup Functions                                                *
  *************************************************************************************************************/

  /*** List Supplier code Lookup Start ***/
  public openLoadSupplierLookup(event: KeyboardEvent | any): void {   // Initial function to open Lookup checks for valid input 
    debugger;
    if (event.keyCode === 13 && !this.validateLoadSupplierCode()) {
      this.openLoadSupplierLookupDialog();
    }
  }

  private openLoadSupplierLookupDialog(): void {  //Opens Supplier lookup dialog 
    this.focusFlag = true;
    const dialogRef = this._matDialog.open(SupplierLookupComponent, {
      width: "750px",
      panelClass: "custom-dialog-container",
      data: {
        searchString: this.objLoad.supplier_code,
        For: 2
      }
    });
    dialogRef.afterClosed().subscribe((result: SupplierMaster | any) => {
      this.focusFlag = false;
      this.matTableConfig();
      if (result) {
        debugger;
        setTimeout(() => {
          this.objLoad.supplier_code = result.supplier_code.toString().trim();
          this.objLoad.supplier_name = result.supplier_name.toString().trim();
        }, 250);
      } else
        this.objLoad.supplier_name = '';
    });
  }

  public onEnterLoadSupplierLookupDetails(): void { // Updating supplier lookup data while entering from input
    debugger;
    let supplierLookupList: SupplierMaster | any = {
      supplier_code: "",
      supplier_name: "",
      gstno: '',
      address1: '',
      address2: '',
      address3: '',
      phones: '',
      email: ''
    };
    this.matTableConfig();
    supplierLookupList = this.supplierLookupList.find(act => act.supplier_code.toString().toLowerCase().trim() === this.objLoad.supplier_code.toString().trim().toLowerCase());
    this.objLoad.supplier_code = supplierLookupList && supplierLookupList.supplier_code ? supplierLookupList.supplier_code.toString().trim() : this.objLoad.supplier_code.toString().trim();
    this.objLoad.supplier_name = supplierLookupList && supplierLookupList.supplier_name ? supplierLookupList.supplier_name.toString().trim() : '';
  }

  public validateLoadSupplierCode(): boolean {  // Validates whether the supplier code is valid or not
    let index = this.supplierLookupList.findIndex(element => element.supplier_code.toString().trim() === this.objLoad.supplier_code.toString().trim());
    if (index === -1)
      return false;
    else return true;
  }

  public checkValidLoadSupplierCode(event: KeyboardEvent | any): any {  // Checks for valid supplier code, if not throws error
    if (event.keyCode !== 13 && !this.focusFlag && this.objLoad.supplier_code !== '' && this.objLoad.supplier_name.toString().trim() === '') {
      this.openInvalidAlertDialog('Invalid supplier code', 'loadSupplierCode', 'Purchase Orders');
    }
  }
  /*** List Supplier code Lookup End ***/


  /*** New Entry Supplier code Lookup Start ***/
  private loadSuppliers(): void { // Loads all active suppliers list, to check and retrieve the valid supplier while type from input
    let objSupplier: ItemLoad = {
      active: 1,
    }
    debugger
    this._supplierService.getSupplierMaster(objSupplier).subscribe((result: SupplierMaster[]) => {
      debugger;
      console.log(result, 'Supplier Lookup');
      if (result) {
        this.supplierLookupList = JSON.parse(JSON.stringify(result));
      }
    });
  }

  public getLookupDetailsByCode(forWhat: string, key: string, value: string, index?: number): void {  // It calls a service while user type a supplier code/item code from the input, retrieves data from the backend
    this.resetLookupDetails(forWhat, key, index);
    if (forWhat === 'Suppliers' ? (this._format.replaceInvalidString(this[key][value]) !== '' && this[key][value].toString().trim().length === 10) :
      (this._format.replaceInvalidString(this[key][index][value]) !== '' && this[key][index][value].toString().trim().length === 10)) {
      let objLookup: LookupDetails = {
        item_code: forWhat === 'Items' ? this[key][index][value].toString().trim().toUpperCase() : '',
        supplier_code: forWhat === 'Suppliers' ? this[key][value].toString().trim().toUpperCase() : ''
      }
      this._purchaseOrderService.getLookupDetailsByCode(objLookup).subscribe((result: LookupDetails[]) => {
        if (forWhat === 'Items') {
          this.setItemLookupDetails(index, key, result);
        } else if (forWhat === 'Suppliers') {
          this.setSuppliersLookupDetails(key, result);
        }
      });
    }
  }

  private setItemLookupDetails(i: number, key: string, result: LookupDetails[]): void { // Assigns the item lookup details
    if (result) {
      this[key][i].item_code = result[0].item_code.toString().trim();
      this[key][i].item_description = result[0].item_description.toString().trim();
      this[key][i].valid_item = true;
      this.checkItemCodeAlreadyEntered(i);
      // this.focusFlag = true;
    } else {
      this[key][i].item_description = '';
      this[key][i].valid_item = false;
      this.focusFlag = true;
      this.openAlertDialog('Invalid item code', 'itemCode', i, 'Purchase Orders');
    }
  }

  private setSuppliersLookupDetails(key: string, result: LookupDetails[]): void { // Assigns the supplier lookup details
    if (result) {
      this[key].supplier_code = result[0].supplier_code.toString().trim();
      this[key].supplier_name = result[0].supplier_name.toString().trim();
      this[key].valid_supplier = true;
    } else {
      this[key].supplier_name = '';
      this[key].valid_supplier = false;
      this.focusFlag = true;
      this.openInvalidAlertDialog('Invalid supplier code', key === 'objLoad' ? 'loadSupplierCode' : 'newSupplierCode', 'Purchase Orders');
    }
  }

  private resetLookupDetails(forWhat: string, key: string, index?: number): void {  // resets supplier/item code lookup details
    if (forWhat === 'Suppliers') {
      this[key].supplier_name = '';
      this[key].valid_supplier = false;
    } else if (forWhat === 'Items') {
      this[key][index].item_description = '';
      this[key][index].valid_item = false;
    }
  }

  public checkValidCode(forWhat: string, key: string, index?: number): void { // Checks for whether the valid supplier code or not, if not throws invalid error
    if (forWhat === 'Suppliers') {
      // if (!this.focusFlag && this._format.replaceInvalidString(this[key].supplier_code) !== '' && !this[key].valid_supplier)
      //   this.openInvalidAlertDialog('Invalid supplier code', key === 'objLoad' ? 'loadSupplierCode' : 'newSupplierCode', 'Purchase Orders');
    } else if (forWhat === 'Items') {
      if (!this.focusFlag && this._format.replaceInvalidString(this[key][index].item_code) !== '' && !this[key][index].valid_item)
        this.openAlertDialog('Invalid item code', 'itemCode', index, 'Purchase Orders');
    }
  }

  public openSupplierLookup(event: KeyboardEvent | any): void { // Initial function to open new entry supplier lookup
    debugger;
    if (event.keyCode === 13 && !this.objPO.valid_supplier) {
      this.openSupplierLookupDialog();
    }
  }

  private openSupplierLookupDialog(): void {  //Opens new entry supplier lookup dialog
    this.focusFlag = true;
    const dialogRef = this._matDialog.open(SupplierLookupComponent, {
      width: "750px",
      panelClass: "custom-dialog-container",
      data: {
        searchString: this.objPO.supplier_code,
        For: 2
      }
    });
    dialogRef.afterClosed().subscribe((result: SupplierMaster) => {
      this.focusFlag = false;
      if (result) {
        debugger;
        setTimeout(() => {
          this.objPO.supplier_code = result.supplier_code.toString().trim();
          this.objPO.supplier_name = result.supplier_name.toString().trim();
          this.objPO.valid_supplier = true;
        }, 250);
      } else {
        this.objPO.supplier_name = '';
        this.objPO.valid_supplier = false;
      }
    });
  }

  public onEnterSupplierLookupDetails(): void { // Retrieves data when user types from input in new entry supplier code
    debugger;
    let supplierLookupList: SupplierMaster | any = {
      supplier_code: "",
      supplier_name: "",
    };
    supplierLookupList = this.supplierLookupList.find(act => act.supplier_code.toString().toLowerCase().trim() === this.objPO.supplier_code.toString().trim().toLowerCase());
    this.objPO.supplier_code = supplierLookupList && supplierLookupList.supplier_code ? supplierLookupList.supplier_code.toString().trim() : this.objPO.supplier_code.toString().trim();
    this.objPO.supplier_name = supplierLookupList && supplierLookupList.supplier_name ? supplierLookupList.supplier_name.toString().trim() : '';
  }

  public validateSupplierCode(): boolean {  // validates whether the valid supplier code or not in new entry
    let index = this.supplierLookupList.findIndex(element => element.supplier_code.toString().trim() === this.objPO.supplier_code.toString().trim());
    if (index === -1)
      return false;
    else return true;
  }

  public checkValidSupplierCode(event: KeyboardEvent | any): void { // checks for valid supplier code, if not throws error in new entry
    if (event.keyCode !== 13 && !this.focusFlag && this.objPO.supplier_code !== '' && this.objPO.supplier_name.toString().trim() === '') {
      this.openInvalidAlertDialog('Invalid supplier code', 'newSupplierCode', 'Purchase Orders');
    }
  }
  /*** New Entry Supplier code Lookup End ***/

  /*** New Entry item code Lookup Start ***/
  private loadItemCodes(): void { // loads all active item codes for input entries
    let objItem: ItemLoad = {
      active: 1,
    }
    debugger
    this._itemService.getItemMaster(objItem).subscribe((result: ItemMaster[]) => {
      debugger;
      console.log(result, 'item code Lookup');
      if (result) {
        this.itemCodeLookupList = JSON.parse(JSON.stringify(result));
      }
    });
  }

  public openItemCodeLookup(event: KeyboardEvent | any, i: number): void {  // initial function to open item code lookup
    if (event.keyCode === 13 && !this.poDetailsList[i].valid_item)
      this.openItemCodeLookupDialog(i);
  }

  private openItemCodeLookupDialog(i: number): void { //Opens item code lookup
    this.focusFlag = true;
    const dialogRef = this._matDialog.open(ItemCodeLookupComponent, {
      width: "600px",
      panelClass: "custom-dialog-container",
      data: {
        searchString: this.poDetailsList[i].item_code,
      }
    });
    dialogRef.afterClosed().subscribe((result: ItemMaster) => {
      this.focusFlag = false;
      if (result) {
        this.poDetailsList[i].item_code = result.item_code;
        this.poDetailsList[i].item_description = result.item_description;
        this.poDetailsList[i].uom_description = result.uom_description;
        this.poDetailsList[i].valid_item = true;
        this.checkItemCodeAlreadyEntered(i);
      } else {
        this.poDetailsList[i].item_description = '';
        this.poDetailsList[i].uom_description = '';
        this.poDetailsList[i].valid_item = false;
      }
    });
  }

  public onEnterItemCodeLookupDetails(i: number): void {  // Function to fetch the data of a corresponding item code while typing from the input box
    let itemCodeList: ItemMaster | any = {
      item_code: 0,
      item_description: "",
      uom_description: "",
    }
    itemCodeList = this.itemCodeLookupList.find(ele => ele.item_code.toString().toLowerCase().trim() ===
      this.poDetailsList[i].item_code.toString().trim().toLowerCase());
    this.poDetailsList[i].item_code = itemCodeList && itemCodeList.item_code.toString().trim() ? itemCodeList.item_code.toString().trim() : this.poDetailsList[i].item_code.toString().trim();
    this.poDetailsList[i].item_description = itemCodeList && itemCodeList.item_description ? itemCodeList.item_description : '';
    this.poDetailsList[i].uom_description = itemCodeList && itemCodeList.uom_description ? itemCodeList.uom_description : '';
    this.checkItemCodeAlreadyEntered(i);
  }

  private checkItemCodeAlreadyEntered(index: number): void {  // To check whether the item code is already entered in a grid
    let alreadyFlag = false;
    let itemcode = '';
    for (let i = 0; i < this.poDetailsList.length; i++) {
      if (i !== index && this.poDetailsList[i].item_code === this.poDetailsList[index].item_code) {
        itemcode = this.poDetailsList[i].item_code;
        alreadyFlag = true;
        break;
      }
    } if (alreadyFlag) {
      this.openAlertDialog(itemcode + 'already exists', 'itemCode', index, 'Purchase Orders');
      this.poDetailsList[index].item_code = '';
      this.poDetailsList[index].item_description = '';
      this.poDetailsList[index].uom_description = '';
      this.poDetailsList[index].valid_item = false;
    }
  }

  public validateItemCode(i: number): boolean { // Checks whether the item code is valid or not
    let index = this.itemCodeLookupList.findIndex(element => element.item_code.toString().trim() === this.poDetailsList[i].item_code.toString().trim());
    if (index === -1)
      return false;
    else return true;
  }
  /*** New Entry item code Lookup End ***/

  /*************************************************************************************************************
  *                                              Calculations                                                  *
  *************************************************************************************************************/

  public calculateTotalAmount(element: PurchaseOrderDetails, editableColumn: string): void {  //Ccalculates total amount of a row
    if (this._format.replaceInvalidAmount(+element.item_qty) !== 0 && this._format.replaceInvalidAmount(+element.item_rate)) {
      element.total_amount = (+element.item_qty * +element.item_rate);
    }
    this.convertToDecimal(element, editableColumn);
    this.calculateGrandTotal();
  }

  private calculateGrandTotal(): void { // Calculates grand total 
    this.objPO.grand_total = this.poDetailsList.map(t => this._format.replaceInvalidNumber(+t) !== 0 ? +t.total_amount : 0).reduce((acc, value) => acc + value, 0);
    this.convertTotalToDecimal();
  }

  public convertToDecimal(element: PurchaseOrderDetails, editableColumn: string): void {  // Converts row columns' values into decimal points
    if (editableColumn !== 'Quantity')
      element.item_qty = [null, 'null', undefined, 'undefined', NaN, 'NaN', "", '0.00'].indexOf(element.item_qty.toString().trim()) === -1 ? (this._decimalPipe.transform(+element.item_qty, '1.2-2')).replace(/,/g, '') : "0.00";
    if (editableColumn !== 'Rate')
      element.item_rate = [null, 'null', undefined, 'undefined', NaN, 'NaN', "", '0.00'].indexOf(element.item_rate.toString().trim()) === -1 ? (this._decimalPipe.transform(+element.item_rate, '1.2-2')).replace(/,/g, '') : "0.00";
    element.total_amount = [null, 'null', undefined, 'undefined', NaN, 'NaN', "", '0.00'].indexOf(element.total_amount.toString().trim()) === -1 ? (this._decimalPipe.transform(+element.total_amount, '1.2-2')).replace(/,/g, '') : "0.00";
    this.convertTotalToDecimal();
  }
  private convertTotalToDecimal(): void { // Converts grand total to decimal value
    this.objPO.grand_total = [null, 'null', undefined, 'undefined', NaN, 'NaN', "", '0.00'].indexOf(this.objPO.grand_total.toString().trim()) === -1 ? (this._decimalPipe.transform(+this.objPO.grand_total, '1.2-2')).replace(/,/g, '') : "0.00";
  }

  /*************************************************************************************************************
  *                                          GRID Functions                                                    *
  *************************************************************************************************************/

  public addNewRowToPoDetails(i: number): void {   //Add New Empty Row to Purchase Orders GRID Details
    // this.poDetailsList.push(Object.assign({}, this.objPODetailsList));
    this.poDetailsList.splice((i + 1), 0, JSON.parse(JSON.stringify(this.objPODetailsList)));
    setTimeout(() => {
      let input = this.itemCode.toArray();
      input[this.poDetailsList.length - 1].nativeElement.focus();
    }, 100);
  }

  public removeRowFromPoDetails(i: number): void {    // Removes a particular row from Purchase Order GRID Details
    this.openRemoveConfirmationDialog('Are you sure want to remove row ' + (i + 1) + ' from the list', 'Purchase Orders', i);
  }

  private deleteRow(i: number): void {  // Delete a row from any index
    this.poDetailsList.splice(i, 1);
    if (i === this.poDetailsList.length) {
      setTimeout(() => {
        let inputEls = this.itemCode.toArray();
        inputEls[i - 1].nativeElement.focus();
      }, 100);
    } else {
      setTimeout(() => {
        let inputEls = this.itemCode.toArray();
        inputEls[i].nativeElement.focus();
      }, 100);
    }
    this.calculateTotalAmount(this.poDetailsList[i], '');
  }


  /*************************************************************************************************************
  *                                          CRUD Functions                                                    *
  *************************************************************************************************************/

  public addPurchaseOrders(): void {  // Adds new purchase order to the table
    if (this.beforeSaveValidate()) {
      let objSave: PurchaseOrderAdd = {
        po_no: this.objAction.isEditing ? this.objPO.po_no.toString().trim() : '',
        po_date: this._datePipe.transform(this.objPO.po_date, 'dd/MM/yyyy'),
        grand_total: +this._format.replaceInvalidNumber(+this.objPO.grand_total),
        supplier_code: this._format.replaceInvalidString(this.objPO.supplier_code),
        entered_by: +this._localStorage.intGlobalUserId(),
        po_details: this.getPoDetailsToAdd()
      }
      this._purchaseOrderService.savePurchaseOrder(objSave).subscribe((result: boolean) => {
        if (result) {
          this._confirmationDialog.openAlertDialog(this.objAction.isEditing ? 'Changes have been saved' : 'New purchase order records has been created', 'Purchase Orders');
          this.resetScreen();
          this.loadPurchaseOrders();
          this.componentVisibility = !this.componentVisibility;
        }
      });
    }
  }

  private getPoDetailsToAdd(): PurchaseOrderDetails[] { // To get the po grid item details to add
    let tempArr: PurchaseOrderDetails[] = [];
    this.poDetailsList.forEach(x => {
      if (this.checkIsValidRowToAdd(x)) {
        tempArr.push({
          item_code: this._format.replaceInvalidString(x.item_code),
          quantity: +this._format.replaceInvalidNumber(+x.item_qty),
          rate: +this._format.replaceInvalidNumber(+x.item_rate),
          total_amount: +this._format.replaceInvalidNumber(+x.total_amount)
        });
      }
    });
    return tempArr;
  }

  public fetchPurchaseOrder(element: PurchaseOrderList, isEditing: boolean, isView: boolean): void {  // Fetch records to edit from the backend
    this.objAction = {
      isEditing: isEditing ? true : false,
      isView: isView ? true : false
    }
    this._purchaseOrderService.fetchPurchaseOrder(element.po_no).subscribe((result: ResultType) => {
      if (result && result.return_value === 1) {
        this.objPO = JSON.parse(result.records1)[0];
        this.objPO.valid_supplier = true;
        this.poDetailsList = JSON.parse(result.records2);
        this.poDetailsList.forEach(x => {
          x.valid_item = true;
          this.calculateTotalAmount(x, '');
        });
        this.objModifyPO = JSON.parse(JSON.stringify(this.objPO));
        this.modifyPODetailsList = JSON.parse(JSON.stringify(this.poDetailsList));
        this.componentVisibility = !this.componentVisibility;
      }
    });
  }

  public loadPurchaseOrders(): void { // To list all purchase orders in the list screen table
    this.matTableConfig();
    if (this.beforeLoadValidate()) {
      let objLoad: PurchaseOrderLoad = {
        from_date: this.objLoad.FromDate,
        to_date: this.objLoad.ToDate,
        supplier_code: this._format.replaceInvalidString(this.objLoad.supplier_code)
      }
      this._purchaseOrderService.getPurchaseOrder(objLoad).subscribe((result: PurchaseOrderList[]) => {
        if (result) {
          this.matTableConfig(result);
        } else
          this._confirmationDialog.openAlertDialogWithTimeout('No records found', 'Purchase Orders');
      });
    }
  }

  public onClickDeactivate(element: PurchaseOrderList, deactivated: boolean): boolean | any { // Shows alert while click on deactivate/activate button from the list grid
    debugger;
    this._dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    this._dialogRef.componentInstance.confirmMessage =
      "Do you want to " + (!deactivated ? "'deactivate'" : "'activate'") + " this purchase order?";
    this._dialogRef.componentInstance.componentName = "Purchase Orders";
    return this._dialogRef.afterClosed().subscribe(result => {
      result ? this.deactivatePurchaseOrder(element, deactivated) : this._dialogRef = null;
    });
  }

  public deactivatePurchaseOrder(element: PurchaseOrderList, deactivated: boolean): void {  // Deactivate service called and affects the table
    let objDeactivate = {
      po_no: element.po_no.toString().trim(),
      active: deactivated,
      entered_by: this._localStorage.intGlobalUserId()
    }
    this._purchaseOrderService.cancelPurchaseOrder(objDeactivate).subscribe((result: number) => {
      if (result === 1) {
        this.loadPurchaseOrders();
        this._confirmationDialog.openAlertDialog(!deactivated ? 'Deactivated' : 'Activated', 'Purchase Orders');
      }
    });
  }

  public matTableConfig(tableRecords?: PurchaseOrderList[]): void { // To fill records into the matTable
    debugger;
    this.dataSource = tableRecords ? new MatTableDataSource(tableRecords) : new MatTableDataSource([]);
  }

  public newClick(): void { // WHile clicking new button redirects to new entry screen
    this.objAction = JSON.parse(JSON.stringify(this.objUnChangedAction));
    this.resetScreen();
    this.componentVisibility = !this.componentVisibility;
  }

  public listClick(): void {  // while click X button from entry screen, redirects to list screen
    this.objAction = JSON.parse(JSON.stringify(this.objUnChangedAction));
    this.resetScreen();
    this.componentVisibility = !this.componentVisibility;
  }

  private resetScreen(): void { // resets new screen
    if (this.objAction.isEditing) {
      this.objPO = JSON.parse(JSON.stringify(this.objModifyPO));
      this.poDetailsList = JSON.parse(JSON.stringify(this.modifyPODetailsList));
    } else if (!this.objAction.isEditing) {
      this.objPO = JSON.parse(JSON.stringify(this.objUnChangedPO));
      this.poDetailsList = JSON.parse(JSON.stringify(this.unChangedPODetailsList));
    }
  }

  public onClear(exitFlag: boolean): void { // While click clear or X button asks for alert if any changes made in a form
    if (this.checkAnyChangesMade()) {
      this.openConfirmationDialog(exitFlag ? 'Changes will be lost, are you sure want to exit?' : 'Do you want to clear all the changes?', exitFlag)
    } else if (exitFlag)
      this.listClick();
  }

  private checkAnyChangesMade(): boolean {  // Checks for changes in form
    if (this.checkChangesInMaster() || this.checkChangesInDetails())
      return true;
    else return false;
  }

  private checkChangesInMaster(): boolean { // Checks for changes in master form
    debugger;
    if (JSON.stringify(this.objPO) !== ((this.objAction.isEditing || this.objAction.isView) ? JSON.stringify(this.objModifyPO) : JSON.stringify(this.objUnChangedPO)))
      return true;
    else return false;
  }

  private checkChangesInDetails(): boolean {  // Checks for changes in details grid
    debugger;
    if (JSON.stringify(this.poDetailsList) !== ((this.objAction.isEditing || this.objAction.isView) ? JSON.stringify(this.modifyPODetailsList) : JSON.stringify(this.unChangedPODetailsList)))
      return true;
    else return false;
  }

  public onClickExit(): void {  // While click exit from list screen redirects to dashboard
    this._router.navigate(['/RMKV-CRUD']);
  }

  /*************************************************************************************************************
  *                                          Validations                                                       *
  *************************************************************************************************************/

  private openAlertDialog(value: string, focus: string, i: number, componentName?: string): void {  // Common alert dialog for Details grid
    let _dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 0 }
    });
    _dialogRef.componentInstance.alertMessage = value;
    _dialogRef.componentInstance.componentName = componentName;
    _dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let input = this[focus].toArray();
        input[i].nativeElement.focus();
        this.focusFlag = false;
      }
      _dialogRef = null;
    });
  }

  private openInvalidAlertDialog(message: string, focus: string, componentName?: string): void {  // Common alert dialog and focus for master form elements
    let _dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 0 }
    });
    _dialogRef.componentInstance.alertMessage = message;
    _dialogRef.componentInstance.componentName = componentName;
    _dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let input = this[focus].toArray();
        input[input.length - 1].nativeElement.focus();
        this.focusFlag = false;
      }
      _dialogRef = null;
    });
  }

  private openConfirmationDialog(message: string, exitFlag?: boolean): void { // Common confirmation dialog for clear alerts
    let dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    dialogRef.componentInstance.confirmMessage = message;
    dialogRef.componentInstance.componentName = "Purchase Orders";
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        exitFlag ? this.listClick() : this.resetScreen();
      dialogRef = null;
    });
  }

  public openRemoveConfirmationDialog(message: string, componentName: string, i: number): void {  //Confirmation alert for remove a row from list
    let dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    dialogRef.componentInstance.confirmMessage = message;
    dialogRef.componentInstance.componentName = componentName;
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.deleteRow(i);
      dialogRef = null;
    });
  }

  public onlyAllowDecimalForDetails(event: KeyboardEvent | any, maxValue: number, key1: string, key2: string, index: number): boolean { // Allows only decimal for details grid
    let key = key1 + '[' + index + ']' + '.' + key2;
    if (event.target.selectionStart === 0 && event.target.selectionEnd === event.target.value.length) {
      const pattern = /^[0-9]*$/;
      if (pattern.test(event.key)) {
        this[key] = "";
        event.target.value = "";
      }
      return this._keyPressEvents.onlyAllowDecimal(event, maxValue, true);
    } else {
      return this._keyPressEvents.onlyAllowDecimal(event, maxValue, true);
    }
  }


  private beforeSaveValidate(): boolean { // checks for validations before save
    if (this._format.replaceInvalidString(this.objPO.supplier_code) === '') {
      this.openInvalidAlertDialog('Enter supplier code', 'newSupplierCode', 'Purchase Orders');
      return false;
    } if (!this.beforeSaveValidateDetails()) {
      return false;
    } else return true;
  }

  private beforeSaveValidateDetails(): boolean {  //  checks for validations in grid details before save
    for (let i = 0; i < this.poDetailsList.length; i++) {
      let element = this.poDetailsList[i];
      if (JSON.stringify(element) !== JSON.stringify(this.objPODetailsList) && this._format.replaceInvalidString(element.item_code) !== ''
        || this._format.replaceInvalidNumber(+element.total_amount) !== 0 || this._format.replaceInvalidNumber(+element.item_qty) !== 0) {
        if (this.poDetailsList.length === 1 && this._format.replaceInvalidString(element.item_code) === '') {
          this.openAlertDialog('Enter item code', 'itemCode', i, 'Purchase Orders');
          return false;
        } if (this._format.replaceInvalidString(element.item_code) === '') {
          this.openAlertDialog('Enter item code', 'itemCode', i, 'Purchase Orders');
          return false;
        } if (this._format.replaceInvalidNumber(+element.item_qty) === 0) {
          this.openAlertDialog('Enter quantity', 'itemQty', i, 'Purchase Orders');
          return false;
        } if (+element.item_qty < 0) {
          this.openAlertDialog('Invalid quantity', 'itemQty', i, 'Purchase Orders');
          return false;
        } if (this._format.replaceInvalidNumber(+element.item_rate) === 0) {
          this.openAlertDialog('Enter rate', 'itemRate', i, 'Purchase Orders');
          return false;
        } if (+element.item_rate < 0) {
          this.openAlertDialog('Invalid rate', 'itemRate', i, 'Purchase Orders');
          return false;
        } if (this._format.replaceInvalidNumber(+element.total_amount) === 0) {
          this._confirmationDialog.openAlertDialog("Total amount can't be 0 in row no '" + (i + 1) + "'", 'Purchase Orders');
          return false;
        } if (+element.total_amount < 0) {
          this._confirmationDialog.openAlertDialog("Invalid total amount in row no '" + (i + 1) + "'", 'Purchase Orders');
          return false;
        }
      } else if (JSON.stringify(element) !== JSON.stringify(this.objPODetailsList) && this._format.replaceInvalidString(element.item_code) === '' && (this._format.replaceInvalidNumber(+element.item_qty) !== 0 || this._format.replaceInvalidNumber(+element.item_rate) !== 0)) {
        this.openAlertDialog('Enter item code', 'itemCode', i, 'Purchase Orders');
        return false;
      } else if (this.poDetailsList.length === 1 && this._format.replaceInvalidString(element.item_code) === '') {
        this.openAlertDialog('Enter item code', 'itemCode', i, 'Purchase Orders');
        return false;
      } else return true;
    } return true;
  }

  private beforeLoadValidate(): boolean { // checks for validations before load
    if ([null, 'null', undefined, 'undefined', NaN, 'NaN', 0, '0', ''].indexOf(this.objLoad.FromDate) !== -1) {
      document.getElementById('fromDate').focus();
      this._confirmationDialog.openAlertDialog('Enter from date', 'Purchase Orders');
      return false;
    } if ([null, 'null', undefined, 'undefined', NaN, 'NaN', 0, '0', ''].indexOf(this.objLoad.ToDate) !== -1) {
      document.getElementById('toDate').focus();
      this._confirmationDialog.openAlertDialog('Enter to date', 'Purchase Orders');
      return false;
    } if (this.objLoad.FromDate.toString().trim().length !== 10) {
      document.getElementById('fromDate').focus();
      this._confirmationDialog.openAlertDialog('Invalid from date', 'Purchase Orders');
      return false;
    } if (this.objLoad.ToDate.toString().trim().length !== 10) {
      document.getElementById('toDate').focus();
      this._confirmationDialog.openAlertDialog('Invalid to date', 'Purchase Orders');
      return false;
    } if (this.fromDate1 > this.toDate1) {
      document.getElementById('fromDate').focus();
      this._confirmationDialog.openAlertDialog('From date cannot be greater than to date', 'Purchase Orders');
      return false;
    } if ([null, 'null', undefined, 'undefined', NaN, 'NaN', 0, '0', ''].indexOf(this.objLoad.supplier_code) === -1 && [null, 'null', undefined, 'undefined', NaN, 'NaN', 0, '0', ''].indexOf(this.objLoad.supplier_name) !== -1) {
      document.getElementById('loadSupplierCode').focus();
      this._confirmationDialog.openAlertDialog('Invalid supplier code', 'Purchase Orders');
      return false;
    } else return true;
  }


  private checkIsValidRowToAdd(element: PurchaseOrderDetails | any): boolean {  // checks for valid row before add a row to save in details grid
    if (this._format.replaceInvalidString(element.item_code) !== '' && this._format.replaceInvalidNumber(element.item_qty) !== 0 ||
      this._format.replaceInvalidNumber(element.item_rate) !== 0 || this._format.replaceInvalidNumber(element.total_amount) !== 0) {
      return true;
    } else return false;
  }

  /*************************************************************************************************************
  *                                              Exports                                                       *
  *************************************************************************************************************/

  public exportToExcel(): void {  // Exports a list to Excel file
    if (this.dataSource.data.length > 0) {
      let datetime = this._datePipe.transform(new Date(), "dd-MM-yyyy hh:mm:a");
      let json = [];
      for (let i = 0; i < this.dataSource.data.length; i++) {
        json[i] = Object.assign({
          "Po No": this.dataSource.data[i].po_no,
          "Po Date": this._datePipe.transform(this.dataSource.data[i].po_date, 'dd/MM/yyyy'),
          "Supplier Name": this.dataSource.data[i].supplier_code.toString().trim() + '-' + this.dataSource.data[i].supplier_name.toString().trim(),
          "Grand Total": this.dataSource.data[i].grand_total,
        });
      }
      this._excelService.exportAsExcelFile(json, "Purchase_Orders", datetime);
    } else
      this._confirmationDialog.openAlertDialogWithTimeout("No record found", "Purchase Orders");
  }

  public exportToPdf(): void {  // Exports a list to pdf file
    if (this.dataSource.data.length != 0) {
      var prepare = [];
      this.dataSource.data.forEach(e => {
        var tempObj = [];
        tempObj.push(e.po_no);
        tempObj.push(this._datePipe.transform(e.po_date, 'dd/MM/yyyy'));
        tempObj.push(e.supplier_code.toString().trim() + '-' + e.supplier_name.toString().trim());
        tempObj.push(e.grand_total);
        prepare.push(tempObj);
      });

      const doc = new jsPDF('l', 'pt', "a4");
      doc.autoTable({
        head: [["Po No", "Po Date", "Supplier Name", "Grand Total"]],
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
      doc.save('Purchase_Orders' + '.pdf');
    } else
      this._confirmationDialog.openAlertDialogWithTimeout("No record found, Load the data first", "Purchase Orders");
  }
}
