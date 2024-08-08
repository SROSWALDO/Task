require('dotenv').config();
const server = require('./src/server');
const { connection } = require("./src/db");

const PORT = process.env.PORT || 3001;
console.log("PORT " + PORT );

//? Iniciar servidor

const startServer = async () => {
    try {
        await connection.sync({ force: false });
        server.listen(PORT, () => console.log(`Servidor levantado en el puerto: ${PORT}`));
    } catch (error) {
        console.log("El servidor no se pudo iniciar", error.message, error.stack);

        
    }
};

startServer();