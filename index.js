import {ApolloServer, gql} from 'apollo-server'
import {v1 as uuid} from 'uuid'

const persons = [
    {
        name: 'Luis',
        phone: '1158632828',
        street: 'Bahia Blanca 1337',
        city: 'Buenos Aires',
        id: '3d94650'
    },
    {
        name: 'Alfredo',
        phone: '117862342',
        street: 'Araoz 5678',
        city: 'Buenos Aires',
        id: '3d94650'
    },
    {
        name: 'Rosa',
        street: 'Eleodoro Lobos 285',
        city: 'Buenos Aires',
        id: '3d94650'
    }
]

// Describe all data
const typeDefs = gql`
    type Address {
        street: String!,
        city: String!,
    }
    
    type Person {
        name: String!
        phone: String
        address: Address!
        check: String!
        id: String!
    }
    
    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
    }
    
    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ) : Person
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const { name } = args
            return persons.find(person => person.name  === name)
        }
    },
    Mutation : {
        addPerson: (root, args) => {
            const person = {...args, id: uuid()}
            persons.push(person) // update database new person
            return person
        }
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})


server.listen().then(({ url}) => {
    console.log(`Start server ${url}`)
})