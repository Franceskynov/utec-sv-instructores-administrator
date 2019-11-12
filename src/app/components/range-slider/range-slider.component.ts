import {Component, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation, OnInit} from '@angular/core';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RangeSliderComponent implements OnInit, AfterViewInit {

  @ViewChild('range') $range: ElementRef;
  public rangeTrackRect = { left: 0, right: 0 , width: 0 };
  @Output() change = new EventEmitter<number>();
  active = false;
  posX = 0;
  ratio = 0;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.rangeTrackRect
      = this.$range.nativeElement.getBoundingClientRect();
  }

  getTransformVal() {
    return `translate3d(${this.posX}px, 0, 0)`;
  }
  rangeHandler(e: MouseEvent) {
    const { clientX } = e;
    const {left, right, width} = this.rangeTrackRect;
    if (clientX < left || clientX > right) { return; }

    this.posX = e.clientX - left;
    this.ratio = (this.posX / width) * 100;
    this.change.emit(Math.round((360 * this.ratio) / 100));
  }

  mousedownHanlder(e: MouseEvent) {
    e.preventDefault();
    this.active = true;
    this.rangeHandler(e);
  }

  mousemoveHanlder(e: MouseEvent) {
    if (!this.active) { return; }
    e.preventDefault();
    this.rangeHandler(e);
  }

  mouseupHanlder() {
    this.active = false;
  }

}
