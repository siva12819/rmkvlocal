import { Directive, AfterViewInit, ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Directive({
    selector: '[cloneThead]'
})

export class CloneDirective implements AfterViewInit{

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

@Directive({
    selector: '[cdkFixedHeader]'
  })
  
  export class FixedHeaderDirective implements AfterViewInit{
  
      constructor(private el: ElementRef, private renderer:Renderer2) {}
  
      ngAfterViewInit(){
  
          // get the viewport element
          let cdkViewport = this.el.nativeElement.closest("cdk-virtual-scroll-viewport");
  
          // check if table was already cloned
          let clonedHeader = cdkViewport.querySelectorAll('.cloned-header');
  
          // create a clone if not exists
          if (clonedHeader.length == 0)
          {
              let table = this.el.nativeElement.closest('table');
              let cloned = table.cloneNode(true);
                  cloned.style.position = 'sticky';
                  cloned.style.top = '0';
                  cloned.style.zIndex = '100';
  
              // remove tbody with elements
              let tbody = cloned.querySelector('tbody');
              cloned.removeChild(tbody);
  
              // add a "helper" class
              this.renderer.addClass(cloned, "cloned-header");
  
              // append cloned object to viewport
              cdkViewport.appendChild(cloned);
          }
          //
          //  walk through all <tr> with their <td> and store the max value in an array
          //
          let width = [];
          let td = this.el.nativeElement.querySelectorAll("td");
          width = new Array(td.length).fill(0);
  
          td.forEach((item,index) => {
              const w = item.getBoundingClientRect().width;
              width[index] = Math.max(w, width[index]);
          })
          //
          //  get <th> elements and apply the max-width values
          //
          let th = cdkViewport.querySelectorAll('.cloned-header th');
          th.forEach((item,index) => {
              this.renderer.setStyle(item, "min-width", width[index] + 'px')
          })
      }
  }

