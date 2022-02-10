import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  form: FormGroup | undefined;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  admin: any = {
    username: 'paratica',
    password: '^x/v+$gmh8j%*~K+'
  }
  normal: any = {
    username: 'paratica-normal',
    password: 'MfDQJX~mJKeC/7f@'
  }

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  setUser(type: 'normal' | 'admin') {
    this.form?.patchValue(this[type]);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    this.loading$.next(true);
    this.authService.login(this.form?.value)
      .subscribe(
        next => {
          this.loading$.next(false);
          this.router.navigate([
            this.authService.isAdmin ? '/admin' : '/dashboard'
          ]).then();
        },
        error => {
          this.loading$.next(false);
        });
  }
}
