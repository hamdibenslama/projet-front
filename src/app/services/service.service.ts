import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private host = 'http://localhost:9100';
  constructor(private http: HttpClient) {
  }
  getallpatients() {
    return this.http.get(this.host + '/Patient/All');
  }
  getalldossiers() {
    return this.http.get(this.host + '/Dossier/All');
  }
  savepatient(iddossier , patient) {
    return this.http.post(this.host + '/Patient/Save/' + iddossier, patient);
  }
  savemedecin(medecin) {
    return this.http.post(this.host + '/Medecin/Save' ,  medecin);
  }
  modifpatient(idpatient, iddossier , patient ){
    return this.http.put( this.host + '/Patient/modif/' + idpatient + '/' + iddossier , patient );
  }
  deletepatient(id){
    return this.http.delete( this.host + '/Patient/delete/' + id);
  }
  getallsecretaires() {
    return this.http.get(this.host + '/Secretaire/All');
  }

  savesecretaire(secretaire ) {
    return this.http.post(this.host + '/Secretaire/Save', secretaire);
  }
  getallconsulations() {
    return this.http.get(this.host + '/Consultation/All');
  }

  saveconsultation(consultation ) {
    return this.http.post(this.host + '/Consultation/Save', consultation );
  }
  getallcommentaires() {
    return this.http.get(this.host + '/Commentaire/All');
  }

  savecommentaire(commentaire  ) {
    return this.http.post(this.host + '/Commentaire/Save', commentaire );
  }
  getallordonnances() {
    return this.http.get(this.host + '/Ordonnance/All');
  }

  saveordonnance(ordonnance ) {
    return this.http.post(this.host + '/Ordonnance/Save', ordonnance );
  }

  savedossier(dossier ) {
    return this.http.post(this.host + '/Dossier/Save', dossier );
  }
  getallrendezvous() {
    return this.http.get(this.host + '/RendezVous/All');
  }

  saverendezvous(rendezvous) {
    return this.http.post(this.host + '/RendezVous/Save', rendezvous );
  }
}
