import {Router} from '../common/router'
import * as restify from 'restify'
import {User} from './users.model'

/**
 *
 * Classe responsável pelas operações do recurso User.
 *
 */
class UsersRouter extends Router {

    applyRoutes(application: restify.Server) {


        /**
         *
         * Método GET - /users
         *
         */
        application.get('/users', (req, resp, next) => {

            User.find().then(users => {

                resp.json(users)
                console.log('asaaa')
                return next()

            })

        })


        /**
         *
         * Método GET - /users:id
         *
         */
        application.get('/users/:id', (req, resp, next) => {

            User.findById(req.params.id).then(user => {

                if (user) {
                    resp.json(user)
                    return next()
                }

                resp.send(404)
                return next()

            })

        })


        /**
         *
         * Método POST - /users
         *
         */
        application.post('/users', (req, resp, next) => {

            let user = new User(req.body)

            user.save().then(user => {

                user.password = undefined
                resp.json(user)
                return next()

            })

        })


    }

}

export const usersRouter = new UsersRouter()