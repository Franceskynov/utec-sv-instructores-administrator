import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private fb: FormBuilder) { }

  public findPermission( elements, permission: any ) {

    const form = new FormGroup({});
    const contr = {};
    elements.forEach(key => {
    const validations: Validators[] = [];
    const controls = [];

    if ( permission[key]) {

      if ( permission[key].required) {
        validations.push(Validators.required);
      }


      if ( permission[key].minLength) {
        validations.push(Validators.minLength(permission[key].minLength));
      }

      if ( permission[key].maxLength) {
        validations.push(Validators.maxLength(permission[key].maxLength));
      }

      if ( permission[key].email) {
        validations.push(Validators.email);
      }

      contr[key] = ['', validations];

      } else {
        contr[key] = [''];
      }
    });
    return this.fb.group(contr);
 }
}
