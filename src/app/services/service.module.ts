import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubirArchivoService, SettingsService, LoginGuardGuard, SidebarService, SharedService, UsuarioService } from './service.index';
import { HttpClientModule } from '@angular/common/http';


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
    SubirArchivoService
  ]
})
export class ServiceModule { }
