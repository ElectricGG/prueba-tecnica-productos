import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Producto } from '../../../core/models/producto.model';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-export-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.css']
})
export class ExportButtonComponent {
  @Input() productos: Producto[] = [];

  exportToExcel(): void {
    const data = this.productos.map(p => ({
      'Código': p.id,
      'Nombre': p.nombre,
      'Descripción': p.descripcion,
      'Precio Unitario': p.precio,
      'Fecha Creación': p.fechaCreacion
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');

    const today = new Date();
    const dateStr =
      today.getFullYear().toString() +
      (today.getMonth() + 1).toString().padStart(2, '0') +
      today.getDate().toString().padStart(2, '0');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, `productos_${dateStr}.xlsx`);
  }
}
