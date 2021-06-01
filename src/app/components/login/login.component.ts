import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	constructor(public authService: AuthService) {}

	// email: string;
	// password: string;

	// signIn() {
	// 	this.authService.login(this.email, this.password);
	// 	this.email = '';
	// 	this.password = '';
	// }

	// signOut() {
	// 	this.authService.logout();
	// }
}
