// Search functionality: Fetch meal by name
document.getElementById('sea').addEventListener('click', async () => {
    const searchInput = document.getElementById('sear').value;
    if (searchInput) {
        const searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
        const res = await fetch(searchUrl);
        const data = await res.json();
        displayMeals(data.meals);
         document.getElementById('me').style.display='block'
    }
});

// Display meals function (reusable for multiple scenarios)
function displayMeals(meals) {
    let mealContent = '';
    if (meals) {
        meals.forEach(mealItem => {
            mealContent += `
                <div>
                    <h5>${mealItem.strMeal}</h5>
                    <img src='${mealItem.strMealThumb}' alt="meal image" class="meal-image" data-meal-id="${mealItem.idMeal}" id="meal-image">
                </div>
            `;
        });
    } else {
        mealContent = '<p>No meals found</p>';
    }
    document.getElementById('meal').innerHTML = mealContent;

    // Adding click event to each meal for details (Meal details by ID)
    document.querySelectorAll('.meal-image').forEach(img => {
        img.addEventListener('click', async () => {
            const mealId = img.getAttribute('data-meal-id');
            const detailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
            const res = await fetch(detailUrl);
            const data = await res.json();
            displayMealDetails(data.meals[0]);
            // Display detailed meal info
        });
    });
}

// Function to display meal details
function displayMealDetails(meal) {
    alert(`Meal Name: ${meal.strMeal}\nCategory: ${meal.strCategory}\nInstructions: ${meal.strInstructions}`);
}

// Hamburger menu toggle
let side = document.getElementById('hamb');
let hamb = document.getElementById('ham');
side.addEventListener('click', () => {
    hamb.style.display = hamb.style.display === 'block' ? 'none' : 'block';
});

// Hamburger menu functionality: Filter meals by category
document.querySelectorAll('#ham-list li').forEach(item => {
    item.addEventListener('click', async () => {
        const category = item.getAttribute('data-category');
        const categoryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        const res = await fetch(categoryUrl);
        const data = await res.json();
        displayMeals(data.meals); // Display filtered meals by category
        hamb.style.display = 'none';
        document.getElementById('me').style.display='block' 
        // Close the menu after selection
    });
});

// Fetch and display meal categories (with images clickable for filtering)
let fetchCategories = async () => {
    const categoryUrl = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    const res = await fetch(categoryUrl);
    const data = await res.json();
    let food = '';
    data.categories.forEach(category => {
        food += `
            <div id='cat'>
                <h5 id="he1">${category.strCategory}</h5>
                <img src='${category.strCategoryThumb}' alt="image" class="beefs" data-category="${category.strCategory}" id="image">
            </div>
        `;
    });
    document.getElementById('fun').innerHTML = food;

    // Adding click event to each category image to fetch meals
    document.querySelectorAll('.beefs').forEach(photo => {
        photo.addEventListener('click', async () => {
            const selectedCategory = photo.getAttribute('data-category');
            const categoryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
            const res = await fetch(categoryUrl);
            const data = await res.json();
            displayMeals(data.meals);
             document.getElementById('me').style.display='block' // Display filtered meals by category
        });
    });
};
fetchCategories();
