import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPassword: FormGroup;
  constructor(public authService: AuthService,private fb: FormBuilder){
    this.forgotPassword = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      
    });
  }

  onSubmit(){
    if (this.forgotPassword.valid) {
      const email = this.forgotPassword.get('email')!.value;
      this.authService.ForgotPassword(email);
    }
    else {
      alert('password invalid')
    }

  }

}
