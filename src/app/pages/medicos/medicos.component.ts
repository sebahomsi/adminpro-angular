import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  cargando: Boolean = true;

  constructor(public _medicoService: MedicoService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  mostrarModal(id: string){

  }

  cargarMedicos(){
    this._medicoService.cargarMedicos()
    .subscribe(medicos => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  borrarMedico(medico: Medico){
    Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.value) {
        
        this._medicoService.borrarMedico(medico)
        .subscribe( () => {
          this.cargarMedicos();
        });
        
      }
    })
  }

  buscarMedicos(termino: string){

    if(termino.length <= 0){
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos(termino)
    .subscribe(medicos => this.medicos = medicos)
  }

  editarMedico(medico: Medico){

  }

  crearMedico(){

  }

}
