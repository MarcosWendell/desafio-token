import { ApplyCssErrorService } from './apply-css-error.service';
import { FormGroup } from '@angular/forms';
import { Injector } from '@angular/core';

export class CssError {
  private applyCssError: ApplyCssErrorService;

  constructor(private injector: Injector) {
    this.applyCssError = this.injector.get(ApplyCssErrorService);
  }

  verifyInvalidTouched(form: FormGroup, campo: string) {
    return this.applyCssError.verifyInvalidTouched(form, campo);
  }

  verifyValidTouched(form: FormGroup, campo: string) {
    return this.applyCssError.verifyValidTouched(form, campo);
  }

  applyCssErro(form: FormGroup, campo: string) {
    return this.applyCssError.applyCssErro(form, campo);
  }
}
