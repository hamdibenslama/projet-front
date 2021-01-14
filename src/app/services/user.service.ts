import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  jwt: string;
  username: string;
  roles: Array<string>;
  private host = 'http://localhost:9100';
  constructor(private http: HttpClient) {
  }


login(data)
{
  return this.http.post(this.host + '/login'
    , data, {observe: 'response'});
}
parseJWT()
{
  const jwtHelper = new JwtHelperService();
  const objJWT = jwtHelper.decodeToken(this.jwt);
  this.username = objJWT.obj;
  this.roles = objJWT.roles;
}
saveToken(jwt: string ) {
  sessionStorage.setItem('token', jwt);
  this.jwt = jwt;
  this.parseJWT();
}
loadToken()
{
  this.jwt = sessionStorage.getItem('token');
  this.parseJWT();
}
initParams()
{
  this.jwt = undefined;
  this.username = undefined;
  this.roles = undefined;
}
}
