import {Component, OnInit, TemplateRef} from '@angular/core';
import {ServiceService} from '../services/service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import {Patient} from '../model/patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  listpatient;
  listdossier;
  modalRef: BsModalRef;
  submitted = false;
  patientform: FormGroup;
  patient = new Patient();
  constructor(private patientservice: ServiceService, private modalService: BsModalService, private formbuilder: FormBuilder ) {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.getallpatient();
    this.getalldossier();
    this.patientform = this.formbuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      num_tel: ['', Validators.required],
      sexe: ['', Validators.required],
      adresse: ['', Validators.required],
      iddossier: ['', Validators.required],
    });
  }
  get f() {
    return this.patientform.controls;
  }
  getallpatient() {
    this.patientservice.getallpatients().subscribe(data => {
      console.log(data);
      alert('' + JSON.stringify(data));
      this.listpatient = data;
    });
  }
  getalldossier() {
    this.patientservice.getalldossiers().subscribe(res => {
      console.log(res);
      this.listdossier = res;
    });
  }
  savepatient() {
    this.submitted = true;
    if (this.patientform.invalid) {
      return;
    }
    this.patientservice.savepatient(this.patientform.value.iddossier,
      this.patientform.value).subscribe(res => {
      console.log(res);
      this.getallpatient();
      this.modalRef.hide();
    });
 }
  recuper(id, nom, prenom, email, num_tel, sexe, adresse) {
    this.patient.id = id;
    this.patient.nom = nom;
    this.patient.email = email;
    this.patient.num_tel = num_tel;
    this.patient.sexe = sexe;
    this.patient.adresse = adresse;
  }

  editpatient() {
    this.patientservice.modifpatient(this.patient.id, this.patientform.value.iddossier, this.patientform.value).subscribe(res => {
        console.log(res);
        this.getallpatient();
        this.modalRef.hide();
      }
    );
  }
  deletepatient(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.patientservice.deletepatient(id).subscribe( res => {
          console.log(res);
          this.getallpatient();
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }
}
