import { Directive, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {

  @HostBinding('style.backgroundColor')
  bgColor= 'transparent';

  @Input('bg-color')
  bgHighlightColor = 'yellow';

  @Input('default-color')
  bgHighlightDefaultColor= "transparent";

  constructor(){ }

  ngAfterViewInit(){
    this.bgColor = this.bgHighlightDefaultColor
  }

  @HostListener('mouseenter')
  onMouseEnter(){
    this.bgColor = this.bgHighlightColor;
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.bgColor = this.bgHighlightDefaultColor
  }
}
