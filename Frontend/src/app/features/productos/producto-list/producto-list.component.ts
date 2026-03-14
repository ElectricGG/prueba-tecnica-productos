import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductoService } from '../../../core/services/producto.service';
import { LoadingService } from '../../../core/services/loading.service';
import { Producto } from '../../../core/models/producto.model';
import { CurrencyFormatPipe } from '../../../core/pipes/currency-format.pipe';
import { SkeletonTableComponent } from '../../../shared/components/skeleton-table/skeleton-table.component';
import { ExportButtonComponent } from '../../../shared/components/export-button/export-button.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ProductoFormComponent, ProductoFormData } from '../producto-form/producto-form.component';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    CurrencyFormatPipe,
    SkeletonTableComponent,
    ExportButtonComponent
  ],
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {
  private productoService = inject(ProductoService);
  private loadingService = inject(LoadingService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['id', 'nombre', 'descripcion', 'precio', 'acciones'];
  productos = this.productoService.productos;
  loading = this.loadingService.loading;
  totalCount = this.productoService.totalCount;

  filterCodigo = '';
  filterNombre = '';
  pageSize = 10;
  pageNumber = 1;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productoService
      .getAll(
        this.pageNumber,
        this.pageSize,
        this.filterNombre || undefined,
        this.filterCodigo || undefined
      )
      .subscribe();
  }

  onSearch(): void {
    this.pageNumber = 1;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.loadProducts();
  }

  clearFilter(field: 'codigo' | 'nombre'): void {
    if (field === 'codigo') {
      this.filterCodigo = '';
    } else {
      this.filterNombre = '';
    }
    this.onSearch();
  }

  onPageChange(event: PageEvent): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '500px',
      data: { modo: 'crear' } as ProductoFormData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  openEditDialog(producto: Producto): void {
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '500px',
      data: { modo: 'editar', producto } as ProductoFormData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  onDelete(producto: Producto): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { nombre: producto.nombre }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.productoService.delete(producto.id).subscribe({
          next: (res) => {
            if (res.success) {
              this.snackBar.open('Producto eliminado correctamente', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top'
              });
              this.loadProducts();
            }
          }
        });
      }
    });
  }
}
