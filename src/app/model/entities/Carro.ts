export default class Carro{
    private _id :string;
    private _modelo: string;
    private _marca: string;
    private _ano: number;
    private _carroceria: string;
    private _downloadURL: any;
    private _uid : string

  public get modelo(): string {
    return this._modelo;
  }
  public set modelo(value: string) {
    this._modelo = value;
  }
    
  public get marca(): string {
    return this._marca;
  }
  public set marca(value: string) {
    this._marca = value;
  }
    
  public get ano(): number {
    return this._ano;
  }
  public set ano(value: number) {
    this._ano = value;
  }
    
  public get carroceria(): string {
    return this._carroceria;
  }
  public set carroceria(value: string) {
    this._carroceria = value;
  }
    
  
  constructor(modelo: string, marca: string, carroceria: string, ano : number){
    this._modelo = modelo;
    this._marca = marca;
    this._carroceria = carroceria;
    this._ano = ano;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  
  public get downloadURL(): any {
    return this._downloadURL;
  }
  public set downloadURL(value: any) {
    this._downloadURL = value;
  }

  public get uid(): string {
    return this._uid;
  }
  public set uid(value: string) {
    this._uid = value;
  }
}
