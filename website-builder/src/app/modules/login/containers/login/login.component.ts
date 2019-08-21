import { Component } from '@angular/core';
import { LoginFacade } from '../../login.facade';
import { LoginRequest } from '../../interfaces/login-request.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'wb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private readonly loginFacade: LoginFacade
  ) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(6), Validators.max(18)])
    });
  }

  login() {
    this.loginFacade.login(this.form.value as LoginRequest);
  }

}
