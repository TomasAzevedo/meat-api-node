import {Server} from './app/server/server'
import {usersRouter} from "./app/users/users.router";
import {restaurantsRouter} from "./app/restaurants/restaurants.router";

const server = new Server()

server.bootstrap([usersRouter, restaurantsRouter])
    .then(server => {

        console.log('Server is listening on:', server.application.address())

    }).catch(error => {

        console.log('Server failed to start')
        console.error(error)
        process.exit(1)

    }
)
