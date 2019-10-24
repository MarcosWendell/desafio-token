import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApplyCssErrorService {

  constructor() { }

  verifyInvalidTouched(form: FormGroup, campo: string) {
    return form.get(campo).invalid && form.get(campo).touched;
  }

  verifyValidTouched(form: FormGroup, campo: string) {
    return form.get(campo).valid && form.get(campo).touched;
  }

  applyCssErro(form: FormGroup, campo: string) {
    if (this.verifyInvalidTouched(form, campo)) {
      return {
        'is-invalid': true
      };
    } else if (this.verifyValidTouched(form, campo)) {
      return {
        'is-valid': true
      };
    }
  }
}
