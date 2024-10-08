import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService, private toastServ:ToastrService
    ) { }
    public isAdmin:boolean=false;
    roles: string[] = [];
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        var hasAccess: boolean = false;

        this.authenticationService.user.authorities.forEach(item => {
            for (const [key, value] of Object.entries(item)) {
                console.log(key, value)
                if (route.data.roles.indexOf(value) != -1) {

                    hasAccess = true;

                }
                // if(value=="ADMIN"){
                //     this.isAdmin=true;
                // }
            }
        })
        //   this.toastServ.showStandard('You are not authorise to access this resource');
        for (let i = 0; i < this.roles.length; i++) {
            if (this.roles.indexOf(route.data.roles[i]) != -1) {

                hasAccess = true;

            }
        }
        if (!hasAccess) {
            this.toastServ.error('You are not authorise to access this resource');
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false
        } else {
            return true;
        }
    }
}