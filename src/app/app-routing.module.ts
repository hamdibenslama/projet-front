import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContainerComponent} from './home/container/container.component';
import {ListeMedecinComponent} from './liste-medecin/liste-medecin.component';
import {HolidaysComponent} from './holidays/holidays.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {CommentComponent} from './comment/comment.component';
import {ProduitComponent} from './produit/produit.component';
import {PatientComponent} from './patient/patient.component';
import {SecretaireComponent} from './secretaire/secretaire.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent
  ,
  children: [{path: '', component: ContainerComponent}, {path: 'ListeM', component: ListeMedecinComponent}, {
    path: 'holidays',
    component: HolidaysComponent
  },  {path: 'listsecretaire', component: SecretaireComponent}, {
    path: 'listpatient',
    component: PatientComponent
  }]
}, {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}, {path: 'comment', component: CommentComponent}, {
    path: 'produit',
    component: ProduitComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
