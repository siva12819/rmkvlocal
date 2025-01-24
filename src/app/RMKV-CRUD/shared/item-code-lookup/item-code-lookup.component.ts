import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KeyPressEvents } from 'src/app/COMMON/shared/directives/key.press.events';
import { ItemLoad, ItemMaster } from '../../model/item-master-model';
import { ItemMasterService } from '../../services/item-master/item-master.service';
import { LocalStorage } from 'src/app/COMMON/shared/local-storage';

@Component({
  selector: 'app-item-code-lookup',
  templateUrl: './item-code-lookup.component.html',
  styleUrls: ['./item-code-lookup.component.scss']
})
export class ItemCodeLookupComponent implements OnInit {

  itemLookUpList: ItemMaster[] = [];
  filterItemLookUp: ItemMaster[] = [];
  selectedItems: ItemMaster[] | any = [];
  selectedRowIndex: number = 0;
  fieldValue: number = -1;
  locationId: number;
  item_for: string = ''
  constructor(
    public _dialogRef: MatDialogRef<ItemCodeLookupComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    public _matDialog: MatDialog,
    public _localStorage: LocalStorage,
    private _keyPressEvents: KeyPressEvents,
    private _itemService: ItemMasterService,
  ) {
    this._dialogRef.disableClose = true;
    this.item_for = this._data.for;
    this.loadItemCodes();
  }

  ngOnInit() {
  }

  private loadItemCodes(): void {
    let objItem: ItemLoad = {
      active: 1,
    }
    debugger
    this._itemService.getItemMaster(objItem).subscribe((result: ItemMaster[]) => {
      debugger;
      console.log(result, 'Product Code Lookup');
      if (result) {
        this.itemLookUpList = JSON.parse(JSON.stringify(result));
        this.filterItemLookUp = JSON.parse(JSON.stringify(result));
        this.filterItems(this._data.searchString);
      }
    });
  }

  private filterItems(searchString: string): void {
    searchString = !searchString ? "" : searchString.toLowerCase().trim();
    let filteredValue = [];
    if (searchString) {
      filteredValue = this.itemLookUpList.filter((item: ItemMaster) =>
        item.item_code.toLowerCase().startsWith(searchString)
        || item.item_description.toLowerCase().startsWith(searchString)
      );
    } if (searchString === "") {
      filteredValue = this.itemLookUpList;
    }
    this.filterItemLookUp = filteredValue;
  }

  public searchItemCode(searchString: string, event?: KeyboardEvent | any): void {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      let filteredValue = [];
      if (searchString === "") {
        filteredValue = this.itemLookUpList;
      } else {
        filteredValue = this.itemLookUpList.filter(item =>
          item.item_code.toLowerCase().startsWith(searchString.trim().toLowerCase())
          || item.item_description.toLowerCase().startsWith(searchString.trim().toLowerCase())
        );
      }
      if (filteredValue.length > 0)
        this.selectedRowIndex = 0;
      this.filterItemLookUp = filteredValue;
    }
  }

  public determineEnterKey(event: KeyboardEvent | any): void {
    if (event.keyCode === 13) {
      this.selectedItems = this.filterItemLookUp[this.selectedRowIndex];
      this.dialogOK();
    }
  }

  public dialogOK(): void {
    this._dialogRef.disableClose = false;
    this._dialogRef.close(this.filterItemLookUp[this.selectedRowIndex]);
  }

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent | any): void {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (document.getElementById("row" + this.selectedRowIndex)) {
        document.getElementById("row" + this.selectedRowIndex).focus();
      }
    }
    this.selectedRowIndex = this._keyPressEvents.arrowKeyUpAndDown(event, this.selectedRowIndex, this.filterItemLookUp);
    if (this.filterItemLookUp)
      this.selectedItems = this.filterItemLookUp[this.selectedRowIndex];
    this.scrollTo(this.selectedRowIndex);
  }

  private scrollTo(index: number): void {
    let elmnt = document.getElementById("row" + index);
    elmnt.scrollIntoView(false);
    window.scrollTo(0, 0); // only if it's innerhtml
  }

  public onDoubleClick(selectedItemsRecord: ItemMaster): void {
    this.selectedItems = selectedItemsRecord;
    this._dialogRef.close(this.selectedItems);
  }

  public onClick(selectedItemsRecord: ItemMaster, event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      this.selectedItems = selectedItemsRecord;
      this._dialogRef.close(this.selectedItems);
    }

  }

  public dialogClose(): void {
    this._dialogRef.disableClose = false;
    this._dialogRef.close(null);
  }


}
