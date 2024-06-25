document.addEventListener('DOMContentLoaded', () => {
    const recipes = [
        {
            title: 'Spaghetti Carbonara',
            description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
            ingredients: ['spaghetti', 'eggs', 'cheese', 'pancetta', 'pepper'],
            instructions: ['Boil pasta', 'Cook pancetta', 'Mix eggs and cheese', 'Combine all ingredients']
        },

        {
            title: 'Chicken Curry',
            description: 'A flavorful dish made with chicken, spices, and coconut milk.',
            ingredients: ['chicken', 'spices', 'coconut milk', 'onions', 'garlic'],
            instructions: ['Cook onions and garlic', 'Add chicken and spices', 'Pour in coconut milk', 'Simmer until cooked']
        }
    ];

    const searchInput = document.getElementById('search');
    const recipeList = document.getElementById('recipe-list');

    if(recipeList) {
        const renderRecipes = (recipesToRender) => {
            recipeList.innerHTML = '';
            recipesToRender.forEach(recipe => {
                const recipeItem = document.createElement('div');
                recipeItem.classList.add('recipe-item');
                recipeItem.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                    <a href="recipe.html?title=${encodeURIComponent(recipe.title)}">View Recipe</a>
                `;
                recipeList.appendChild(recipeItem);
            });
        };

        renderRecipes(recipes);

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filteredRecipes = recipes.filter(recipe => 
                    recipe.title.toLowerCase().includes(query) || 
                    recipe.description.toLowerCase().includes(query)
            );
            renderRecipes(filteredRecipes);
        });
    }

    const recipeForm = document.getElementById('recipe-form');
    if(recipeForm) {
        recipeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newRecipe = {
                title: e.target.title.value,
                description: e.target.description.value,
                ingredients: e.target.ingredients.value.split(','),
                instructions: e.target.instructions.value.split(',')
            };
            recipes.push(newRecipe);
            alert('Recipe submitted!');
            recipeForm.reset();
        });
    }

    const params = new URLSearchParams(window.location.search);
    const recipeTitle = params.get('title');
    if(recipeTitle) {
        const recipe = recipes.find(r => r.title === recipeTitle);
        if(recipe) {
            document.getElementById('recipe-title').textContent = recipe.title;
            document.getElementById('recipe-description').textContent = recipe.description;
            document.getElementById('recipe-ingredients').innerHTML = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
            document.getElementById('recipe-instructions').innerHTML = recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('');
        }
    }
});