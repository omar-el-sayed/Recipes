let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let allRecipes = [];
let recipeDetails = {};

async function getRecipes(term) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
    allRecipes = await apiResponse.json();
    allRecipes = allRecipes.recipes;
    displayRecipes();
}

function displayRecipes() {
    let cartoona = ``;
    for (let recipe of allRecipes) {
        let myId=`'${recipe.recipe_id}'`;
        cartoona += `<div class="col-md-4">
                    <div class="recipe" onclick="getRecipeDetails(${myId})">
                        <img src="${recipe.image_url}" class="w-100" alt="">
                        <h3 class="color-mine pt-1">${recipe.title}</h3>
                        <p>${recipe.publisher}</p>
                    </div>
                    </div>`;
    }
    document.getElementById('recipesRow').innerHTML = cartoona;
}

async function getRecipeDetails(id) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    recipeDetails = await apiResponse.json();
    recipeDetails = recipeDetails.recipe;
    displayRecipeDetails();
}

function displayRecipeDetails() {
    let recipeIngredients = ``;
    for (let x of recipeDetails.ingredients) {
        recipeIngredients += `<li class="d-flex align-items-center my-3"><span class="fa-li"><i class="fas fa-utensils"></i></span>${x}</li>`
    }

    let cartoona = `<div class="recipeDetails py-1">
                <h2 class="color-mine my-2">${recipeDetails.title}</h2>
                <img src="${recipeDetails.image_url}" class="img-fluid" alt="">
                <h5 class="my-3">${recipeDetails.publisher}</h5>
                <ul class="fa-ul my-3 font-weight-bolder">
                    ${recipeIngredients}
                </ul>
                </div>`;
    document.getElementById("recipeDetails").innerHTML = cartoona;
}

// Events
searchBtn.addEventListener("click", function () {
    getRecipes(searchInput.value);
});
searchInput.addEventListener("keypress", function (eventInfo) {
    if (eventInfo.key == "Enter") {
        getRecipes(this.value);
    }
});