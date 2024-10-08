
export class User {
  accountNonExpired : boolean =false ;
  accountNonLocked   : boolean =false ;
  confirmPassword          : string="";
  credentialsNonExpired : boolean =false ;
  enabled      : boolean =false ;
  fullName       : string="";
  firstName       : string="";
  lastName       : string="";
  email       : string="";
  id       : number=0;
  password: string="";
  username       : string="";
  _enabled: boolean =false ;
  authorities: string []=[];

}


