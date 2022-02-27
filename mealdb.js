const spinner = document.getElementById('spinner')
const comment = document.getElementById('comment')
const getFoods = () => {
    const searchtTextField = document.getElementById('search-text')
    searchtText = searchtTextField.value
    searchtTextField.value = '';
    callAPI(searchtText);
    spinner.classList.remove('d-none')
    spinner.classList.add('d-block')
}

//---------------------------------
const callAPI = (searchtText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchtText}`
    fetch(url)
        .then(res => res.json())
        .then(data => showResult(data.meals))
}
// const callAPI = async (searchtText) => {
//     const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchtText}`
//     const res = await fetch(url)
//     const data = await res.json()
//     showResult(data.meals)
// }
//---------------------------------

const showResult = (meals) => {
    const resultDiv = document.getElementById('results')
    resultDiv.textContent = '';
    if (meals) {
        meals.forEach(meal => {
            // console.log(meal)
            const {
                idMeal,
                strMealThumb,
                strMeal,
                strInstructions
            } = meal;
            const div = document.createElement('div')
            div.classList.add('col')
            const template =
                `
            <div div onclick = "showDetails(${idMeal})"
            class = "card h-100" >
                <img src="${strMealThumb}" class="card-img-top" alt="img.jpg">
                <div class="card-body">
                    <h5 class="card-title">${strMeal}</h5>
                    <p class="card-text">${strInstructions.slice(0,100)}</p>
                </div>
            </div>
        `;
            div.innerHTML = template;
            resultDiv.appendChild(div)
        });
        // error message remove
        comment.classList.remove('d-block')
        comment.classList.add('d-none')
    } else {
        // error message show
        comment.classList.remove('d-none')
        comment.classList.add('d-block')
    }
    // meals?.forEach(meal => {
    //     // console.log(meal)
    //     const {
    //         idMeal,
    //         strMealThumb,
    //         strMeal,
    //         strInstructions
    //     } = meal;
    //     const div = document.createElement('div')
    //     div.classList.add('col')
    //     const template =
    //         `
    //         <div div onclick = "showDetails(${idMeal})"
    //         class = "card h-100" >
    //             <img src="${strMealThumb}" class="card-img-top" alt="img.jpg">
    //             <div class="card-body">
    //                 <h5 class="card-title">${strMeal}</h5>
    //                 <p class="card-text">${strInstructions.slice(0,100)}</p>
    //             </div>
    //         </div>
    //     `;
    //     div.innerHTML = template;
    //     resultDiv.appendChild(div)
    // });
    spinner.classList.remove('d-block')
    spinner.classList.add('d-none')

}
const showDetails = async (idMeal) => {
    spinner.classList.remove('d-none')
    spinner.classList.add('d-block')
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data.meals[0])
    const detailsSection = document.getElementById('details')
    const template = `
        <div div style = "height: 80vh;"
        class = "card mb-3" >
            <img src="${data.meals[0].strMealThumb}" style="height: 100%; width:auto; overflow: hidden;" class="card-img-top container-fluid"
                alt="img.jpg">
            <div class="card-body">
                <h5 class="card-title">${data.meals[0].strMeal}</h5>
                <p class="card-text">${data.meals[0].strInstructions}</p>
            </div>
        </div>
    `;
    detailsSection.innerHTML = template;
    spinner.classList.remove('d-block')
    spinner.classList.add('d-none')
}