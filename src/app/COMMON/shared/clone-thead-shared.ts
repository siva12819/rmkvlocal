import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
    selector: '[cloneThead]'
})

export class CloneSharedDirective implements AfterViewInit{

    constructor(private el: ElementRef) {}

    ngAfterViewInit(){
        let cloned = this.el.nativeElement.cloneNode(true);

        let table = cloned.querySelector("table");
            table.style.position = 'sticky';
            table.style.top = '0';
            table.style.zIndex = '100';

        this.el.nativeElement.appendChild(table);
    }
}