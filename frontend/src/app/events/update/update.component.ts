import { Component, OnInit, Injector } from '@angular/core';
import { catchError, tap, finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventDTO } from '@app/models/event';
import { of } from 'rxjs';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { ApplyCssErrorService } from '@app/shared/apply-css-error/apply-css-error.service';
import { CssError } from '@app/shared/apply-css-error/css-error';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent extends CssError implements OnInit {
  form: FormGroup;
  event: EventDTO;
  bsConfig: Partial<BsDatepickerConfig>;
  checked = false;
  loading = true;

  constructor(
    private api: ApiService,
    private formBuider: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    const eventId = this.route.snapshot.params.id;
    this.bsConfig = Object.assign({}, { containerClass: 'theme-blue' });
    this.api
      .getEvent(eventId)
      .pipe(
        tap((event: EventDTO) => {
          this.event = event;

          const sDate = new Date(event.startDate);
          let eDate = null;
          if (event.endDate) {
            eDate = new Date(event.endDate);
          }

          this.form = this.formBuider.group({
            title: [
              this.event.title,
              [Validators.required, Validators.minLength(3)]
            ],
            description: [
              this.event.description,
              [Validators.required, Validators.minLength(3)]
            ],
            startDate: [sDate, Validators.required],
            endDate: [eDate],
            startHour: [
              this.event.startHour,
              [
                Validators.required,
                Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)
              ]
            ],
            endHour: [
              this.event.endHour,
              [
                Validators.required,
                Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)
              ]
            ]
          });
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe();
  }

  onClick() {
    this.checked = !this.checked;
  }

  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      const data: EventDTO = this.form.value;
      data.startDate = new Date(data.startDate).toISOString();
      if (data.endDate) {
        data.endDate = new Date(data.endDate).toISOString();
      }
      this.api
        .updateEvent(this.route.snapshot.params.id, data)
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
