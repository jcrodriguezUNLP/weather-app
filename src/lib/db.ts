import { Pool } from "pg";

// Configuración de la conexión a la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // URL de conexión a la base de datos
});

// Exportar el pool para que pueda ser utilizado en otros archivos
export { pool };
