import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  previewImg: any;

  constructor(public _subirArchivoService: SubirArchivoService,
    public _modalUploadservice: ModalUploadService) {
   }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.previewImg = null;
    this.imagenSubir = null;

    this._modalUploadservice.ocultarModal();
  }

  seleccionImagen(archivo: File){

    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0){
      Swal.fire('Solo imágenes!', 'El archivo seleccionado no es una imagen' , 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();

    let urlTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.previewImg = reader.result;

  }
  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadservice.tipo, this._modalUploadservice.id)
    .then(resp => {
      this._modalUploadservice.notificacion.emit( resp );
      this.cerrarModal();
    })
    .catch(err => {
      console.log('Error en la carga...');
    });
  }

}
