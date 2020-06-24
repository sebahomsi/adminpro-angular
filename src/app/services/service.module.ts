import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoService ,HospitalService, SubirArchivoService, SettingsService, LoginGuardGuard, SidebarService, SharedService, UsuarioService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ]
})
export class ServiceModule { }
