import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@app/services/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { AuthDTO } from '@app/models/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CssError } from '@app/shared/apply-css-error/css-error';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends CssError implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const data: AuthDTO = this.form.value;
      this.auth
        .register(data)
        .pipe(
          tap(() => this.router.navigate(['/login'])),
          catchError((error: any) => {
            console.log(error.error.message);
            return of(null);
          })
        )
        .subscribe();
    } else {
    }
  }
}
