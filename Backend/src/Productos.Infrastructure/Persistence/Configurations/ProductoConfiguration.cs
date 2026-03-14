using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Productos.Domain.Entities;

namespace Productos.Infrastructure.Persistence.Configurations;

public class ProductoConfiguration : IEntityTypeConfiguration<Producto>
{
    public void Configure(EntityTypeBuilder<Producto> builder)
    {
        builder.ToTable("Productos");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Id)
            .ValueGeneratedOnAdd();

        builder.Property(p => p.Nombre)
            .IsRequired()
            .HasColumnType("nvarchar(100)")
            .HasMaxLength(100);

        builder.Property(p => p.Descripcion)
            .HasColumnType("nvarchar(255)")
            .HasMaxLength(255);

        builder.Property(p => p.Precio)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(p => p.FechaCreacion)
            .HasColumnType("datetime")
            .IsRequired();

        builder.Property(p => p.Estado)
            .HasColumnType("bit")
            .HasDefaultValue(true)
            .IsRequired();
    }
}
