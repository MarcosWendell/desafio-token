import { DateCheckDTO } from '@app/models/date-check';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Injector } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { EventDTO } from '@app/models/event';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ApplyCssErrorService } from '@app/shared/apply-css-error/apply-css-error.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CssError } from '@app/shared/apply-css-error/css-error';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends CssError implements OnInit {
  form: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  checked = false;

  constructor(
    private api: ApiService,
    private formBuider: FormBuilder,
    private router: Router,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-blue' });
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
      multipleDays: [null],
      endHour: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)
        ]
      ]
    });
  }

  onClick() {
    this.checked = !this.checked;
  }

  async onSubmit() {
    if (this.form.valid) {
      const data: EventDTO = this.form.value;
      data.startDate = new Date(data.startDate).toISOString();
      if (data.endDate) {
        data.endDate = new Date(data.endDate).toISOString();
      }

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
