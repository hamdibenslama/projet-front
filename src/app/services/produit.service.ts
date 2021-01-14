import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private host = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }
  getallcategories() {
    return this.http.get(this.host + '/Categorie/All');
  }

  getallproducts() {
    return this.http.get(this.host + '/Produit/All');
  }

  saveproduct(idcategorie, produit ) {
    return this.http.post(this.host + '/Produit/Save/' + idcategorie,  produit);
  }
  modifproduit(idproduit, produit){
    return this.http.put( this.host + '/Produit/modif/' + idproduit, produit);
  }
  deleteproduit(id){
    return this.http.delete( this.host + '/Produit/delete/' + id);
  }
}
