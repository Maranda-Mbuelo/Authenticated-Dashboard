import { Component, OnDestroy } from '@angular/core';
import { LoginForm } from 'src/app/types/auth';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  loading: boolean = false;
  popupType: 'error' | 'success' | null = null;
  popupMessage: string = '';
  private loadingSubscription!: Subscription;
  form: LoginForm = {
    email: '',
    password: ''
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
  
  submit(){
    if(this.loading){
      return;
    }

    if(this.form){
      this.authService.logIn(this.form);
    }
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
