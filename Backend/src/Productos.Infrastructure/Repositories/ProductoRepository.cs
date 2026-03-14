using Microsoft.EntityFrameworkCore;
using Productos.Domain.Entities;
using Productos.Domain.Interfaces;
using Productos.Infrastructure.Persistence;

namespace Productos.Infrastructure.Repositories;

public class ProductoRepository : IProductoRepository
{
    private readonly ApplicationDbContext _context;

    public ProductoRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<(IEnumerable<Producto> Items, int TotalCount)> GetAllAsync(int pageNumber, int pageSize, string? nombre, int? codigo)
    {
        IQueryable<Producto> query = _context.Productos.Where(p => p.Estado);

        if (!string.IsNullOrWhiteSpace(nombre))
        {
            query = query.Where(p => p.Nombre.Contains(nombre));
        }

        if (codigo.HasValue)
        {
            query = query.Where(p => p.Id == codigo.Value);
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(p => p.Id)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<Producto?> GetByIdAsync(int id)
    {
        return await _context.Productos.FindAsync(id);
    }

    public async Task<Producto> AddAsync(Producto producto)
    {
        await _context.Productos.AddAsync(producto);
        await _context.SaveChangesAsync();
        return producto;
    }

    public async Task UpdateAsync(Producto producto)
    {
        _context.Productos.Update(producto);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Producto producto)
    {
        _context.Productos.Update(producto);
        await _context.SaveChangesAsync();
    }
}
