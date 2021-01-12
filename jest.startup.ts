import * as jestCli from 'jest-cli'
import {Server} from "./app/server/server";
import {Restaurant} from "./app/restaurants/restaurants.model";
import {environment} from "./app/common/environment";
import {User} from "./app/users/users.model";
import {reviewsRouter} from "./app/reviews/reviews.router";
import {usersRouter} from "./app/users/users.router";
import {Review} from "./app/reviews/reviews.model";
import {restaurantsRouter} from "./app/restaurants/restaurants.router";


let server: Server

const beforeAllTests = () => {
    environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db'
    environment.server.port = process.env.SERVER_PORT || 3001
    server = new Server()
    return server.bootstrap([
        usersRouter,
        reviewsRouter,
        restaurantsRouter
    ])
        .then(() => User.remove({}).exec())
        .then(() => Review.remove({}).exec())
        .then(() => Restaurant.remove({}).exec())
}

const afterAllTests = () => {
    return server.shutdown()
}

beforeAllTests()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(console.error)
