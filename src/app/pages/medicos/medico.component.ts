import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, MedicoService } from 'src/app/services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('','','','','');
  hospital: Hospital = new Hospital('');

  constructor(public _hospitalService: HospitalService,
    public _medicoService: MedicoService,
    public router: Router,
    public _modalUploadService: ModalUploadService,
    public activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(params => {
        let id = params['id'];

        if(id !== 'nuevo'){
          this.cargarMedico(id);
        }

      });
     }

  ngOnInit(): void {

    this._hospitalService.cargarHospitales()
    .subscribe((res: any) => this.hospitales = res.hospitales);
    
    this._modalUploadService.notificacion
     .subscribe((resp: any) => {
       this.medico.img = resp.medico.img;
     });
  }

  cambiarFoto(){
    this._modalUploadService.mostrarModal('medicos', this.medico._id);

  }

  cambioHospital( id: string){
    this._hospitalService.obtenerHospital(id)
    .subscribe( (res: any)=>{
      this.hospital = res.hospital;
    });
  }


  guardarMedico(f: NgForm){

    if(f.invalid){
      return;
    }
    this._medicoService.guardarMedico(this.medico)
      .subscribe( (medico)=>{

        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id])
      });
  }

  cargarMedico(id: string){
    this._medicoService.cargarMedico(id)
    .subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

}
