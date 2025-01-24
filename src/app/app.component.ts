import { Component, Compiler } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as $ from "jquery";
import { LocalStorage } from './COMMON/shared/local-storage';
import { HttpLoader } from './COMMON/services/app-interceptor/http-client-interceptor/http-interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loaderView: boolean;
  loaderCount = 1;

  constructor(private _compiler: Compiler,
    private _localStorage: LocalStorage,
    private _httpLoader: HttpLoader) { this._compiler.clearCache(); }

  ngOnInit() {
    this._httpLoader.getLoaderView().subscribe((result: boolean) => {
      this.loaderCount = result ? this.loaderCount + 1 : this.loaderCount - 1;
      if (this.loaderCount !== 0) {
        $("app-root")[0].style.pointerEvents = "none";
      } else {
        $("app-root")[0].style.pointerEvents = "auto";
      }
    });
  }
}
