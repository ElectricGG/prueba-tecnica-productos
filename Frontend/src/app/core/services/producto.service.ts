import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Producto, CreateProducto, UpdateProducto } from '../models/producto.model';
import { ApiResponse, PaginatedResult } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/productos`;

  private _productos = signal<Producto[]>([]);
  private _totalCount = signal(0);

  readonly productos = this._productos.asReadonly();
  readonly totalCount = this._totalCount.asReadonly();

  private _lastPageNumber = 1;
  private _lastPageSize = 10;
  private _lastNombre = '';
  private _lastCodigo = '';

  getAll(
    pageNumber: number = 1,
    pageSize: number = 10,
    nombre?: string,
    codigo?: string
  ): Observable<ApiResponse<PaginatedResult<Producto>>> {
    this._lastPageNumber = pageNumber;
    this._lastPageSize = pageSize;
    this._lastNombre = nombre || '';
    this._lastCodigo = codigo || '';

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (nombre) {
      params = params.set('nombre', nombre);
    }
    if (codigo) {
      params = params.set('codigo', codigo);
    }

    return this.http
      .get<ApiResponse<PaginatedResult<Producto>>>(this.baseUrl, { params })
      .pipe(
        tap((response) => {
          if (response.success) {
            this._productos.set(response.data.items);
            this._totalCount.set(response.data.totalCount);
          }
        })
      );
  }

  getById(id: number): Observable<ApiResponse<Producto>> {
    return this.http.get<ApiResponse<Producto>>(`${this.baseUrl}/${id}`);
  }

  create(dto: CreateProducto): Observable<ApiResponse<Producto>> {
    return this.http.post<ApiResponse<Producto>>(this.baseUrl, dto).pipe(
      tap(() => this.refreshList())
    );
  }

  update(id: number, dto: UpdateProducto): Observable<ApiResponse<Producto>> {
    return this.http.put<ApiResponse<Producto>>(`${this.baseUrl}/${id}`, dto).pipe(
      tap(() => this.refreshList())
    );
  }

  delete(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.refreshList())
    );
  }

  private refreshList(): void {
    this.getAll(
      this._lastPageNumber,
      this._lastPageSize,
      this._lastNombre || undefined,
      this._lastCodigo || undefined
    ).subscribe();
  }
}
