import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { EventDTO } from '@app/models/event';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ApplyCssErrorService } from '@app/shared/apply-css-error/apply-css-error.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private api: ApiService,
    private formBuider: FormBuilder,
    private router: Router,
    private applyCssError: ApplyCssErrorService
  ) {}

  ngOnInit() {
    this.form = this.formBuider.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(3)]],
      startDate: [null, Validators.required],
      endDate: [null],
      startHour: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)
        ]
      ],
      endHour: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)
        ]
      ]
    });
  }

  verifyInvalidTouched(campo: string) {
    return this.applyCssError.verifyInvalidTouched(this.form, campo);
  }

  verifyValidTouched(campo: string) {
    return this.applyCssError.verifyValidTouched(this.form, campo);
  }

  applyCssErro(campo: string) {
    return this.applyCssError.applyCssErro(this.form, campo);
  }

  onSubmit() {
    if (this.form.valid) {
      const data: EventDTO = this.form.value;
      this.api
        .createEvent(data)
        .pipe(
          tap(() => {
            this.router.navigate(['/events']);
          }),
          catchError((error: any) => {
            console.log(error.error.message);
            return of(null);
          })
        )
        .subscribe();
    }
  }
}
