import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide = true;
  form = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private _router: Router,
              private loginService: LoginService) {
  }

  offlineMode(): void {
    this._router.navigate(['/dashboard']);
  }

  login(): void {
    const user = this.form.controls.user.value;
    const pwd = this.form.controls.password.value;
    if (user && pwd && this.loginService.login(user, pwd)) {
      this._router.navigate(['/dashboard']);
    } else {
      // Alert of error
    }
  }
}