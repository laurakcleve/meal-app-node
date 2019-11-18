const resolvers = {
  Query: {
    items: (_, __, { dataSources }) => dataSources.itemAPI.getAll(),
    item: (_, { id }, { dataSources }) => dataSources.itemAPI.getByID({ id }),
  },
}

module.exports = resolvers
