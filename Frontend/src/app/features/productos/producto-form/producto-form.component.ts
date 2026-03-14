import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Producto } from '../../../core/models/producto.model';
import { ProductoService } from '../../../core/services/producto.service';

export interface ProductoFormData {
  modo: 'crear' | 'editar';
  producto?: Producto;
}

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  readonly data = inject<ProductoFormData>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ProductoFormComponent>);
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private snackBar = inject(MatSnackBar);

  form!: FormGroup;
  saving = false;

  get isEdit(): boolean {
    return this.data.modo === 'editar';
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.maxLength(255)]],
      precio: [null, [Validators.required, Validators.min(0.01)]],
      fechaCreacion: [null, [Validators.required]]
    });

    if (this.isEdit && this.data.producto) {
      this.form.patchValue({
        nombre: this.data.producto.nombre,
        descripcion: this.data.producto.descripcion,
        precio: this.data.producto.precio,
        fechaCreacion: new Date(this.data.producto.fechaCreacion)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const formValue = this.form.value;
    const fechaDate: Date = formValue.fechaCreacion;
    const fechaStr = fechaDate.toISOString();

    const dto = {
      nombre: formValue.nombre,
      descripcion: formValue.descripcion || '',
      precio: formValue.precio,
      fechaCreacion: fechaStr
    };

    if (this.isEdit && this.data.producto) {
      this.productoService.update(this.data.producto.id, dto).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.snackBar.open('Producto actualizado correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.dialogRef.close(true);
          }
        },
        error: () => {
          this.saving = false;
        }
      });
    } else {
      this.productoService.create(dto).subscribe({
        next: (res) => {
          this.saving = false;
          if (res.success) {
            this.snackBar.open('Producto creado correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.dialogRef.close(true);
          }
        },
        error: () => {
          this.saving = false;
        }
      });
    }
  }
}
