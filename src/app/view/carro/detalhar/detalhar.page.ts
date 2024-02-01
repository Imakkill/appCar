import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Carro from 'src/app/model/entities/Carro';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  public modelo :string;
  public marca : string;
  public carroceria : string;
  public ano : number;
  formCadastrar : FormGroup
  carro: Carro;
  indice: number;
  edicao: boolean = true;
  public imagem : any;
  public user : any;

  constructor(private router: Router,
    private firebase: FirebaseService,
    private auth: AuthService) {
      this.user = this.auth.getUserLogged();
     }

  ngOnInit() {
    this.carro = history.state.contato;
    this.modelo = this.carro.modelo;
    this.marca = this.carro.marca;
    this.carroceria = this.carro.carroceria
    this.ano = this.carro.ano
  }
  tiposCarroceria = ['Sedan', 'Hatch', 'Pickup'];

  habilitar(){
    if(this.edicao){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  public uploadFile(imagem: any){
    this.imagem = imagem.files;
   }

  editar(){
    let novo: Carro = new Carro(this.modelo, this.marca, this.carroceria, this.ano);
    novo.id = this.carro.id;
    novo.uid = this.user.uid;
    if(this.imagem){
      this.firebase.uploadImage(this.imagem, novo);
    }else{
      novo.downloadURL = this.carro.downloadURL;
      this.firebase.update(novo, this.carro.id);
    }
    this.router.navigate(["/home"]);
  }

  voltar(){
    this.router.navigate(["/home"]);
  }

  excluir(){
    this.firebase.delete(this.carro);
    this.router.navigate(["/home"]);
  }

}
