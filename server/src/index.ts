import 'dotenv/config';

import { buildServer } from "@/server";
import { config } from "@/config/config.js"

async function start() {
    try {
        //builds server with registering plugins, routes
        const fastify = await buildServer();

        //waiting for all plugins to be ready
        await fastify.ready();
        console.log("Plugins Ready")

        //server listening
        await fastify.listen({
            port: config.server.port,
            host: config.server.host,
        });
        console.log("Noteit Server listening on: ", `http://${config.server.host}:${config.server.port}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

start();