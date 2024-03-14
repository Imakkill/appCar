import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import Carro from 'src/app/model/entities/Carro';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class CadastrarPage implements OnInit {
  public modelo: string;
  public marca: string;
  public imagem: any;
  public carroceria: string;
  public ano: number
  public user: any;
  formCadastroCarro: FormGroup;

  tiposCarroceria = ['Sedan', 'Hatch', 'Pickup'];

  constructor(private alertService: AlertService, private formBuilder: FormBuilder, private router: Router, private firebase: FirebaseService, private auth: AuthService) {

    this.formCadastroCarro = new FormGroup({
      modelo: new FormControl(''),
      marca: new FormControl(''),
      ano: new FormControl(''),
      carroceria: new FormControl('')
    });
    this.user = this.auth.getUserLogged();
  }

  ngOnInit() {

  }

  public uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }


  voltar() {
    this.router.navigate(["/home"]);
  }
  onSubmit(formu: FormGroup) {
    if (formu.valid) {
      const novoCarro = new Carro(
        formu.value.modelo,
        formu.value.marca,
        formu.value.ano,
        formu.value.carroceria
      );
      novoCarro.uid = this.user.uid
      this.firebase.create(novoCarro)
      this.alertService.presentAlert('Sucesso', 'Carro cadastrado')
      this.router.navigate(["/home"]);
    }else{
      this.alertService.presentAlert('Erro', 'Campos obrigatórios');

    }
  }
  todosCamposPreenchidos(){
    return this.formCadastroCarro.valid
  }
}
