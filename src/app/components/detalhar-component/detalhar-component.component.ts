import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetalharPage } from 'src/app/view/carro/detalhar/detalhar.page';

@Component({
  selector: 'app-detalhar-component',
  templateUrl: './detalhar-component.component.html',
  styleUrls: ['./detalhar-component.component.scss'],
})
export class DetalharComponentComponent  implements OnInit {
  @Input() carro:any
  formCarroAtualiza: FormGroup
  @Input() disabled: boolean = false; // Adicione esta linha para definir a propriedade 'disabled'
  @Output() formularioSend = new EventEmitter<FormGroup>();


  constructor(private formBuilder : FormBuilder, private detalhes: DetalharPage) {
    this.formCarroAtualiza = this.formBuilder.group({
      modelo:['',[Validators.required]],
      marca:['',[Validators.required]],
      ano:['',[Validators.required,Validators.pattern(/^\d{4}$/)]],
      carroceria:['',[Validators.required]]
    })
   }
   editar() {
    if (this.formCarroAtualiza.valid) {
      this.formularioSend.emit(this.formCarroAtualiza);
    }
  }
  excluir() {
    return this.detalhes.excluir();
  }

  uploadImagem(event: any) {
    console.log(event.target.files);
   
  }

  todosCamposPreenchidos() {
    return this.formCarroAtualiza.valid;
  }

  ngOnInit() {}

}
