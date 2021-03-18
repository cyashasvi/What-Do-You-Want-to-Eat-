
// document.querySelector('.card').innerHTML = '';

function italianGroup() {

  var italianFood = document.createElement('p');
  italianFood.textContent = "sad";

  document.querySelector('.card').appendChild(italianFood);

}
  
document.getElementById('italian').addEventListener('click', italianGroup);

