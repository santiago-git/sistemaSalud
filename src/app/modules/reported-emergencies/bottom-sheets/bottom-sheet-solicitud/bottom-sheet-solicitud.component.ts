import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-bottom-sheet-solicitud',
  templateUrl: './bottom-sheet-solicitud.component.html',
  styleUrls: ['./bottom-sheet-solicitud.component.css']
})
export class BottomSheetSolicitudComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetSolicitudComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public solicitud: any) { }

  ngOnInit() { }

  openLink(): void {
    this.bottomSheetRef.dismiss();
  }

}
