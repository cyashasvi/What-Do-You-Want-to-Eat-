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
        fetch("https://tasty.p.rapidapi.com/recipes/detail?id=5586", {
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

function italianGroup() {

  var italianFood = document.createElement('p');
  italianFood.textContent = "sad";

  document.querySelector('.card').appendChild(italianFood);

}
  
document.getElementById('italian').addEventListener('click', italianGroup);

