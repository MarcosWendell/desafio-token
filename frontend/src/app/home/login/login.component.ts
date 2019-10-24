import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';

import { AuthService } from '@app/services/auth.service';
import { AuthDTO } from './../../models/auth';
import { of } from 'rxjs';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  verifyInvalidTouched(campo: string) {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

  verifyValidTouched(campo: string) {
    return this.form.get(campo).valid && this.form.get(campo).touched;
  }

  applyCssErro(campo: string) {
    if (this.verifyInvalidTouched(campo)) {
      return {
        'is-invalid': true
      };
    } else if (this.verifyValidTouched(campo)) {
      return {
        'is-valid': true
      };
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const data: AuthDTO = this.form.value;
      this.auth
        .login(data)
        .pipe(
          tap((user) => {
            this.auth.token = user.token;
            this.auth.user = user.id;
            this.router.navigate(['/events']);
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
