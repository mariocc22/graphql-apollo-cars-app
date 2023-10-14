//  1. define the schema
const people = [
  {
    id: "1",
    firstName: "Bill",
    lastName: "Gates",
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Jobs",
  },
  {
    id: "3",
    firstName: "Linux",
    lastName: "Torvalds",
  },
];

// 2. define the type definitions for the schema
const typeDefs = `
  type People {
    id: String!
    firstName: String
    lastName: String
  }

  type Query {
    people: [People]
    person(id: String!): People
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): People
    updatePerson(id: String!, firstName: String, lastName: String): People
    removePerson(id: String!): People
  }
`;

// 3. define the resolvers for the schema fields (Query) defined in step 2 above (typeDefs) and the data defined in step 1 above (people)
const resolvers = {
  Query: {
    people: () => people,
    person: (root, { id }) => people.find((person) => person.id === id),
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (root, args) => {
      const person = people.find((person) => person.id === args.id);
      if (!person) {
        throw new Error(`Couldn't find person with id ${args.id}`);
      }
      person.firstName = args.firstName;
      person.lastName = args.lastName;
      return person;
    },
    removePerson: (root, args) => {
      const personIndex = people.findIndex((person) => person.id === args.id);

      if (personIndex === -1) {
        throw new Error(`Couldn't find person with id ${args.id}`);
      }
      const removedPeople = people.splice(personIndex, 1);
      return removedPeople[0];
    },
  },
};
/////////////////////////////////////////////////////////////////////////////////////////////

const cars = [
  {
    id: "1",
    year: "2019",
    make: "Toyota",
    model: "Corolla",
    price: "40000",
    personId: "1",
  },
  {
    id: "2",
    year: "2018",
    make: "Lexus",
    model: "LX 600",
    price: "13000",
    personId: "1",
  },
  {
    id: "3",
    year: "2017",
    make: "Honda",
    model: "Civic",
    price: "20000",
    personId: "1",
  },
  {
    id: "4",
    year: "2019",
    make: "Acura ",
    model: "MDX",
    price: "60000",
    personId: "2",
  },
  {
    id: "5",
    year: "2018",
    make: "Ford",
    model: "Focus",
    price: "35000",
    personId: "2",
  },
  {
    id: "6",
    year: "2017",
    make: "Honda",
    model: "Pilot",
    price: "45000",
    personId: "2",
  },
  {
    id: "7",
    year: "2019",
    make: "Volkswagen",
    model: "Golf",
    price: "40000",
    personId: "3",
  },
  {
    id: "8",
    year: "2018",
    make: "Kia",
    model: "Sorento",
    price: "45000",
    personId: "3",
  },
  {
    id: "9",
    year: "2017",
    make: "Volvo",
    model: "XC40",
    price: "55000",
    personId: "3",
  },
];

export { typeDefs, resolvers };
