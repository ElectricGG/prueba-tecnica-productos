-- =============================================
-- Script de inicializacion: ProductosDB
-- Para uso con Docker
-- =============================================

-- Crear la base de datos
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ProductosDB')
BEGIN
    CREATE DATABASE ProductosDB;
END
GO

USE ProductosDB;
GO

-- =============================================
-- 1. CREAR TABLA PRODUCTOS
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Productos')
BEGIN
    CREATE TABLE Productos (
        Id              INT IDENTITY(1,1) PRIMARY KEY,
        Nombre          NVARCHAR(100)   NOT NULL,
        Descripcion     NVARCHAR(255)   NULL,
        Precio          DECIMAL(18,2)   NOT NULL,
        FechaCreacion   DATETIME        NOT NULL DEFAULT GETDATE(),
        Estado          BIT             NOT NULL DEFAULT 1
    );
END
GO

-- =============================================
-- 2. DATOS DE EJEMPLO (SEED DATA)
-- =============================================
IF NOT EXISTS (SELECT TOP 1 1 FROM Productos)
BEGIN
    INSERT INTO Productos (Nombre, Descripcion, Precio, FechaCreacion, Estado)
    VALUES
        ('Laptop HP Pavilion',         'Laptop 15.6" Intel Core i5, 8GB RAM, 256GB SSD',          899.99,  '2024-01-15 10:30:00', 1),
        ('Mouse Logitech MX',          'Mouse inalámbrico ergonómico',                             59.99,   '2024-02-20 14:15:00', 1),
        ('Teclado Mecánico RGB',        'Teclado mecánico switches Cherry MX',                      129.50,  '2024-03-10 09:00:00', 1),
        ('Monitor Samsung 27"',         'Monitor IPS 4K UHD 60Hz',                                  349.00,  '2024-04-05 16:45:00', 1),
        ('Webcam Logitech C920',        'Webcam Full HD 1080p con micrófono',                        79.99,  '2024-05-12 11:20:00', 1),
        ('Audífonos Sony WH-1000',      'Audífonos inalámbricos con cancelación de ruido',          299.99,  '2024-06-01 08:00:00', 1),
        ('Tablet Samsung Galaxy Tab',   'Tablet 10.4" 128GB WiFi con S Pen',                       459.99,  '2024-06-15 13:00:00', 1),
        ('Impresora Epson L3250',       'Impresora multifuncional EcoTank WiFi',                    219.00,  '2024-07-02 10:00:00', 1),
        ('Disco SSD Kingston 1TB',      'Disco sólido NVMe M.2 lectura 3500MB/s',                   89.99,  '2024-07-18 15:30:00', 1),
        ('Memoria RAM Corsair 16GB',    'Memoria DDR5 5600MHz RGB',                                  74.50,  '2024-08-05 09:45:00', 1),
        ('Router TP-Link AX1500',       'Router WiFi 6 doble banda Gigabit',                         54.99,  '2024-08-22 11:10:00', 1),
        ('Cargador USB-C 65W',          'Cargador rápido GaN USB-C para laptop y celular',           39.99,  '2024-09-10 14:20:00', 1),
        ('Parlante JBL Flip 6',         'Parlante portátil Bluetooth resistente al agua',           129.99,  '2024-09-28 08:30:00', 1),
        ('Hub USB-C 7 en 1',            'Hub con HDMI 4K, USB 3.0, SD, ethernet',                   45.00,  '2024-10-15 16:00:00', 1),
        ('Cable HDMI 2.1 3m',           'Cable HDMI 8K 48Gbps trenzado',                             19.99,  '2024-11-01 12:00:00', 1),
        ('Mousepad XL Gaming',          'Mousepad 80x30cm antideslizante borde cosido',              24.50,  '2024-11-20 10:45:00', 1);
END
GO

-- =============================================
-- 3. VERIFICACION
-- =============================================
SELECT 'Tabla creada correctamente' AS Status, COUNT(*) AS TotalProductos FROM Productos;
GO
