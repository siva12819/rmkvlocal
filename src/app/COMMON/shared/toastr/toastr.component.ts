import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit {

  constructor(
    private toastr: ToastrService) { }


  ngOnInit(): void {
  }

  public showSuccess(value: string, ComponenName?: string): void {
    this.toastr.clear();
    this.toastr.success(value, ComponenName, {
      timeOut: 2000
    });
  }

  public showWarning(value: string, ComponenName?: string): void {
    this.toastr.clear();
    this.toastr.warning(value, ComponenName, {
      timeOut: 1000
    });
  }

  public showError(value: string, ComponenName?: string): void {
    this.toastr.clear();
    this.toastr.error(value, ComponenName, {
      timeOut: 2000
    });
  }

  public showInfo(value: string, ComponenName?: string): void {
    this.toastr.clear();
    this.toastr.info(value, ComponenName, {
      timeOut: 2000
    });
  }

}
