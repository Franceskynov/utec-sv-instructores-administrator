import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlynumber]'
})
export class OnlynumberDirective {

  public  regexStr = '[0-9]';
  constructor(private el: ElementRef) { }

  @Input() OnlyNumber: boolean;

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {
      // console.log(this.el.nativeElement.value)
      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^0-9]/g, '').replace(/\s/g, '');
      event.preventDefault();
      // console.log(this.el.nativeElement.value)

    }, 100);
  }


}
