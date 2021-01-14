import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProduitService} from '../services/produit.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Produit} from '../model/produit';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  listproduit;
  modalRef: BsModalRef;
  submitted = false;
  listcategorie;
  produitform: FormGroup;
  produit = new Produit();

  constructor(private produitservice: ProduitService, private modalService: BsModalService, private formbuilder: FormBuilder) {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.getall();
    this.getallcategorie();
    this.produitform = this.formbuilder.group({
      nom: ['', Validators.required],
      prix: ['', Validators.required],
      idcategorie: ['', Validators.required],
    });
  }

  get f() {
    return this.produitform.controls;
  }

  getallcategorie() {
    this.produitservice.getallcategories().subscribe(res => {
      console.log(res);
      this.listcategorie = res;
    });
  }

  getall() {
    this.produitservice.getallproducts().subscribe(data => {
      console.log(data);
      alert('' + JSON.stringify(data));
      this.listproduit = data;
    });
  }

  saveproduit() {
    this.submitted = true;
    if (this.produitform.invalid) {
      return;
    }
    this.produitservice.saveproduct(this.produitform.value.idcategorie,
      this.produitform.value).subscribe(res => {
      console.log(res);
      this.getall();
      this.modalRef.hide();
    });
  }

  recuper(id, nom, prix) {
    this.produit.id = id;
    this.produit.nom = nom;
    this.produit.prix = prix;
  }

  editproduit() {
    this.produitservice.modifproduit(this.produit.id, this.produitform.value).subscribe(res => {
        console.log(res);
        this.getall();
        this.modalRef.hide();
      }
    );
  }
  deleteproduit(id){
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
        this.produitservice.deleteproduit(id).subscribe( res => {
          console.log(res);
          this.getall();
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
