const resolvers = {
  Query: {
    items: (_, __, { dataSources }) => dataSources.itemAPI.getAll(),
    itemById: (_, { id }, { dataSources }) => dataSources.itemAPI.getByID({ id }),
    itemByName: (_, { name }, { dataSources }) =>
      dataSources.itemAPI.getByName({ name }),
    dishes: (_, __, { dataSources }) => dataSources.dishAPI.getAll(),
    dish: (_, { id }, { dataSources }) => dataSources.dishAPI.getByID({ id }),
    inventoryItems: (_, __, { dataSources }) =>
      dataSources.inventoryItemAPI.getAll(),
    inventoryItem: (_, { id }, { dataSources }) =>
      dataSources.inventoryItemAPI.getByID({ id }),
    itemLocations: (_, __, { dataSources }) => dataSources.itemLocationAPI.getAll(),
    itemCategories: (_, __, { dataSources }) => dataSources.itemCategoryAPI.getAll(),
    dishTags: (_, __, { dataSources }) => dataSources.dishTagAPI.getAll(),
    purchases: (_, __, { dataSources }) => dataSources.purchaseAPI.getAll(),
    purchase: (_, { id }, { dataSources }) =>
      dataSources.purchaseAPI.getByID({ id }),
    purchaseLocations: (_, __, { dataSources }) =>
      dataSources.purchaseLocationAPI.getAll(),
  },

  Mutation: {
    deleteItem: (_, { id }, { dataSources }) => dataSources.itemAPI.delete({ id }),
    addPurchase: (_, { date, location }, { dataSources }) =>
      dataSources.purchaseAPI.add({ date, location }),
    deletePurchase: (_, { id }, { dataSources }) =>
      dataSources.purchaseAPI.delete({ id }),
    addPurchaseItem: (
      _,
      {
        purchaseId,
        name,
        price,
        weightAmount,
        weightUnit,
        quantityAmount,
        quantityUnit,
        number,
        itemType,
      },
      { dataSources }
    ) =>
      dataSources.purchaseAPI.addPurchaseItem({
        purchaseId,
        name,
        price,
        weightAmount,
        weightUnit,
        quantityAmount,
        quantityUnit,
        number,
        itemType,
      }),
    addInventoryItem: (
      _,
      {
        name,
        addDate,
        expiration,
        amount,
        defaultShelflife,
        category,
        location,
        itemType,
      },
      { dataSources }
    ) =>
      dataSources.inventoryItemAPI.add({
        name,
        addDate,
        expiration,
        amount,
        defaultShelflife,
        category,
        location,
        itemType,
      }),
    editItem: (
      _,
      {
        id,
        name,
        categoryId,
        defaultLocationId,
        defaultShelflife,
        itemType,
        countsAs,
      },
      { dataSources }
    ) =>
      dataSources.itemAPI.edit({
        id,
        name,
        categoryId,
        defaultLocationId,
        defaultShelflife,
        itemType,
        countsAs,
      }),
    addDish: (_, { name, tags, isActive, ingredientSets }, { dataSources }) =>
      dataSources.dishAPI.addDish({ name, tags, isActive, ingredientSets }),
    updateDish: (_, { id, name, tags, isActive, ingredientSets }, { dataSources }) =>
      dataSources.dishAPI.updateDish({
        id,
        name,
        tags,
        isActive,
        ingredientSets,
      }),
    deleteDish: (_, { id }, { dataSources }) =>
      dataSources.dishAPI.deleteDish({ id }),
    addDishDate: (_, { dishId, date }, { dataSources }) =>
      dataSources.dishAPI.addDishDate({ dishId, date }),
    deleteDishDate: (_, { id }, { dataSources }) =>
      dataSources.dishAPI.deleteDishDate({ id }),
  },

  Item: {
    category: (Item, __, { dataSources }) =>
      dataSources.itemAPI.getCategory({
        id: Item.id,
      }),
    dishes: (Item, __, { dataSources }) =>
      dataSources.itemAPI.getDishes({ id: Item.id }),
    defaultLocation: (Item, __, { dataSources }) =>
      dataSources.itemAPI.getDefaultLocation({ id: Item.id }),
    purchases: (Item, __, { dataSources }) =>
      dataSources.itemAPI.getPurchases({ id: Item.id }),
    countsAs: (Item, __, { dataSources }) =>
      dataSources.itemAPI.getCountsAs({ id: Item.id }),
  },

  InventoryItem: {
    item: (InventoryItem, __, { dataSources }) =>
      dataSources.inventoryItemAPI.getSubItem({
        id: InventoryItem.id,
      }),
    location: (InventoryItem, __, { dataSources }) =>
      dataSources.inventoryItemAPI.getLocation({
        id: InventoryItem.id,
      }),
  },

  Dish: {
    tags: (Dish, __, { dataSources }) =>
      dataSources.dishAPI.getTags({ id: Dish.id }),
    dates: (Dish, __, { dataSources }) =>
      dataSources.dishAPI.getDates({ id: Dish.id }),
    ingredientSets: (Dish, __, { dataSources }) =>
      dataSources.dishAPI.getIngredientSets({ id: Dish.id }),
  },

  IngredientSet: {
    ingredients: (IngredientSet, __, { dataSources }) =>
      dataSources.dishAPI.getIngredientSetIngredients({ id: IngredientSet.id }),
  },

  Ingredient: {
    item: (Ingredient, __, { dataSources }) =>
      dataSources.dishAPI.getIngredientItem({ id: Ingredient.id }),
  },

  Purchase: {
    location: (Purchase, __, { dataSources }) =>
      dataSources.purchaseAPI.getLocation({ id: Purchase.id }),
    items: (Purchase, __, { dataSources }) =>
      dataSources.purchaseAPI.getItems({ id: Purchase.id }),
  },

  PurchaseItem: {
    item: (PurchaseItem, __, { dataSources }) =>
      dataSources.purchaseAPI.getPurchaseItemSubItem({ id: PurchaseItem.itemId }),
    purchase: (PurchaseItem, __, { dataSources }) =>
      dataSources.purchaseAPI.getByID({ id: PurchaseItem.purchaseId }),
  },
}

module.exports = resolvers
