import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NavItem } from '../../models/common-model';
import { Router } from '@angular/router';
import { LocalStorage } from '../../shared/local-storage';

@Component({
  selector: 'app-child-menu-items',
  templateUrl: './child-menu-items.component.html',
  styleUrls: ['./child-menu-items.component.scss']
})
export class ChildMenuItemsComponent implements OnInit {

  @Input() items: NavItem[];
  @ViewChild('childMenu', { static: true }) public childMenu: any;

  constructor(public _router: Router, private _localStorage: LocalStorage) { }

  ngOnInit() { }

  public getMenu(menuPath: string): void {
    this._router.navigate(["/" + this._localStorage.getMenuPath() + menuPath]);
  }

}
