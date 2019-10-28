import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventDTO } from '@app/models/event';
import { of, Observable } from 'rxjs';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  form: FormGroup;
  event: EventDTO;
  bsConfig: Partial<BsDatepickerConfig>;
  checked = false;

  constructor(
    private api: ApiService,
    private formBuider: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.params.id;
    this.bsConfig = Object.assign({}, { containerClass: 'theme-blue' });
    this.api
      .getEvent(eventId)
      .pipe(
        tap((event: EventDTO) => {
          this.event = event;
          this.form = this.formBuider.group({
            title: [
              this.event.title,
              [Validators.required, Validators.minLength(5)]
            ],
            description: [
              this.event.description,
              [Validators.required, Validators.minLength(5)]
            ],
            startDate: [this.event.startDate, Validators.required],
            endDate: [this.event.endDate ? this.event.endDate : null],
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
        })
      )
      .subscribe();
  }

  onClick() {
    this.checked = !this.checked;
  }

  onSubmit() {
    if (this.form.valid) {
      const data: EventDTO = this.form.value;
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
