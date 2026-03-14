# Prueba Tecnica - Sistema de Productos

Aplicacion fullstack para la gestion de productos, desarrollada con **.NET 9**, **Angular 19** y **SQL Server**.

## Tecnologias

### Backend
- .NET 9 Web API
- Entity Framework Core
- AutoMapper
- FluentValidation
- Clean Architecture (Service Pattern)
- Swagger/OpenAPI

### Frontend
- Angular 19 (Standalone Components)
- Angular Material
- Signals para State Management
- Reactive Forms
- Exportacion a Excel (xlsx)

### Base de Datos
- SQL Server 2022
- Soft Delete

### DevOps
- Docker y Docker Compose

## Estructura del Proyecto

```
├── Backend/                    API REST (.NET 9 - Clean Architecture)
│   ├── src/
│   │   ├── Productos.Domain/          Entidades e interfaces
│   │   ├── Productos.Application/     Servicios, DTOs, validadores
│   │   ├── Productos.Infrastructure/  EF Core, repositorios
│   │   └── Productos.API/             Controllers, middleware
│   └── database-script.sql            Script SQL completo
│
├── Frontend/                   Aplicacion Angular 19
│   └── src/
│       ├── app/core/           Servicios, interceptors, modelos, pipes
│       ├── app/features/       Componentes de productos
│       └── app/shared/         Componentes reutilizables
│
├── docker/                     Scripts de inicializacion de BD
├── docker-compose.yml          Orquestacion de contenedores
└── README.md
```

## Ejecucion con Docker (Recomendado)

Requisito: tener [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado.

```bash
git clone https://github.com/ElectricGG/prueba-tecnica-productos.git
cd prueba-tecnica-productos
docker-compose up --build
```

Esto levanta automaticamente:

| Servicio | URL | Descripcion |
|----------|-----|-------------|
| Frontend | http://localhost:4200 | Aplicacion Angular |
| Backend  | http://localhost:5066/swagger | API REST con Swagger |
| SQL Server | localhost:1433 | Base de datos |

Para detener:

```bash
docker-compose down
```

Para detener y eliminar datos de la BD:

```bash
docker-compose down -v
```

## Ejecucion Manual (Sin Docker)

### 1. Base de Datos

Requisito: SQL Server instalado.

- Abrir SQL Server Management Studio (SSMS)
- Ejecutar el script `Backend/database-script.sql`
- Esto crea la BD `ProductosDB`, la tabla y 16 productos de ejemplo

### 2. Backend

Requisitos: [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)

```bash
cd Backend/src/Productos.API
dotnet run
```

La API se levanta en `http://localhost:5066` y abre Swagger automaticamente.

> Nota: Si la conexion a SQL Server requiere usuario/contraseña, modificar el `ConnectionString` en `appsettings.json`.

### 3. Frontend

Requisitos: [Node.js 20+](https://nodejs.org/)

```bash
cd Frontend
npm install
ng serve --open
```

La aplicacion se abre en `http://localhost:4200`.

## Endpoints de la API

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/productos?pageNumber=1&pageSize=10&nombre=&codigo=` | Listar con paginacion y filtros |
| GET | `/api/productos/{id}` | Obtener por ID |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/{id}` | Actualizar producto |
| DELETE | `/api/productos/{id}` | Eliminar producto (soft delete) |

### Ejemplo de request POST

```json
{
  "nombre": "Producto Nuevo",
  "descripcion": "Descripcion del producto",
  "precio": 99.99,
  "fechaCreacion": "2024-03-14T00:00:00"
}
```

### Ejemplo de response

```json
{
  "success": true,
  "message": "Producto creado correctamente",
  "data": {
    "id": 17,
    "nombre": "Producto Nuevo",
    "descripcion": "Descripcion del producto",
    "precio": 99.99,
    "fechaCreacion": "2024-03-14T00:00:00",
    "estado": true
  },
  "errors": []
}
```

## Funcionalidades

- CRUD completo de productos
- Paginacion server-side
- Filtros por codigo y nombre
- Validaciones en frontend y backend
- Soft delete (eliminacion logica)
- Exportacion a Excel
- Skeleton loading animado
- Barra de progreso global en peticiones HTTP
- Dialogo de confirmacion para eliminar
- Formulario reutilizable para crear/editar (MatDialog)
- Manejo global de errores (interceptor + error handler)
- Responsive design
- Documentacion con Swagger

## Arquitectura

El backend utiliza **Clean Architecture** con el patron de servicios:

```
Controller (thin) → Service (validacion + mapeo + logica) → Repository → DB
```

| Capa | Responsabilidad |
|------|----------------|
| `Productos.Domain` | Entidades e interfaces |
| `Productos.Application` | Servicios, DTOs, validadores, AutoMapper |
| `Productos.Infrastructure` | Entity Framework Core, repositorios |
| `Productos.API` | Controllers, middleware, configuracion |
