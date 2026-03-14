using FluentValidation;
using Productos.Application.Interfaces;
using Productos.Application.Mappings;
using Productos.Application.Services;
using Productos.Application.Validators;

namespace Productos.API.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddAutoMapper(cfg =>
        {
            cfg.AddMaps(typeof(ProductoProfile).Assembly);
        });

        services.AddValidatorsFromAssembly(typeof(CreateProductoValidator).Assembly);

        services.AddScoped<IProductoService, ProductoService>();

        return services;
    }
}
