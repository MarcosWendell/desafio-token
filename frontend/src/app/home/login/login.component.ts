import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { take } from 'rxjs/operators';

import { AuthService } from '@app/services/auth.service';
import { AuthDTO } from './../../models/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null],
      password: [null]
    });
  }

  onSubmit() {
    const data: AuthDTO = this.form.value;
    console.log(data);
    this.auth.login(data)
      .pipe(take(1))
      .subscribe(dados => {
        console.log(dados);
        this.form.reset();
      },
      (error: any) => alert('erro'));
  }

}
