import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import Carro from 'src/app/model/entities/Carro';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
  user: any;
  CarroCatalog: Carro[] = [];
  CarroFiltred: Carro[] = [];
  isLoading: boolean = false;
  isSearching: boolean = false; // Adicione a propriedade isSearching
  query: string = '';
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef; // Defina a propriedade sInput

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    setTimeout(() => { 
      if (this.searchInput) { // Certifique-se de que searchInput foi definido antes de chamar setFocus
        this.searchInput.nativeElement.setFocus();
      }
    }, 500);

    this.user = this.authService.getUserLogged();
    this.firebaseService.read(this.user.uid).subscribe((res) => {
      this.CarroCatalog = res.map((carro) => {
        return {
          id: carro.payload.doc.id,
          ...(carro.payload.doc.data() as any),
        } as Carro;
      });
      this.isLoading = true;
    });
  }

  irParaCadastrarPage() {
    this.router.navigate(['/cadastrar']);
  }

  editar(carro: Carro) {
    this.router.navigateByUrl('/detalhar', { state: { carro: Carro } });
  }

  async fazerLogout() {
    try {
      this.alertService.simpleLoader();
      await this.authService.signOut();
      this.router.navigate(['/signin']);
      this.alertService.presentAlert('Deslogar', 'Sucesso ao Deslogar!');
      setTimeout(() => {
        this.alertService.dismissLoader();
      }, 500);
    } catch (error) {
      this.alertService.presentAlert('Deslogar', 'Erro ao Deslogar!');
      this.alertService.dismissLoader();
    }
  }

  // Corrija o tipo de evento e ajuste a lógica de pesquisa
  onSearchChange(event: any) {
    const query = event.detail.value.toLowerCase();
    if (query.trim() === '') {
      this.CarroFiltred = this.CarroFiltred;
      this.isSearching = false;
      this.isLoading = true;
    } else {
      this.CarroFiltred = this.CarroFiltred.filter((element: any) => {
        return element.titulo.includes(query);
      });
      this.isSearching = true;
    }
  }

}
