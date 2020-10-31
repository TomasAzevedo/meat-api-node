// Fake for while
const users = [
    {id: '1', name:'Peter Parker', email: 'peter@marvel.com'},
    {id: '2', name:'Bruce Wayne', email: 'bruce@dc.com'}
]

/**
 *
 * Classe que representa um usuário do sistema.
 *
 */
export class User {


    /**
     *
     * Método que retorna todos os usuários.
     *
     */
    static findAll(): Promise<any[]> {

        return Promise.resolve(users)

    }


    /**
     *
     * Método que retorna um determinado usuário pelo número do id.
     *
     * @param id - número identificador do usuário.
     *
     */
    static findById(id: string): Promise<any> {

        return new Promise(resolve => {

            const filtered = users.filter(user => user.id === id)

            let user = undefined
            if (filtered.length > 0) {
                user = filtered[0]
            }

            resolve(user)

        })

    }


}