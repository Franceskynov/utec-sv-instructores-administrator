import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoaderService } from 'app/services/loader.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoaderComponent implements OnInit {

  public color = 'primary';
  public mode = 'indeterminate';
  public value = 50;
  public isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService) { }


  ngOnInit() {
  }

}
