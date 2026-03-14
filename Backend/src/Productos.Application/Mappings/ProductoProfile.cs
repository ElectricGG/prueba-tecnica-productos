using AutoMapper;
using Productos.Application.DTOs;
using Productos.Domain.Entities;

namespace Productos.Application.Mappings;

public class ProductoProfile : Profile
{
    public ProductoProfile()
    {
        CreateMap<Producto, ProductoDto>();
        CreateMap<CreateProductoDto, Producto>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.Estado, opt => opt.Ignore());
        CreateMap<UpdateProductoDto, Producto>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.Estado, opt => opt.Ignore());
    }
}
