import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UtilsService } from '../../shared';
import { PacientesService } from './servicios/pacientes.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/shared/models';
import { ClinicHistoryComponent } from 'src/app/shared/components/clinic-history/clinic-history.component';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  dataSource: MatTableDataSource<Patient>;
  displayedColumns: string[] = [
    'nombre',
    'documento',
    'nom_usuario',
    'telefono',
    'direccion',
    'edad',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public patientService: PacientesService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    this.getAll();
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getAll() {
    this.patientService.getAll().subscribe(patients => {
      this.dataSource = new MatTableDataSource(patients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openClinicHistory(patient: Patient) {
    const dialogRef = this.dialog.open(ClinicHistoryComponent, {
      width: '80vw',
      height: 'auto',
      data: patient.clinicHistories
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  filaSeleccionada(row) {
  }

  editarPaciente(p: Patient) {
    this.router.navigate([p.id], { relativeTo: this.route });
    // this._pacientesService.redirectEditarPaciente(p);
  }

  eliminarPaciente(p: Patient) {
    this.patientService.delete(p.id).subscribe(res => {
      this.getAll();
    });
  }

  getAge(birthdate: Date) {
    return new Date().getFullYear() - new Date(birthdate).getFullYear()
  }

  nuevoPaciente() {
    this.router.navigate(['crear'], { relativeTo: this.route });
  }

}
