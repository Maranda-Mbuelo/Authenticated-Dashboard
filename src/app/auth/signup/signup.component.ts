import { Component } from '@angular/core';
import { SignUpForm } from 'src/app/types/auth';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  passwordMatched: boolean = true;
  loading: boolean = false;
  popupType: 'error' | 'success' | null = null;
  popupMessage: string = '';
  private loadingSubscription!: Subscription;
  form: SignUpForm = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private authService: AuthService){
    this.loadingSubscription = this.authService.loading$.subscribe((loading) => {
      this.loading = loading;
    });

    this.authService.popupType$.subscribe((type) => {
      this.popupType = type as 'error' | 'success'; // Cast the type to the union type
    });

    this.authService.popupMessage$.subscribe((message) => {
      this.popupMessage = message;
    });
  }


  submit() {
    if(this.loading){
      return
    }
    if(this.form.password !== this.form.confirmPassword ){
      this.passwordMatched = false;
      return
    }
    this.authService.signUp(this.form);
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
