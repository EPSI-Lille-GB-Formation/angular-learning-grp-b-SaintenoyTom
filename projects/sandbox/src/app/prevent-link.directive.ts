import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[no-open]',
  standalone: true
})
export class PreventLinkDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  onClick(event: Event): void{
    event.preventDefault();
  }

}
