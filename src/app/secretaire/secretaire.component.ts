import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../services/service.service';

@Component({
  selector: 'app-secretaire',
  templateUrl: './secretaire.component.html',
  styleUrls: ['./secretaire.component.css']
})
export class SecretaireComponent implements OnInit {
  listsecretaire;
  constructor(private secretaireservice: ServiceService ) {
  }

  ngOnInit(): void {
    this.getallsecretaire();
  }
  getallsecretaire() {
    this.secretaireservice.getallsecretaires().subscribe(data => {
      console.log(data);
      alert('' + JSON.stringify(data));
      this.listsecretaire = data;
    });
  }

}
