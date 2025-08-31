import Fastify from "fastify";
import { registerPlugins } from "@/plugins/index.js";
import registerRoutes from "@/router.js";

export async function buildServer(){
    const fastify = Fastify({
        logger: true, 
        disableRequestLogging: true,
    })
    //register plugins
    await registerPlugins(fastify);

    //register routes
    await fastify.register(registerRoutes);

    return fastify;
}