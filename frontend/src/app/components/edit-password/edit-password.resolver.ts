import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class EditPasswordResolver implements Resolve<any> {

  constructor(public firebaseService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let passwordId = route.paramMap.get('id');
      this.firebaseService.getPassword(passwordId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
