import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ProduitService} from './services/produit.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CabinetMadicale';
  constructor(private authservice: UserService ) {
  }
  ngOnInit(){
    return this.authservice.loadToken();
  }
}
