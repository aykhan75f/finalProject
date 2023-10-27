import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private element:ElementRef,private renderer:Renderer2) { }
  @HostListener('mouseenter') onmouseover()
  {
    this.renderer.setStyle(this.element.nativeElement,'margin','8px');
    this.renderer.setStyle(this.element.nativeElement,'padding','12px');
    this.renderer.setStyle(this.element.nativeElement,'transition','0.8s ease-in');
  }
  @HostListener('mouseleave') onmouseout()
  {
    this.renderer.setStyle(this.element.nativeElement,'margin','10px');
    this.renderer.setStyle(this.element.nativeElement,'padding','20px');
    this.renderer.setStyle(this.element.nativeElement,'transition','0.8s ease-out');
  }
}
