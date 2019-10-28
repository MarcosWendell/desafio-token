import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';

import { AuthService } from '@app/services/auth.service';
import { AuthDTO } from './../../models/auth';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ApplyCssErrorService } from '@app/shared/apply-css-error/apply-css-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private applyCssError: ApplyCssErrorService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]]
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
      const data: AuthDTO = this.form.value;
      this.auth
        .login(data)
        .pipe(
          tap((user) => {
            this.auth.token = user.token;
            this.auth.user = user.name;
            this.auth.isLoggedIn = true;

            const redirect = this.auth.redirectUrl ? this.router.parseUrl(this.auth.redirectUrl) : '/events';

            this.router.navigateByUrl(redirect);
          }),
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
