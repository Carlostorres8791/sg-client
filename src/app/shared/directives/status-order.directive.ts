import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appStatusOrder]'
})
export class StatusOrderDirective implements OnInit, OnChanges {

  @Input() status!: string;

  constructor(
    private element: ElementRef,
    private render: Renderer2
  ) {
    //this.render.setStyle(this.element.nativeElement, 'color', 'white')
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setStatus(this.status);
  }

  ngOnInit(): void {
    this.setStatus(this.status);
  }

  setStatus(status: string) {
    if (status.includes('Sin iniciar')) {
      this.render.addClass(this.element.nativeElement, 'text-bg-light');
    } else if (status.includes('Terminada')) {
      this.render.addClass(this.element.nativeElement, 'text-bg-success');
    } else{
      this.render.addClass(this.element.nativeElement, 'text-bg-info');
    }
  }

}
