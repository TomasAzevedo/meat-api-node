import {Router} from '../common/router'
import * as restify from 'restify'
import {User} from './users.model'

/**
 *
 * Classe responsável pelas operações do recurso User.
 *
 */
class UsersRouter extends Router {

    constructor() {

        super()

        this.on('beforeRender', document => {
            document.password = undefined
            //delete document.password
        })

    }

    applyRoutes(application: restify.Server) {


        /**
         *
         * Método GET - /users
         *
         */
        application.get('/users', (req, resp, next) => {

            User.find()
                .then(this.render(resp,next))
                .catch(next)

        })


        /**
         *
         * Método GET - /users:id
         *
         */
        application.get('/users/:id', (req, resp, next) => {

            User.findById(req.params.id)
                .then(this.render(resp,next))
                .catch(next)

        })


        /**
         *
         * Método POST - /users
         *
         */
        application.post('/users', (req, resp, next) => {

            let user = new User(req.body)

            user.save()
                .then(this.render(resp,next))
                .catch(next)

        })


        /**
         *
         * Método PUT - /users/:id
         *
         */
        application.put('/users/:id', (req, resp, next) => {

            const options = {overwrite: true}

            User.update({_id: req.params.id}, req.body, options).exec().then(result => {

                if (result.n) {
                    return User.findById(req.params.id)
                } else {
                    resp.send(404)
                }

            }).then(this.render(resp,next))
              .catch(next)

        })


        /**
         *
         * Método PATCH - /users/:id
         *
         */
        application.patch('/users/:id', (req, resp, next) => {

            const options = {new: true}

            User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp,next))
                .catch(next)

        })


        /**
         *
         * Método DELETE - /users/:id
         *
         */
        application.del('/users/:id', (req, resp, next) => {

            User.deleteOne({_id: req.params.id}).exec().then((result: any) => {

                if (result.n) {
                    resp.send(204)
                } else {
                    resp.send(404)
                }

                return next()

            }).catch(next)

        })


    }

}

export const usersRouter = new UsersRouter()