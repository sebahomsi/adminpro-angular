import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {  

  usuarios: Usuario[] = [];
  desde: Number = 0;
  totalRegistros: Number = 0;
  cargando: Boolean = true;

  constructor(public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
     .subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios(){
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
    .subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: any){
    let desde = this.desde + valor;

    if(desde >= this.totalRegistros){
      console.log('err');
      return;
    }

    if(desde < 0){
      console.log('err');
      return;
    }

    this.desde+= valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string){

    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;

    this._usuarioService.buscarUsuario(termino)
    .subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios
      this.cargando = false;

    });
  }

  borrarUsuario(usuario: Usuario){
    if(usuario._id === this._usuarioService.usuario._id){
      Swal.fire('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

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
        
        this._usuarioService.borrarUsuario(usuario._id)
        .subscribe(borrado => {
          console.log(borrado);
          this.cargarUsuarios();
        });
        
      }
    })
  }

  guardarUsuario(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }

}
