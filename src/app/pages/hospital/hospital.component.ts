import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: []
})
export class HospitalComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: Boolean = true;
  totalRegistros: Number = 0;

  constructor(public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalUploadService.notificacion
     .subscribe(() => this.cargarHospitales());
  }


  cargarHospitales(){
    this.cargando = true;


    this._hospitalService.cargarHospitales()
    .subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
      console.log(this.hospitales);
    });
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  buscarHospital(termino: string){
    if(termino.length <= 0){
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospital(termino)
    .subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales
      this.cargando = false;

    });
  }

  crearHospital(){
    Swal.fire({
      title: 'Crear nuevo Hospital',
      icon: 'info',
      input: 'text',      
      inputPlaceholder: "Ingresa el nombre",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Ingresa el nombre!'
        }
      }
    }).then((result: any) => {
      if(result.value){

        this._hospitalService.crearHospital(result.value)
        .subscribe(() => {
          this.cargarHospitales();
        })
      }
    })
  }

  borrarHospital(hospital: Hospital){
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
        
        this._hospitalService.borrarHospital(hospital._id)
        .subscribe(borrado => {
          this.cargarHospitales();
        });
        
      }
    })
  }

  guardarHospital(hospital: Hospital){
    this._hospitalService.actualizarHospital(hospital)
      .subscribe();
  }
}
