using Microsoft.AspNetCore.Mvc;
using Productos.Application.DTOs;
using Productos.Application.Interfaces;

namespace Productos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductosController : ControllerBase
{
    private readonly IProductoService _productoService;

    public ProductosController(IProductoService productoService)
    {
        _productoService = productoService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string? nombre = null, [FromQuery] int? codigo = null)
    {
        var result = await _productoService.GetAllAsync(pageNumber, pageSize, nombre, codigo);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _productoService.GetByIdAsync(id);
        if (!result.Success) return NotFound(result);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductoDto dto)
    {
        var result = await _productoService.CreateAsync(dto);
        if (!result.Success) return BadRequest(result);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProductoDto dto)
    {
        var result = await _productoService.UpdateAsync(id, dto);
        if (!result.Success) return NotFound(result);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _productoService.DeleteAsync(id);
        if (!result.Success) return NotFound(result);
        return Ok(result);
    }
}
