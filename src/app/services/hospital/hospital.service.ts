import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarHospitales(){
    let url = URL_SERVICIOS + '/hospital';

    return this.http.get(url);
  }

  obtenerHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url);
  }

  borrarHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
    .pipe(
      map(resp => {
        Swal.fire(
          'Eliminado!',
          'Eliminaste este hospital.',
          'success'
        )
        return true;
      })
    );;
  }

  crearHospital(nombre: string){
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, {nombre});
  }

  buscarHospital(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;

    return this.http.get(url)
    .pipe(
      map((resp: any) => resp.hospitales)
    );
  }

  actualizarHospital(hospital: Hospital){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
    .pipe(
      map((resp: any)=>{
        Swal.fire('Hospital actualizado', hospital.nombre, 'success');
        return true;
      })
    );
  }
}
