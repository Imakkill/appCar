import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import Carro from '../entities/Carro';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = 'carros';

  constructor(private firestore : AngularFirestore,
    private storage : AngularFireStorage) { }

  read(uid: string){
    return this.firestore.collection(this.PATH,
      ref => ref.where('uid', '==', uid))
    .snapshotChanges();
  }

  create(carro: Carro){
    return this.firestore.collection(this.PATH)
    .add({modelo: carro.modelo, marca: carro.marca, carroceria : carro.carroceria,ano : carro.ano,uid: carro.uid});
  }

  createWithImage(carro: Carro){
    return this.firestore.collection(this.PATH)
    .add({modelo: carro.modelo, marca: carro.modelo,
    downloadURL : carro.downloadURL, carroceria : carro.carroceria, ano : carro.ano,uid: carro.uid});
  }

  update(carro: Carro, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({modelo: carro.modelo, marca: carro.marca,carroceria : carro.carroceria, ano : carro.ano,uid: carro.uid});
  }

  updateWithImage(carro: Carro, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({modelo: carro.modelo, marca: carro.marca,
      downloadURL : carro.downloadURL,carroceria : carro.carroceria, ano : carro.ano, uid: carro.uid});
  }

  delete(carro: Carro){
    return this.firestore.collection(this.PATH)
    .doc(carro.id)
    .delete()
  }

  uploadImage(imagem: any, carro: Carro){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){
      console.error('Tipo Não Suportado');
      return;
    }
    const path = `images/${carro.modelo}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path,file);
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadedFileURL = fileRef.getDownloadURL();
        uploadedFileURL.subscribe(resp=>{
          carro.downloadURL = resp;
          if(!carro.id){
            this.createWithImage(carro);
          }else{
            this.updateWithImage(carro, carro.id);
          }
        })
       })).subscribe();

  }
}
