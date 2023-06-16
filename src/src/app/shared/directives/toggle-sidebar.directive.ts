import { DOCUMENT } from '@angular/common';
import { Directive, HostListener, Inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleSidebar]'
})
export class ToggleSidebarDirective {

  toggle: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }


  @HostListener('click', ['$event.target'])
  onFocus(target: any) {
    if (this.toggle) {
      this.renderer.removeClass(this.document.body, 'toggle-sidebar');
    } else {
      this.renderer.addClass(this.document.body, 'toggle-sidebar');
    }
    this.toggle = !this.toggle;
  }


}
