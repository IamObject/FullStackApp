import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "../../auth/login/auth.service";

@Directive({
    selector: '[roles]',
    inputs: ['roles']
  })
  export class RolesDirective {
  
    constructor(private _templateRef: TemplateRef<any>,
                private _viewContainer: ViewContainerRef,
                private authService: AuthService) {
  
    }
  
    @Input() set roles(allowedRoles: Array<string>) {
      let shouldShow: boolean = false;
      let userRoles:Array<string> = this.authService.user.authorities;
     let role=userRoles.toString();

    //   for(let role of userRoles){
        if(role.toUpperCase() == "ADMIN"){
          shouldShow = true;
        //   break;
        }else{
            for(let allowedRole of allowedRoles){
                allowedRole = allowedRole.toUpperCase();
                if(allowedRole.toUpperCase() == role.toUpperCase()){
                  shouldShow = true;
                  break;
                }
              }
        }
       
    //   }
      if (shouldShow) {
        this._viewContainer.createEmbeddedView(this._templateRef);
      } else {
        this._viewContainer.clear();
      }
    }
  
  }