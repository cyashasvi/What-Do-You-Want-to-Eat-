window.addEventListener("load", function () {


    // ideally this should be a global vairable 
    var cuisine = null
    var city = null

    var dineInBtn = document.getElementById('dine-in')
    var dineOutBtn = document.getElementById('dine-out')
    var saveBtn1 = document.getElementById('save-btn1')
    var cancelBtn1 = document.getElementById('cancel-btn1')
    var saveBtn2 = document.getElementById('save-btn2')
    var cancelBtn2 = document.getElementById('cancel-btn2')
    var changeToDineIn = document.getElementById('change-to-dine-in')
    var changeToDineOut = document.getElementById('change-to-dine-out')
    var cardContent = document.getElementById('dine-in-out')
    var surveyTitle = document.getElementById('survey-title')
    var surveyTitle2 = document.getElementById('survey-title2')
    var recipePage = document.getElementById('recipe-page')
    var recipePageBtn = document.getElementById('recipe-page-btn')
    var foodTypes = document.getElementById('foodTypes')
    var restaurantPage = document.getElementById('restaurant-page')
    var resturantPageBtn = document.getElementById('restaurant-page-btn')

    dineInBtn.addEventListener('click', startSurveyIn)
    dineOutBtn.addEventListener('click', startSurveyOut)
    saveBtn1.addEventListener('click', saveDineInSurvey)
    saveBtn2.addEventListener('click', saveDineOutSurvey)
    cancelBtn1.addEventListener('click', cancelSurvey)
    cancelBtn2.addEventListener('click', cancelSurvey)
    changeToDineIn.addEventListener('click', startSurveyIn)
    changeToDineOut.addEventListener('click', startSurveyOut)
    recipePageBtn.addEventListener('click', showRecipePage)
    resturantPageBtn.addEventListener('click', showRestaurantPage)

    function startSurveyIn() {
        cardContent.classList.add('hide')
        $('.modal1').addClass('is-active')
        surveyTitle.innerHTML = "Dining in is a great choice!"
        recipePage.classList.add('hide')
        clearRecipleList()
    }

    function startSurveyOut() {
        cardContent.classList.add('hide')
        $('.modal2').addClass('is-active')
        surveyTitle2.innerHTML = "Dining out looks like you wont have dishes to do!"
        recipePage.classList.add('hide')
        clearRecipleList()
        document.getElementById('92618').click()
    }

    function cancelSurvey() {
        cardContent.classList.remove('hide')
        $(".modal").removeClass('is-active')
    }

    function saveDineInSurvey() {
        var americanChoice = document.querySelector('input[name = "american"]:checked').value
        console.log(americanChoice)
        $(".modal").removeClass('is-active')
        document.getElementById('american').click()
        // getRandomRecipe()
    }

    function saveDineOutSurvey() {
        var irvineChoice = document.querySelector('input[name = "irvine"]:checked').value
        console.log(irvineChoice)
        $(".modal").removeClass('is-active')
        // getRandomRecipe()
    }

//      function getRandomRecipe() {
//        console.log(americanChoice)
//        var possibleRecipes = []
//        var results = []
//          for (var i = 0; i < recipeCards; i++) {
//              var ranRecipe = possibleRecipes[Math.floor(Math.random() * possibleRecipes.length)]
//              results.push(ranRecipe)
//  }}

    function showRecipePage() {
        cardContent.classList.add('hide')
        recipePage.classList.remove('hide')
        foodTypes.classList.remove('hide')
        restaurantPage.classList.add('hide')
        document.getElementById('american').click()
        clearRecipleList()
    }

    function showRestaurantPage() {
        cardContent.classList.add('hide')
        recipePage.classList.add('hide')
        foodTypes.classList.add('hide')
        restaurantPage.classList.remove('hide')
        document.getElementById('92806').click()
        clearRecipleList()
    }

    //     document.querySelectorAll('american').forEach(function (recipe) {
    //         recipe.addEventListener("click", function (e) {
    //             e.preventDefault()
    //             let list = e.target.id
    //             getRecipesByList(list).then(function (response) {
    //                 response.results.map(recipe => {
    //                     let card = generateCardTemplate(recipe)
    //                     document.getElementById("recipe-page").append(card)
    //                 })
    //             })
    //         })
    //     })




    function getRecipesByList(list) {
        return new Promise((resolve) => {
            fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=6&tags=${list}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "a97a5ed35cmsh52502addb79796dp140b16jsne4d7db9c6ef8",
                    "x-rapidapi-host": "tasty.p.rapidapi.com"
                }
            })
                .then(response => response.json())
                .then(response => resolve(response))
                .catch(err => {
                    console.error(err);
                });

        })
    }

   

    function generateCardTemplate(recipe) {
        const { thumbnail_url, name, cook_time_minutes, description, original_video_url } = recipe


        let html = `
            
                <div class="card mx-4">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img src="${thumbnail_url}" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4">${name}</p>
                                <p class="subtitle is-6"> ${cook_time_minutes || "30"} mins</p>
                            </div>
                        </div>
                        <div class="content">
                            <p id='recipe-detail-1'>${description || "Try this fun recipe out for yourself! Click the button below to start the fun!"}</p>
                            <br>
                            <footer class="card-footer">
                                <a id="view-recipe" class="button" href="${original_video_url}" >View Recipe</a>
                            </footer>
                        </div>
                    </div>
                </div>
           
        
    `

        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }

    function clearRecipleList() {
        let parent = document.getElementById("recipe-page")
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }



    document.querySelectorAll('.recipes').forEach(function (recipe) {

        recipe.addEventListener("click", function (e) {

            e.preventDefault()
            let list = e.target.id
            if (cuisine == list) {
                return
            }
            cuisine = list
            // before we generate html lets us empty the apge 
            clearRecipleList()

            getRecipesByList(list).then(function (response) {
                console.log(response);
                response.results.map(recipe => {
                    let card = generateCardTemplate(recipe)
                    document.getElementById("recipe-page").append(card)
                })
            })
        })
    })

    function getRestaurant(zip) {
        return new Promise(resolve => {
            fetch(`https://api.documenu.com/v2/restaurants/zip_code/${zip}/?size=6`, {
                "method": "GET",
                "headers": {
                    "x-api-key": "481cdd6ceda2a590c083bb3daddbd066",
                    "x-rapidapi-key": "edad40ff31msh277b41d1a9321c3p120a05jsnf0693eb77a08",
                    "x-rapidapi-host": "documenu.p.rapidapi.com"
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    // console.log(data)
                    // return data.data;
                    return resolve(response);
                    // data.data.forEach(restaurant => {
                    //     generateRestCard(restaurant);
                    // })
                })
                .catch(err => {
                    console.error(err);
                });
        })


    }
    

    function generateRestCard(restaurant) {
        const { restaurant_name, restaurant_phone, price_range, address } = restaurant
       

        let html = `
        
            <div class="card mx-4">
                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">${restaurant_name}</p>
                            <p class="subtitle is-6"> ${price_range || "$"}</p>
                            <p class="subtitle is-6"> ${restaurant_phone}</p>
                            <p class="subtitle is-6"> ${address.formatted || "N/A"}</p>
                        </div>
                    </div>
                    <div class="content">

                    </div>
                </div>
            </div>
       
    
`

        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }

    function clearRestaurantList() {
        let parent = document.getElementById("recipe-page")
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }



    document.querySelectorAll('.restaurants').forEach(restaurant => {
        restaurant.addEventListener("click", e => {
            e.preventDefault()
            console.log(e.target.id)

            let zip = e.target.id;
            // let zip;

            // let list = e.target.id
            if (city == zip) {
                return
            }
            city = zip
            console.log(city);
            // switch (city) {

            //     case "irvine":
            //         zip = "92602";
            //         break;
                // case "anaheim":
                //     zip = "92801";
                //     break;

                // default:
                //     zip = "92806";
                //     break;
            // })
            // let list = e.target.id
            // if (city == zip_code) {
            //     return
            // }
            // city = zip_code
            // // before we generate html lets us empty the apge 
            clearRestaurantList()

            getRestaurant(zip).then(function (response) {
                console.log(response);
                response.data.map(restaurant => {
                    console.log(restaurant)
                    let card = generateRestCard(restaurant)
                    document.getElementById("recipe-page").append(card)
                })     
            })
        })
    })



    /* 
    document.querySelectorAll(".recipes").addEventListener("click", function (e) {
        e.preventDefault();
        var list = document.querySelector(".recipes").value;
        console.log(list);
        // var searchValue = document.querySelector(".city-input").value;
        if (list) {
            getRecipesByList(list);
            // getForecast(searchValue);
            document.querySelector(".recipes").value = "";
        }
    })
  */
    /* 
    getLists().then(lists => {
        console.log("the lists are", lists)
    
            // for each list OR for a single list, 
            getRecipesByList(single_list_goes_here).then( recipes => {
                console.log(recipes)
                // for each reicpe, we can get recipe details 
                getRecipeDetail(recipe_id).then( details => {
                    // list the individual recipe details by id 
                    console.log(details)
                })
            })
    
        }) */

    // document.querySelector('.card').innerHTML = '';


    //  function italianGroup() {

    //    var italianFood = document.createElement('p');
    //   italianFood.textContent = "sad";

    //   document.querySelector('.card').appendChild(italianFood);

    //  }

    //  document.getElementById('italian').addEventListener('click', italianGroup);

})

