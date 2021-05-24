import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	constructor(private authenticationService: AuthService) {}

	email: string;
	password: string;

	signIn() {
		this.authenticationService.login(this.email, this.password);
		this.email = '';
		this.password = '';
	}

	signOut() {
		this.authenticationService.logout();
	}
}
