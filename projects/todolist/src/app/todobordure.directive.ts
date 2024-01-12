import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[bordure-highlight]',
  standalone: true
})
export class TodobordureDirective {

  @HostBinding('style.borderColor')
  defaultBorderColor= 'transparent';

  @HostBinding('style.borderSize')
  defaultBorderSize= '3px';

  @HostBinding('style.borderStyle')
  defaultBorderStyle= 'solid';

  constructor() { }

  @HostListener('mouseenter')
  onMouseEnter(){
    this.defaultBorderColor= "blue"
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.defaultBorderColor = "transparent"
  }

}
