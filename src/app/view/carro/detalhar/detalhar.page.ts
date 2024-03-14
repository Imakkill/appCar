import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import Carro from 'src/app/model/entities/Carro';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {

  formCarroAtualiza: FormGroup
  carro: Carro;
  edicao: boolean = true;
  public imagem: any;
  public user: any;

  constructor(private router: Router,
    private firebase: FirebaseService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alert: AlertService) {

    this.user = this.authService.getUserLogged();
    this.formCarroAtualiza = this.formBuilder.group({
      modelo: ['', [Validators.required]],
      marca: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]*$/)]],
      ano: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      avaliacao: ['', [Validators.required]],
    });
  }
  

  

  ngOnInit() {
    this.carro = history.state.carro;
    this.formCarroAtualiza.patchValue({
      modelo: this.carro.modelo,
      marca: this.carro.marca,
      carroceria: this.carro.carroceria,
      ano : this.carro.ano
    })

  }
  tiposCarroceria = ['Sedan', 'Hatch', 'Pickup'];

  habilitar() {
    if (this.edicao) {
      this.edicao = false;
    } else {
      this.edicao = true;
    }
  }

  public uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  editar() {
    if (!this.todosCamposPreenchidos()) {
      return;
    }
    this.router.navigate(["/car"]);
  

  let novo: Carro = new Carro(
    this.formCarroAtualiza.value['modelo'],
    this.formCarroAtualiza.value['marca'],
    this.formCarroAtualiza.value['ano'],
    this.formCarroAtualiza.value['carroceria']
  );
   
  novo.id = this.carro.id
  novo.uid = this.user.uid

  if (this.imagem) {
    this.firebase.uploadImage(this.imagem, novo);
  } else {
    this.firebase.update(novo, this.carro.id);
  }

  this.alert.presentAlert('Salvo', 'Carro Modificado!');
  this.router.navigate(['/car']);
  }
  voltar() {
    this.router.navigate(["/car"]);
  }

  excluir() {
    this.firebase.delete(this.carro);
    this.router.navigate(["/car"]);
  }

  todosCamposPreenchidos() {
    return this.formCarroAtualiza.valid;
  }
}
