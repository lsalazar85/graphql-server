import {ApolloServer, gql} from 'apollo-server'

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
    type Person {
        name: String!
        phone: String
        street: String!
        city: String!
        id: String!
    }
    
    type Query {
        personCount: Int!
        allPersons: [Person]!
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})


server.listen().then(({ url}) => {
    console.log(`Start server ${url}`)
})