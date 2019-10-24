import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EventDTO } from '@app/models/event';
import { of } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private api: ApiService,
    private formBuider: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.formBuider.group({
      title: [null, [Validators.required, Validators.minLength(5)]],
      description: [null, [Validators.required, Validators.minLength(5)]],
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

  onSubmit() {
    if (this.form.valid) {
      const data: EventDTO = this.form.value;
      this.api
        .updateEvent(this.route.snapshot.params.id, data)
        .pipe(
          tap(() => {
            this.router.navigate(['']);
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
