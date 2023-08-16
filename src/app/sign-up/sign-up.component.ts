import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { DarkmodeService } from '../services/darkmode.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  constructor(public authService: AuthService, public dm:DarkmodeService) { }
  ngOnInit() { }
}