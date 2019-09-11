/**
 * @author franceskynov@gmail.com | franceskynov@yandex.com
 * 
 */
import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import * as humanize from 'humanize';

type AOA = any[][];

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {

    readonly WAITING_FILE = 'No se a cargado ningun archivo para procesar';
    public textFromFile: string;
    public isShowTextFromFile: boolean;
    public isBtnUploadShow: boolean;
    public textToStateFile: string;
    public filename: any;
    public columnsDescribe: Array<string>;
    @ViewChild('input')
    myInputVariable: any;
    @Output()
    upload: EventEmitter<any> = new EventEmitter<any>();
    public files: any;
    public tmp: Array<any>;
    public data: AOA = [ [1, 2], [3, 4] ];
  constructor(
      private toaster: ToastrService
  ) { }

  ngOnInit() {
  }

  public removeFile(): void {
      this.filename = '';
      this.textFromFile = '';
      this.isShowTextFromFile = false;
      this.textToStateFile = this.WAITING_FILE;
      this.isBtnUploadShow = false;
      this.myInputVariable.nativeElement.value = '';
  }

  public readFile(): void {
      this.isShowTextFromFile = true;
      this.upload.emit({
          fileInfo: this.files,
          data: this.data
      });

       //this.data = [ [1, 2], [3, 4] ];
  }

  public fileNfo(file): any {
      this.tmp = file.split('.');
      return{
          name: this.tmp[0],
          format: this.tmp[1]
      };
  }

  public onFileChange(evt: any, input: any) {
      //console.log(input.files);
      if (input.files.length > 0) {

          this.filename = input.files[0].name;
          this.files = {
              name: input.files[0].name,
              size: humanize.filesize(input.files[0].size),
              type: input.files[0].type,
              lastModifiedDate: input.files[0].lastModifiedDate

          };
    
          const target: DataTransfer = <DataTransfer>(evt.target);
          if (target.files.length !== 1) this.toaster.error('Por el momento no se pueden procesar multiples archivos', 'Error');
          const reader: FileReader = new FileReader();
          reader.onload = (e: any) => {
              /* read workbook */
              const bstr: string = e.target.result;
              const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

              /* grab first sheet */
              const wsname: string = wb.SheetNames[0];
              const ws: XLSX.WorkSheet = wb.Sheets[wsname];

              /* save data */
              this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
              //console.log(<AOA>(XLSX.utils.sheet_to_json(ws)))
          };
          reader.readAsBinaryString(target.files[0]);
          // console.log(this.data);
          // this.upload.emit(this.files);
      }
        // console.log(input.files.length);

    }

}
