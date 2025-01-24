import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../services/common/common.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { LocalStorage } from '../local-storage';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-multiple-file-attachment',
  templateUrl: './multiple-file-attachment.component.html',
  styleUrls: ['./multiple-file-attachment.component.scss']
})
export class MultipleFileAttachmentComponent implements OnInit {

  objAttach: any = [
    {
      base_path_id: 0,
      file_path: ''
    },
    {
      base_path_id: 0,
      file_path: '',
    },
    {
      base_path_id: 0,
      file_path: '',
    },
    {
      base_path_id: 0,
      file_path: '',
    }
  ]

  objUnChangedAttach: any = [
    {
      base_path_id: 0,
      file_path: ''
    },
    {
      base_path_id: 0,
      file_path: '',
    },
    {
      base_path_id: 0,
      file_path: '',
    },
    {
      base_path_id: 0,
      file_path: '',
    }
  ]

  attachment: any = [
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 1"
    },
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 2"
    },
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 3"
    },
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 4"
    }
  ]
  unchangedattachment: any = [
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 1"
    },
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 2"
    },
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 3"
    },
    {
      Comment: "",
      Progress: 0,
      File: [],
      File_Path: "File 4"
    }
  ]

  fileBytes: any;
  tempByte1: any;
  tempByte2: any;
  tempByte3: any;
  tempByte4: any;
  blobArray: any[] = [];
  tempBlob1: any;
  tempBlob2: any;
  tempBlob3: any;
  tempBlob4: any;
  selectedFiles: File[] | any[] = [];
  fileIndex: number[] = [];
  removedfilesIndex: number[] = [];
  removedFiles: any[] = [];
  document1: any;
  document4: any;
  document3: any;
  document2: any;
  tempFile4: any;
  tempFile3: any;
  tempFile2: any;
  tempFile1: any;
  oldDocument4: any;
  oldDocument3: any;
  oldDocument2: any;
  oldDocument1: any;
  isCancelled: any;
  isView: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef | any;
  @ViewChild('docInput1') docInput1: ElementRef | any;
  @ViewChild('docInput2') docInput2: ElementRef | any;
  @ViewChild('docInput3') docInput3: ElementRef | any;
  @ViewChild('docInput4') docInput4: ElementRef | any;
  constructor(
    public _dialogRef: MatDialogRef<MultipleFileAttachmentComponent>,
    private _confirmationDialog: ConfirmationDialogComponent,
    private _commonService: CommonService,
    public _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public _data: any,
    public _localStorage: LocalStorage,
  ) { 
    this._dialogRef.disableClose = true;

  }
  

  ngOnInit(): void {
    debugger;
    if (this._data.isView)
      this.isView = this._data.isView;
    else
      this.isView = false;
    this.setDocumentView();
  }

  private setDocumentView(): void {
    debugger;
    let objAttach = JSON.parse(this._data.objAttach);
    if (objAttach)
      this.objAttach = JSON.parse(this._data.objAttach);
    if (this.objAttach[0].file_path) {
      this.attachment[0].Progress = 100;
      this.oldDocument1 = this.objAttach[0].file_path;
    } if (this.objAttach[1].file_path) {
      this.attachment[1].Progress = 100;
      this.oldDocument2 = this.objAttach[1].file_path;
    } if (this.objAttach[2].file_path) {
      this.attachment[2].Progress = 100;
      this.oldDocument3 = this.objAttach[2].file_path;
    } if (this.objAttach[3].file_path) {
      this.attachment[3].Progress = 100;
      this.oldDocument4 = this.objAttach[3].file_path;
    }
    let attachedFiles = this._data.attachedFiles;
    for (let i = 0; i < attachedFiles.length; i++) {
      this['tempByte' + (i + 1)] = attachedFiles[i].tempByte;
      this['tempBlob' + (i + 1)] = attachedFiles[i].tempBlob;
      this['tempFile' + (i + 1)] = attachedFiles[i].tempFile;
      if ([null, 'null', undefined, 'undefined', NaN, 'NaN', 0, '0', ''].indexOf(this['tempByte' + (i + 1)]) === -1) {
        this.objAttach[i].file_path = this['tempByte' + (i + 1)].extension;
        this.attachment[i].Progress = 100;
      }
    }
    this.getDocumentPathView();
    this.selectedFiles = this._data.selectedFiles;
    this.fileIndex = this._data.selectedIndex;
    // if (this.fileIndex.length > 0)
    for (let i = 0; i < this.fileIndex.length; i++) {
      let selectedFile: any[] = [];
      let index = this.fileIndex[i];
      selectedFile.push(this.selectedFiles[i]);
      this['document' + (index + 1)] = selectedFile;
    }
  }

  public uploadDocument(event: any, i: number): void {
    debugger;
    let fileToUpload = event.target.files[0] as any;
    for (let k = 0; k < this.selectedFiles.length; k++) {
      let checkFile = this.selectedFiles[k];
      if (checkFile.name === fileToUpload.name) {
        this._confirmationDialog.openAlertDialog('File already selected', 'Multiple Files Attachment');
        this['docInput' + (i + 1)].nativeElement.value = '';
        return;
      }
    }
    this.attachment[i].Progress = 100;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('fileRootPath', this._localStorage.getNonTradingDocumentPath());
    formData.append('companyCode', 'CS');
    this._commonService.uploadTempFile(formData).subscribe(
      (result: any) => {
        debugger;
        let filePath = 'objAttach[' + i + '].file_path'; 
        this['tempFile' + (i + 1)] = JSON.parse(result.response)[0].extension;
        if (event.target.length != 0) {
          this.fileIndex.push(i);
          this.selectedFiles.push(event.target.files[0]);
          this['document' + (i + 1)] = event.target.files;
          this['tempByte' + (i + 1)] = JSON.parse(result.response)[0];
          this['tempBlob' + (i + 1)] = this.dataURItoBlob(JSON.parse(result.response)[0].file, JSON.parse(result.response)[0].Type);
        } else {
          this.fileInput[i].nativeElement.files = this['document' + (i + 1)];
          this.selectedFiles.push(this['document' + (i + 1)][0]);
        }
        this[filePath] = "";
      });
  }

  public viewSelectedTempDocument(i: number): void {
    let currentFile = this['tempByte' + (i + 1)];
    if (["image/gif",
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/x-png",
      "image/tiff",
      "image/bmp",
      "image/x-xbitmap",
      "image/x-jg",
      "image/x-emf",
      "image/x-wmf",
      "application/pdf"].indexOf(currentFile.Type) !== -1) {
      var fileURL = URL.createObjectURL(this['tempBlob' + (i + 1)]);
      window.open(fileURL);
    }
    else {
      saveAs(this['tempBlob' + (i + 1)], currentFile.FileName + '.' + currentFile.extension);
    }
  }
  tempFiles: any[] = [];
  public removeTempDocument(i: number): void {
    const formData = new FormData();
    debugger;
    let tempFile = 'tempFile' + (i + 1);
    formData.append('fileRootPath', this._localStorage.getNonTradingDocumentPath());
    formData.append('oldDocument', this[tempFile]);
    this.fileIndex.splice(this.fileIndex.indexOf(i), 1);
    this.selectedFiles.splice(this.selectedFiles.indexOf(this['document' + (i + 1)][0]), 1);
    this._commonService.uploadTempFile(formData).subscribe((result: any) => {
      debugger;
      if (!result.document_Path) {
        this.attachment[i].Progress = 0;
        this['document' + (i + 1)] = null;
        this['tempFile' + (i + 1)] = null;
        this['tempByte' + (i + 1)] = null;
        this['tempBlob' + (i + 1)] = null;
        this['docInput' + (i + 1)].nativeElement.value = '';
      }
    });
  }

  public onClear(): void {
    if (this.selectedFiles.length > 0 || this.removedFiles.length > 0) {
      let dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
        panelClass: "custom-dialog-container",
        data: { confirmationDialog: 1 }
      });
      dialogRef.componentInstance.confirmMessage = "Are you sure? You wish to cancel";
      dialogRef.componentInstance.componentName = "Multiple Files Attachment";

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.selectedFiles = [];
          this._dialogRef.close();
        }
      });
    } else {
      this._dialogRef.close();
    }
  }

  public openRemoveTempFileConfirmationDialog(i: number): void {
    debugger;
    let dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure, want to remove this file?";
    dialogRef.componentInstance.componentName = "Multiple Files Attachment";
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        this.removeTempDocument(i);
      }
    });
  }

  public openRemoveFileConfirmationDialog(i: number): void {
    debugger;
    let dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      panelClass: "custom-dialog-container",
      data: { confirmationDialog: 1 }
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure, want to remove this file?";
    dialogRef.componentInstance.componentName = "Multiple Files Attachment";
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger;
        this.removeUploadedDocuments(i);
      }
    });
  }

  private removeUploadedDocuments(index: number): void {
    debugger;
    if (index == 0) {
      this.removedFiles.push({
        index: index,
        name: this.oldDocument1
      });
      this.removedfilesIndex.push(index);
      this.oldDocument1 = null;
      this.objAttach[0].file_path = '';
      this.document1 = null;
      this.tempFile1 = null;
      this.attachment[0].Progress = 0;
    } else if (index == 1) {
      this.removedFiles.push({
        index: index,
        name: this.oldDocument2
      });
      this.removedfilesIndex.push(index);
      this.oldDocument2 = null;
      this.objAttach[1].file_path = '';
      this.document2 = null;
      this.tempFile2 = null;
      this.attachment[1].Progress = 0;
    } else if (index == 2) {
      this.removedFiles.push({
        index: index,
        name: this.oldDocument3
      });
      this.removedfilesIndex.push(index);
      this.oldDocument3 = null;
      this.objAttach[2].file_path = '';
      this.document3 = null;
      this.tempFile3 = null;
      this.attachment[2].Progress = 0;
    } else if (index == 3) {
      this.removedFiles.push({
        index: index,
        name: this.oldDocument4
      });
      this.removedfilesIndex.push(index);
      this.oldDocument4 = null;
      this.objAttach[3].file_path = '';
      this.document4 = null;
      this.tempFile4 = null;
      this.attachment[3].Progress = 0;
    }
  }

  public onUploadDocuments(): void {
    debugger;
    let docSize: number = 0;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      docSize += this.selectedFiles[i].size;
    }
    if ((docSize/1024) > +this._localStorage.getNonTradingDocumentSize()) {
      this._confirmationDialog.openAlertDialog("Maximum size for all files can't be greater than 15MB", 'Multiple Files Attachment');
      return;
    }
    let attachedFiles: any[] = [];
    for (let i = 0; i < 4; i++) {
      this.tempFiles.push({
        index: i,
        name: this['tempFile' + (i + 1)]
      });
    }
    for (let i = 0; i < this.objAttach.length; i++) {
      attachedFiles.push({
        base_path_id: this.objAttach[i].base_path_id,
        file_path: this.objAttach[i].file_path,
        tempByte: this['tempByte' + (i + 1)],
        tempBlob: this['tempBlob' + (i + 1)],
        tempFile: this['tempFile' + (i + 1)]
      });
    }
    let objAttach: any = {
      selectedFiles: this.selectedFiles,
      fileIndex: this.fileIndex,
      objAttachView: attachedFiles,
      removedFiles: this.removedFiles,
      removedFileIndex: this.removedfilesIndex,
      tempFiles: this.tempFiles
    };
    this._dialogRef.close(objAttach);
  }

  public getDocumentPathView(): void {
    let basePath: any[] = [];
    for (let i = 0; i < this.objAttach.length; i++) {
      basePath.push({
        base_path_id: +this.objAttach[i].base_path_id
      })
    }
    let objView: any = {
      GetFilePath: JSON.stringify(basePath)
    }
    this._commonService.getDocumentPathView(objView).subscribe((result: any) => {
      if (result) {
        // console.log(result, 'Document View Result');
        this.getFiles(JSON.parse(JSON.stringify(result)));
      }
    });
  }

  public getFiles(filePaths: any): void {
    let formData: FormData = new FormData();
    formData.append('filePaths', filePaths);
    formData.append('fileNames', JSON.stringify(this.objAttach));

    this._commonService.fileAsBytes(formData).subscribe((res) => {
      console.log(res);
      this.fileBytes = res;
      for (let i = 0; i < res.length; i++) {
        if ([null, 'null', undefined, 'undefined', NaN, 'NaN', 0, '0', ''].indexOf(res[i]) === -1) {
          let currentFile = JSON.parse(res[i]);
          if ([null, 'null', undefined, 'undefined', NaN, 'NaN', 0, '0', ''].indexOf(currentFile[0]) === -1) {
            if ([null, 'null', undefined, 'undefined', NaN, 'NaN', 0, '0', ''].indexOf(this['tempByte' + (i + 1)]) !== -1)
              this.blobArray[i] = this.dataURItoBlob(currentFile[0].file, currentFile[0].Type);
          }
        }
      }
      for (let k = 0; k < res.length; k++) {
        if ([null, 'null', undefined, 'undefined', NaN, 'NaN', 0, '0', ''].indexOf(this['tempByte' + (k + 1)]) === -1) {
          this.objAttach[k].file_path = '';
        }
      }
    });
  }

  private dataURItoBlob(dataURI: any, type: any): any {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: type });
    return blob;
  }

  public viewSelectedDocument(i: number): void {
    let currentFile = JSON.parse(this.fileBytes[i]);
    if (["image/gif",
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/x-png",
      "image/tiff",
      "image/bmp",
      "image/x-xbitmap",
      "image/x-jg",
      "image/x-emf",
      "image/x-wmf",
      "application/pdf"].indexOf(currentFile[0].Type) !== -1) {
      var fileURL = URL.createObjectURL(this.blobArray[i]);
      window.open(fileURL);
    }
    else {
      saveAs(this.blobArray[i], currentFile[0].FileName + '.' + currentFile[0].extension);
    }
  }

}
