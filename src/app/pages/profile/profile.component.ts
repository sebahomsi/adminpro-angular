import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  previewImg: any;

  constructor(
    public _usuarioServicio: UsuarioService
  ) { 
    this.usuario = this._usuarioServicio.usuario;
  }

  ngOnInit(): void {
  }

  guardar(usuario: Usuario){
    this.usuario.nombre = usuario.nombre;

    if(!this.usuario.google){
      this.usuario.email = usuario.email;      
    }

    this._usuarioServicio.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImagen(archivo: File){

    //console.log(archivo);

    if(!archivo){
      this.imagenSubir = null;
      //console.log(this.imagenSubir);
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


    //console.log(event);
  }

  cambiarImagen(){
    this._usuarioServicio.cambiarImagen(this.imagenSubir, this.usuario._id);
    
  }

}
