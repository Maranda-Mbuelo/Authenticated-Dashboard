import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from './popup/popup.component'



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AuthModule { }
