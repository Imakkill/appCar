import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarroComponentComponent } from './carro-component/carro-component.component';
import { IonicModule } from '@ionic/angular';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { CadastrarComponentComponent } from './cadastrar-component/cadastrar-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalharComponentComponent } from './detalhar-component/detalhar-component.component';



@NgModule({
  declarations: [CarroComponentComponent, EmptyScreenComponent, LoadingScreenComponent , CadastrarComponentComponent, DetalharComponentComponent],
  imports: [
    CommonModule, IonicModule, ReactiveFormsModule
  ],
  exports:[CarroComponentComponent, EmptyScreenComponent, LoadingScreenComponent , CadastrarComponentComponent,DetalharComponentComponent]
})
export class ComponentsModule { }