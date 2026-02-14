//priority: 0

ServerEvents.recipes(event => {
    event.forEachRecipe({ input: /buildersaddition:(.*)_vertical_slab/ }, recipe => {
        recipe.originalRecipeIngredients.forEach(ing => {
            ing.itemIds.forEach(itemId => {
                if (itemId.match(/buildersaddition:(.*)_vertical_slab/)) {
                    let newItemId = itemId.replace(/buildersaddition:(.*)_vertical_slab/, 'quark:$1_vertical_slab')
                    event.replaceInput({ recipe: recipe.id }, itemId, newItemId)
                }
            })
        })
    })
})