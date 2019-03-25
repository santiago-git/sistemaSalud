import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../shared';
import { GoogleMapsAPIWrapper, LatLngLiteral } from '@agm/core';
import { SeguimSolicitud } from '../interfaces/Seguim_Solicitud';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SolicitudesService } from '../services/solicitudes.service';
import { MedicalEmergency } from 'src/app/shared/models';

@Component({
  selector: 'app-info-solicitud',
  templateUrl: './info-solicitud.component.html',
  styleUrls: ['./info-solicitud.component.css']
})

export class InfoSolicitudComponent implements OnInit {

  public mapa: GoogleMapsAPIWrapper;

  id: number;
  medicalEmergency: MedicalEmergency;
  displayedColumns: string[] = ['id', 'diagnostico', 'observacion', 'createdAt'];
  seguimiento: MatTableDataSource<SeguimSolicitud>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
    private medicalEmeService: SolicitudesService,
    private router: Router,
    private utilServ: UtilsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getMedicalEmergency();
    });
  }

  getMedicalEmergency() {
    this.medicalEmeService.get(this.id).subscribe(medicalEmergency => {
      this.medicalEmergency = medicalEmergency;
    });
  }

  // cargarSeguimiento() {
  //   this.utilServ.mostrarCargando(true);
  //   this._solicitudesService.obtenerSeguimientoSolicitud(this.id).subscribe(segui => {
  //     this.seguimiento = new MatTableDataSource(segui);
  //     this.seguimiento.paginator = this.paginator;
  //     this.seguimiento.sort = this.sort;
  //     this.utilServ.mostrarCargando(false);
  //   }, err => {
  //     console.log(err);
  //     this.utilServ.mostrarCargando(false);
  //   });
  // }

  // cargarSolicitud() {
  //   this.utilServ.mostrarCargando(true);
  //   this._solicitudesService.getSolicitud(this.id).subscribe(resp => {
  //     this.solicitud = resp;
  //     this.utilServ.mostrarCargando(false);
  //   }, err => {
  //     console.log(err);
  //     this.utilServ.mostrarCargando(false);
  //   });
  // }

  cargarInfo() {
    // this.cargarSeguimiento();
    // this.cargarSolicitud();
  }

  volverAtras() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  mapReady(mapa: GoogleMapsAPIWrapper) {
    this.mapa = mapa;
  }

  localizarPaciente(): void {
    const ub: LatLngLiteral = {
      lat: this.medicalEmergency.coordLat,
      lng: this.medicalEmergency.coordLong
    };
    this.mapa.setCenter(ub);
    this.mapa.setZoom(15);
  }

  trazarRutaPaciente(): void { }

  filaSeleccionada(fila: SeguimSolicitud) { }

  applyFilter(filterValue: string) {
    this.seguimiento.filter = filterValue.trim().toLowerCase();
    if (this.seguimiento.paginator) {
      this.seguimiento.paginator.firstPage();
    }
  }

}
