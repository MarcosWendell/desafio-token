import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@app/services/auth.service';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { AuthDTO } from '@app/models/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]]
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
