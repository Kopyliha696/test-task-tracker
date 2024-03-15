import { Component, HostBinding } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
    imports: [
      ReactiveFormsModule,
      MatButtonModule
    ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  providers: [StorageService],
})
export class SignInComponent {

  readonly emailControl = new FormControl('', [Validators.email, Validators.required]);
  @HostBinding('class') get className() {
    return 'app-sign-in';
  }

  constructor(private router: Router, private storage: StorageService) {}

  onClick() {
    if (this.emailControl.invalid) {
      return;
    }

    this.storage.set('email', this.emailControl.value);
    this.router.navigateByUrl('/tasks');
  }
}
