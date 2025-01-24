import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KeyPressEvents } from 'src/app/COMMON/shared/directives/key.press.events';
import { ItemLoad } from '../../model/item-master-model';
import { SupplierMaster } from '../../model/supplier-master-model';
import { SupplierMasterService } from '../../services/supplier-master/supplier-master.service';
import { LocalStorage } from 'src/app/COMMON/shared/local-storage';

@Component({
  selector: 'app-supplier-lookup',
  templateUrl: './supplier-lookup.component.html',
  styleUrls: ['./supplier-lookup.component.scss']
})
export class SupplierLookupComponent implements OnInit {

  supplierLookupList: SupplierMaster[] = [];
  filteredSupplierList: SupplierMaster[] = [];
  selectedSupplier: SupplierMaster[] | any = [];
  selectedRowIndex: number = 0;
  fieldValue: number = -1;
  locationId: number;
  constructor(
    public _dialogRef: MatDialogRef<SupplierLookupComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    public _matDialog: MatDialog,
    public _localStorage: LocalStorage,
    private _keyPressEvents: KeyPressEvents,
    private _supplierService: SupplierMasterService,
  ) {
    this._dialogRef.disableClose = true;
    this.loadSuppliers();
  }

  ngOnInit() {
  }

  private loadSuppliers(): void {
    let objSupplier: ItemLoad = {
      active: 1,
    }
    debugger
    this._supplierService.getSupplierMaster(objSupplier).subscribe((result: SupplierMaster[]) => {
      debugger;
      console.log(result, 'Supplier Lookup');
      if (result) {
        this.supplierLookupList = JSON.parse(JSON.stringify(result));
        this.filteredSupplierList = JSON.parse(JSON.stringify(result));
        this.filterSuppliers(this._data.searchString);
      }
    });
  }

  private filterSuppliers(searchString: string | any): void {
    searchString = !searchString ? "" : searchString.toLowerCase().trim();
    let filteredValue = [];
    if (searchString) {
      filteredValue = this.supplierLookupList.filter((ele: SupplierMaster) =>
        ele.supplier_code.toLowerCase().startsWith(searchString)
        || ele.supplier_name.toLowerCase().startsWith(searchString)
      );
    } if (searchString === "") {
      filteredValue = this.supplierLookupList;
    }
    this.filteredSupplierList = filteredValue;
  }

  public searchSupplier(searchString: string, event?: KeyboardEvent | any): void {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      let filteredValue = [];
      if (searchString === "") {
        filteredValue = this.supplierLookupList;
      } else {
        filteredValue = this.supplierLookupList.filter(ele =>
          ele.supplier_code.toLowerCase().startsWith(searchString.trim().toLowerCase())
          || ele.supplier_name.toLowerCase().startsWith(searchString.trim().toLowerCase())
        );
      }
      if (filteredValue.length > 0)
        this.selectedRowIndex = 0;
      this.filteredSupplierList = filteredValue;
    }
  }

  public determineEnterKey(event: KeyboardEvent | any): void {
    if (event.keyCode === 13) {
      this.selectedSupplier = this.filteredSupplierList[this.selectedRowIndex];
      this.dialogOK();
    }
  }

  public dialogOK(): void {
    this._dialogRef.disableClose = false;
    this._dialogRef.close(this.filteredSupplierList[this.selectedRowIndex]);
  }

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent | any): void {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (document.getElementById("row" + this.selectedRowIndex)) {
        document.getElementById("row" + this.selectedRowIndex).focus();
      }
    }
    this.selectedRowIndex = this._keyPressEvents.arrowKeyUpAndDown(event, this.selectedRowIndex, this.filteredSupplierList);
    if (this.filteredSupplierList)
      this.selectedSupplier = this.filteredSupplierList[this.selectedRowIndex];
    this.scrollTo(this.selectedRowIndex);
  }

  private scrollTo(index: number): void {
    let elmnt = document.getElementById("row" + index);
    elmnt.scrollIntoView(false);
    window.scrollTo(0, 0); // only if it's innerhtml
  }

  public onDoubleClick(selectedSupplierRecord: SupplierMaster): void {
    this.selectedSupplier = selectedSupplierRecord;
    this._dialogRef.close(this.selectedSupplier);
  }

  public onClick(selectedSupplierRecord: SupplierMaster, event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      this.selectedSupplier = selectedSupplierRecord;
      this._dialogRef.close(this.selectedSupplier);
    }

  }

  public dialogClose(): void {
    this._dialogRef.disableClose = false;
    this._dialogRef.close(null);
  }

}
