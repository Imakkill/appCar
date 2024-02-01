import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Carro from 'src/app/model/entities/Carro';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public modelo :string;
  public marca : string;
  public imagem : any;
  public carroceria : string;
  public ano : number
  public user: any;
  formCadastrar : FormGroup

  tiposCarroceria = ['Sedan', 'Hatch', 'Pickup'];

  constructor(private alertController: AlertController,
    private formBuilder : FormBuilder,
    private router : Router,
    private firebase: FirebaseService,
    private auth : AuthService)  {
      this.formCadastrar = new FormGroup({
        modelo: new FormControl(''),
        marca: new FormControl(''),
        ano: new FormControl(''),
        carroceria: new FormControl('')
      });
      this.user = this.auth.getUserLogged();
    }

  ngOnInit() {
    this.formCadastrar = this.formBuilder.group({
      modelo: ['',[Validators.required]],
      marca: ['',[Validators.required]],
      ano: ['',[Validators.required]],
      carroceria: ['',[Validators.required]]
    })
  }

 public uploadFile(imagem: any){
  this.imagem = imagem.files;
 }

  cadastrar(){
    if(this.formCadastrar && this.marca && this.carroceria && this.ano){
      let novo : Carro = new Carro(this.modelo, this.marca, this.carroceria, this.ano);
      novo.uid = this.user.uid;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo)
      }else{
        this.firebase.create(novo);
      }
      this.presentAlert("Sucesso", "Carro Salvo!");
      this.router.navigate(["/home"]);
    }else{
     this.presentAlert("Erro", "Campos Obrigatórios!");
    }
  }

  async presentAlert(subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: 'GARAGEM',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
