using AutoMapper;
using FluentValidation;
using Productos.Application.Common;
using Productos.Application.DTOs;
using Productos.Application.Interfaces;
using Productos.Domain.Entities;
using Productos.Domain.Interfaces;

namespace Productos.Application.Services;

public class ProductoService : IProductoService
{
    private readonly IProductoRepository _repository;
    private readonly IMapper _mapper;
    private readonly IValidator<CreateProductoDto> _createValidator;
    private readonly IValidator<UpdateProductoDto> _updateValidator;

    public ProductoService(
        IProductoRepository repository,
        IMapper mapper,
        IValidator<CreateProductoDto> createValidator,
        IValidator<UpdateProductoDto> updateValidator)
    {
        _repository = repository;
        _mapper = mapper;
        _createValidator = createValidator;
        _updateValidator = updateValidator;
    }

    public async Task<ApiResponse<PaginatedResult<ProductoDto>>> GetAllAsync(int pageNumber = 1, int pageSize = 10, string? nombre = null, int? codigo = null)
    {
        var (items, totalCount) = await _repository.GetAllAsync(pageNumber, pageSize, nombre, codigo);
        var dtos = _mapper.Map<List<ProductoDto>>(items);
        var paginatedResult = new PaginatedResult<ProductoDto>(dtos, totalCount, pageNumber, pageSize);
        return ApiResponse<PaginatedResult<ProductoDto>>.SuccessResponse(paginatedResult, "Productos obtenidos exitosamente");
    }

    public async Task<ApiResponse<ProductoDto>> GetByIdAsync(int id)
    {
        var producto = await _repository.GetByIdAsync(id);

        if (producto == null || !producto.Estado)
            return ApiResponse<ProductoDto>.FailResponse("Producto no encontrado");

        var dto = _mapper.Map<ProductoDto>(producto);
        return ApiResponse<ProductoDto>.SuccessResponse(dto, "Producto obtenido exitosamente");
    }

    public async Task<ApiResponse<ProductoDto>> CreateAsync(CreateProductoDto dto)
    {
        var validationResult = await _createValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
            return ApiResponse<ProductoDto>.FailResponse("Error de validación", errors);
        }

        var producto = _mapper.Map<Producto>(dto);
        producto.FechaCreacion = DateTime.UtcNow;
        producto.Estado = true;

        var created = await _repository.AddAsync(producto);
        var resultDto = _mapper.Map<ProductoDto>(created);

        return ApiResponse<ProductoDto>.SuccessResponse(resultDto, "Producto creado exitosamente");
    }

    public async Task<ApiResponse<ProductoDto>> UpdateAsync(int id, UpdateProductoDto dto)
    {
        var validationResult = await _updateValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList();
            return ApiResponse<ProductoDto>.FailResponse("Error de validación", errors);
        }

        var producto = await _repository.GetByIdAsync(id);

        if (producto == null || !producto.Estado)
            return ApiResponse<ProductoDto>.FailResponse("Producto no encontrado");

        producto.Nombre = dto.Nombre;
        producto.Descripcion = dto.Descripcion;
        producto.Precio = dto.Precio;

        await _repository.UpdateAsync(producto);

        var resultDto = _mapper.Map<ProductoDto>(producto);
        return ApiResponse<ProductoDto>.SuccessResponse(resultDto, "Producto actualizado exitosamente");
    }

    public async Task<ApiResponse<bool>> DeleteAsync(int id)
    {
        var producto = await _repository.GetByIdAsync(id);

        if (producto == null || !producto.Estado)
            return ApiResponse<bool>.FailResponse("Producto no encontrado");

        producto.Estado = false;
        await _repository.DeleteAsync(producto);

        return ApiResponse<bool>.SuccessResponse(true, "Producto eliminado exitosamente");
    }
}
