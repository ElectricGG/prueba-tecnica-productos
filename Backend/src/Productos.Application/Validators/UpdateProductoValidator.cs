using FluentValidation;
using Productos.Application.DTOs;

namespace Productos.Application.Validators;

public class UpdateProductoValidator : AbstractValidator<UpdateProductoDto>
{
    public UpdateProductoValidator()
    {
        RuleFor(x => x.Nombre)
            .NotEmpty().WithMessage("El nombre es requerido")
            .MaximumLength(100).WithMessage("El nombre no puede exceder 100 caracteres");

        RuleFor(x => x.Descripcion)
            .MaximumLength(255).WithMessage("La descripción no puede exceder 255 caracteres");

        RuleFor(x => x.Precio)
            .GreaterThan(0).WithMessage("El precio debe ser mayor a 0");
    }
}
