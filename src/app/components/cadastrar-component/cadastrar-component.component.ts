import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastrarPage } from 'src/app/view/carro/cadastrar/cadastrar.page';
@Component({
  selector: 'app-cadastrar-component',
  templateUrl: './cadastrar-component.component.html',
  styleUrls: ['./cadastrar-component.component.scss'],
})
export class CadastrarComponentComponent  implements OnInit {
  formCadastroCarro: FormGroup
  @Output() formularioSend = new EventEmitter<FormGroup>()
  constructor(private formBuilder : FormBuilder) {

    this.formCadastroCarro = this.formBuilder.group({
      modelo: ['',[Validators.required]],
      marca: ['',[Validators.required]],
      ano: ['',[Validators.required]],
      carroceria: ['',[Validators.required]]
    })
   }

  ngOnInit() {}

   sendFormulario(){
    if(this.formCadastroCarro.valid){
      this.formularioSend.emit(this.formCadastroCarro)
    }
   }

   camposPreenchidos(): boolean{
      return this.formCadastroCarro.valid
   }

}
