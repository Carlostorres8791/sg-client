import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appActiveLink]'
})
export class ActiveLinkDirective {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

    @HostListener('focus', ['$event.target'])
    onFocus(target: any) {
      this.renderer.removeClass(this.element.nativeElement, 'collapsed');
    }

    @HostListener('blur') onblur() {
      this.renderer.addClass(this.element.nativeElement, 'collapsed');
    }


}
