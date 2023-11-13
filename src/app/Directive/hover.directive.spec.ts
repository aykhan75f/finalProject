import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HoverDirective } from './hover.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div appHover></div>`
})
class TestHoverComponent { }

describe('HoverDirective', () => {
  let fixture: ComponentFixture<TestHoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoverDirective, TestHoverComponent],
    });

    fixture = TestBed.createComponent(TestHoverComponent);
    fixture.detectChanges();
  });

  it('should apply styles on mouseenter', () => {
    const divElement = fixture.debugElement.query(By.directive(HoverDirective)).nativeElement;

    divElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(divElement.style.margin).toEqual('8px');
    expect(divElement.style.padding).toEqual('12px');
    expect(divElement.style.transition).toEqual('all 0.8s ease-in 0s');
  });

  it('should apply styles on mouseleave', () => {
    const divElement = fixture.debugElement.query(By.directive(HoverDirective)).nativeElement;

    divElement.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    expect(divElement.style.margin).toEqual('10px');
    expect(divElement.style.padding).toEqual('20px');
    expect(divElement.style.transition).toEqual('all 0.8s ease-out 0s');
  });
});
