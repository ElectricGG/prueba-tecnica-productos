export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  fechaCreacion: string;
  estado: boolean;
}

export interface CreateProducto {
  nombre: string;
  descripcion: string;
  precio: number;
  fechaCreacion: string;
}

export interface UpdateProducto {
  nombre: string;
  descripcion: string;
  precio: number;
  fechaCreacion: string;
}
