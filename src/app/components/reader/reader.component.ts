/**
 * @author franceskynov@gmail.com | franceskynov@yandex.com
 *
 */

import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as printJS from 'print-js';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  public enbld: boolean;
  public files: any;
  public viewOptions: boolean;
  public titles: Array<string>;
  public contents: Array<string>;
  public finalData: Array<any>;
  @Input('validators') validers:any;
  @Output()
  retrieve: EventEmitter<any> = new EventEmitter<any>();


  constructor(
      private toaster: ToastrService,
  ) {
    this.viewOptions = true;
    this.enbld       = true;
    this.files       = {name: '', size: 0, lastModifiedDate: '', mimetype: ''};
    this.titles      = [];
    this.contents    = [];
    this.finalData   = [];
  }

  ngOnInit() {

  }

  /**
   *
   * @param content
   */
  public upload(content): void {

    this.reset();
    //console.log('content', content)
    this.enbld = false;
     if ( content ) {
      this.toaster.success(environment.MESSAGES.UPLOAD_SUCCESS, 'OK');
      this.files = content;

      this.finalData = this.prepare(content.data)
      console.log('prepare', this.finalData);
     }
  }

  public lomtik (data, position) {

    var s = []
    for (var i = 0; i < data.length; i++) {

      if (typeof data[i][position] != 'undefined') {
        s.push(data[i][position])
      }
    }

    return s
  }

  /**
   *
   * @param data
   */
  public prepare(data): any {

    data.forEach((element, j) => { if (j > 0 ) this.contents.push(element) });
    data.forEach((element, i) => { if (i == 0 ) this.titles.push(...element) });
    let tmp = []
    this.titles.forEach((e, i) => {
      tmp.push(this.lomtik(this.contents, i))
    })

    return {
      columnNames: this.titles,
      rows: tmp
    }
  }

  /**
   *
   */
  public save(): void {

  }

  /**
   *
   */
  public reset(): void {
    this.enbld     = true;
    this.files     = [];
    this.contents  = [];
    this.titles    = [];
    this.finalData = [];
  }

  /**
   *
   * @param table
   */
  public print(table): void {
    // printJS.default({printable: table.id, type: 'html', header: 'Invoice', documentTitle: 'Invoice', targetStyles: ['*']})
  }

  public retrieveData(): void {

    if (this.verifyData(this.titles)) {
      this.retrieve.emit({
        data: this.finalData
      })
      this.toaster.success(environment.MESSAGES.FILE_TRANSFORMED_OK, 'Ok')
    } else {
      this.toaster.error(environment.MESSAGES.DOCUMENT_FORMAT_ERROR, 'Error')
    }
  }

  public verifyData(cn) {
    var status = false
    var xyz = this.validers.map((v, i) => {
      if (v.columnName == cn[i]) {
        status = true

      } else {
        status = false
      }
    })

    return status

  }


}
