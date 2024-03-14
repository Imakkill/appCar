import { Injectable } from '@angular/core';
import Carro from '../entities/Carro';

@Injectable({
  providedIn: 'root'
})
export class carroService {
  public lista_carros : Carro[] = [];

  constructor() {
  
  }

  cadastrar(carro : Carro){
    this.lista_carros.push(carro);
  }

  obterTodos() : Carro[]{
    return this.lista_carros;
  }

  obterPorIndice(indice : number) : Carro{
    return this.lista_carros[indice];
  }

  editar(indice: number, carro: Carro){
    this.lista_carros[indice] = carro;
  }

  excluir(indice: number){
    this.lista_carros.splice(indice, 1);
  }


}
