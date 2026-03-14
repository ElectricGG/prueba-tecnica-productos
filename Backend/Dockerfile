FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5066

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["src/Productos.API/Productos.API.csproj", "src/Productos.API/"]
COPY ["src/Productos.Application/Productos.Application.csproj", "src/Productos.Application/"]
COPY ["src/Productos.Domain/Productos.Domain.csproj", "src/Productos.Domain/"]
COPY ["src/Productos.Infrastructure/Productos.Infrastructure.csproj", "src/Productos.Infrastructure/"]
RUN dotnet restore "src/Productos.API/Productos.API.csproj"
COPY . .
RUN dotnet publish "src/Productos.API/Productos.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:5066
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "Productos.API.dll"]
