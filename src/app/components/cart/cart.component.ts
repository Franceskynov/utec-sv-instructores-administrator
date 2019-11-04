import { Component, AfterViewInit, ViewChildren, Directive, QueryList, ElementRef, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { InstructorSharingService } from 'app/services/instructor-sharing.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  public config: PerfectScrollbarConfigInterface = {};
  public subscription: Subscription;
  public element: any;
  public elements: Array<any>;
  public isOpen: boolean;
  public numberOfElements: number;
  public isEmpty: boolean;
  @ViewChildren('cart') cart: ElementRef;
  constructor(
    private elementRef: ElementRef,
    private instructorSharingService: InstructorSharingService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isOpen = false;
    this.isEmpty = true;
    this.numberOfElements = 0;
    this.elements = [];
    this.element = {
      id: 0,
      nombre: null,
      carnet: null,
      cum: null,
      carrera: null
    };

    this.subscription = this.instructorSharingService.getInstructor().subscribe(result => {
      this.addElement(result);
    });
  }

  public addElement(row): void {
    this.isEmpty = false;
    this.numberOfElements ++;
    this.elements.push(row);
  }

  public manipulateModal(): void {
    this.isOpen = (!this.isOpen);
  }

  public deleteElement(element): void {
    this.instructorSharingService.setStatus(element);
    for ( let i = 0; i < this.elements.length; i++) {
      if ( this.elements[i].id === element.id) {
        this.elements.splice(i, 1);
      }
    }
  }

  public assign(): void {
    localStorage.removeItem('instructores');
    localStorage.setItem('instructores', JSON.stringify(this.elements));
    this.router.navigate(['/admin/instructores/asignacion']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
