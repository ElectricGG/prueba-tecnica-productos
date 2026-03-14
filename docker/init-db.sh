#!/bin/bash
# Wait for SQL Server to be ready
sleep 30
# Run the init script
/opt/mssql-tools18/bin/sqlcmd -S sqlserver -U sa -P "Password123!" -C -d master -i /init-db.sql
