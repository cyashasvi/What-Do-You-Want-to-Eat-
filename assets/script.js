window.addEventListener("load", function () {
    var apiKey = "FlqWwYqJzXaWUWn3V-cYinMrcKlu855-57HIftCbVrLLG5uXvoo89kw7jDbW6GhyiOhrghGq72yWbS4En9ZTDWnBzqct_d6PLFhI9Jp_U4xTrFAF3vFdd43hobRSYHYx";
    var yelpID = "ILScKjvBUWM78H9UUR3uxA"


    var dineInBtn = document.getElementById('dine-in')
    var dineOutBtn = document.getElementById('dine-out')
    var saveBtn = document.getElementById('save-btn')
    var cancelBtn = document.getElementById('cancel-btn')
    var changeToDineIn = document.getElementById('change-to-dine-in')
    var changeToDineOut = document.getElementById('change-to-dine-out')
    var cardContent = document.getElementById('dine-in-out')
    var surveyTitle = document.getElementById('survey-title')
    var recipePage = document.getElementById('recipe-page')
    var recipePageBtn = document.getElementById('recipe-page-btn')

    dineInBtn.addEventListener('click', startSurveyIn)
    dineOutBtn.addEventListener('click', startSurveyOut)
    saveBtn.addEventListener('click', saveSurvey)
    cancelBtn.addEventListener('click', cancelSurvey)
    changeToDineIn.addEventListener('click', startSurveyIn)
    changeToDineOut.addEventListener('click', startSurveyOut)
    recipePageBtn.addEventListener('click', showRecipePage)

    function startSurveyIn() {
        cardContent.classList.add('hide')
            $('.modal').addClass('is-active')
            surveyTitle.innerHTML = "Dining in is a great choice!"
            recipePage.classList.add('hide')
        }

    function startSurveyOut() {
            cardContent.classList.add('hide')
                $('.modal').addClass('is-active')
                surveyTitle.innerHTML = "Dining out looks like you wont have dishes to do!";
                recipePage.classList.add('hide')
            }

    function cancelSurvey() {
        cardContent.classList.remove('hide')
        $(".modal").removeClass('is-active')
        }
        
    function saveSurvey() {
        $(".modal").removeClass('is-active')
            }

    function showRecipePage() {
        cardContent.classList.add('hide')
        recipePage.classList.remove('hide')
    }


    function getRecipesByList(list) {
        return new Promise((resolve) => {
            fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=${list}`, {
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

    function getRecipeDetail(recipe_id) {
        return new Promise((resolve) => {
            fetch(`https://tasty.p.rapidapi.com/recipes/detail?id=${recipie_id}`, {
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

    function getLists() {
        return new Promise((resolve) => {
            fetch("https://tasty.p.rapidapi.com/tags/list", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "a97a5ed35cmsh52502addb79796dp140b16jsne4d7db9c6ef8",
                    "x-rapidapi-host": "tasty.p.rapidapi.com"
                }
            })
                .then(response => response.json())
                .then(response => {
                    resolve(response)
                })
                .catch(err => {
                    console.error(err);
                });
        })
    }

    document.querySelector(".recipes").addEventListener("click", function (e) {
        e.preventDefault();
        var list = document.querySelector(".recipes").value;
        // var searchValue = document.querySelector(".city-input").value;
        if (searchCity) {
            getRecipesByList(list);
            // getForecast(searchValue);
            document.querySelector(".recipes").value = "";
        }
    })
  
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