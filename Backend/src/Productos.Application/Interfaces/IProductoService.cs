using Productos.Application.Common;
using Productos.Application.DTOs;

namespace Productos.Application.Interfaces;

public interface IProductoService
{
    Task<ApiResponse<PaginatedResult<ProductoDto>>> GetAllAsync(int pageNumber = 1, int pageSize = 10, string? nombre = null, int? codigo = null);
    Task<ApiResponse<ProductoDto>> GetByIdAsync(int id);
    Task<ApiResponse<ProductoDto>> CreateAsync(CreateProductoDto dto);
    Task<ApiResponse<ProductoDto>> UpdateAsync(int id, UpdateProductoDto dto);
    Task<ApiResponse<bool>> DeleteAsync(int id);
}
