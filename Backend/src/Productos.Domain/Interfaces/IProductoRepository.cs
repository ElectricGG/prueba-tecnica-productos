using Productos.Domain.Entities;

namespace Productos.Domain.Interfaces;

public interface IProductoRepository
{
    Task<(IEnumerable<Producto> Items, int TotalCount)> GetAllAsync(int pageNumber, int pageSize, string? nombre, int? codigo);
    Task<Producto?> GetByIdAsync(int id);
    Task<Producto> AddAsync(Producto producto);
    Task UpdateAsync(Producto producto);
    Task DeleteAsync(Producto producto);
}
