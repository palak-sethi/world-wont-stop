var mainContainer = document.getElementsByClassName("componentContainer")[0];
var searchBox = document.getElementById("search_box");
var TabsContainer = document.getElementById("TabsContainer");
var initialLoadFlag = 0;
var url = '../data/sample.json';

window.onload = function() {
    setTimeout(function(){ document.getElementById("load").style.opacity = "-100";  }, 3000);
    setTimeout(function(){ document.getElementById("load").style.display = "none";  }, 3001);
}
async function postData(url = '', searchText) {
    const response = await fetch(url);
    const cards = await response.json();

    let matches = cards.filter(card => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        if (url === '../data/sample.json') {
            return card.city.match(regex) || card.country.match(regex);
        } else if (url === '../data/medical.json') {
            return card.city.match(regex);
        } else if (url === '../data/vendors.json') {
            return card.city.match(regex);
        }
    })

    if (searchText.length === 0) {
        matches = []
        mainContainer.innerHTML = '';
    }

    appendData(matches);
}

async function covidCasesData(url) {
    const response = await fetch(url);
    const cases = await response.json();
    return cases;
}

function PayFN(PaymentArr)
{
    let tag=``;
    PaymentArr.forEach(element => {
        tag+=`<img class="w-8 m-2" src="assets/${element}.svg">`
    });
    return tag;
}

function appendData(data) {

    if (data.length > 0) {

        const html = data.map(match => `
        <div class="md:flex bg-gray-300 shadow-lg  rounded-lg p-6 mt-10 md:p-10" style="width: 50%;">
        <img class="h-16 w-16 md:h-40 md:w-40 rounded-full mx-auto md:mx-0 md:mr-16" src="./assets/profile-icon.png">
        <div class="text-center md:text-left">
          <h2 class="text-lg md:text-3xl"> ${match.name} </h2>
            <div class="text-gray-600 md:text-lg">${printPlace(match.city, match.country)}</div>
            <div class="text-red-600 md:text-lg">Phone: ${match.phone}</div>
            <p class="text-sm md:text-lg text-gray-600 flex text-center items-center">
                Pay via: &nbsp; 
                ${PayFN(match.paymentModes)}
                ${showMenu(match.dishes)}
            </p>
        </div>
      </div>
        `).join('');

        mainContainer.innerHTML = html;
        // Added the below content for tabs
        if (initialLoadFlag == 0) {
            url = '../data/sample.json';
            mainContainer.style.backgroundColor='rgba(255, 255, 255, 0.53)';
            TabsContainer.innerHTML=
                                    `<li class=" Searchtab ActiveTab" >
                                    <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" onclick="changeUrl('../data/sample.json'); TabChange(event);" href="#c1">Street Food</a>
                                    </li>
                                    <li class=" Searchtab">
                                        <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" onclick="changeUrl('../data/medical.json'); TabChange(event);" href="#c2">Medical Help</a>
                                    </li>
                                    <li class=" Searchtab">
                                        <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" onclick="changeUrl('../data/vendors.json'); TabChange(event);" href="#c3">Groceries</a>
                                    </li>`;
            initialLoadFlag++;
        }
    } else {
        mainContainer.innerHTML = '';
        mainContainer.innerHTML = '';
        mainContainer.style.backgroundColor='transparent';
        TabsContainer.innerHTML='';
        initialLoadFlag = 0;
        url = '../data/sample.json';
    }

}

// funtion called when tab is clicked	
function TabChange(event) {	
    let Tabarr=document.getElementsByClassName('Searchtab');	
        
    let Active=event.target.parentElement;	
            
    [...Tabarr].forEach(element => {	
        let bool = element.classList.contains('ActiveTab');	
        if(bool) {	
            element.classList.remove("ActiveTab");	
        }
    });	
    Active.classList.add("ActiveTab");
    postData(url, searchBox.value);
}
function modalOpen(arr) {
    document.getElementById('modal-content').innerHTML = `<p>${arr}</p> - &#8377; 60`;
}

// function to modify url on tab click
function changeUrl(newurl) {
    url = newurl;
}

// function to print relevant location information
function printPlace(city, country) {
    if (country == undefined) {
        return `${city}`;
    } else {
        return `${city}, ${country}`;
    }
}

// function to determine if the menu should be shown
function showMenu(dishes) {
    if (url == '../data/sample.json') {
        return `<button class="modal-open md:text-lg bg-transparent border border-gray-500 hover:border-red-600 text-gray-500 hover:text-red-600 font-bold py-2 px-10 my-2 rounded-lg text-sm" onClick="modalOpen('${dishes}')">Menu</button>`;
    } else {
        return ``;
    }
}

// Common Myths Logic
var myRadios = document.getElementsByName('tabs2');
var setCheck;
var x = 0;
for(x = 0; x < myRadios.length; x++){
    myRadios[x].onclick = function(){
        if(setCheck != this){
             setCheck = this;
        }else{
            this.checked = false;
            setCheck = null;
    }
    };
}

// Symptom Checker Modal
function work() {
    var frameholder = document.getElementById('mainCovid');
    frameholder.classList.toggle('hidden');
    document.getElementById('covid').src = "https://covid.bhaarat.ai/workflow";
    document.getElementById('backdrop').classList.toggle('hidden');
    toggleButtonText();
}
function toggleButtonText() {
        var change = document.getElementById("show");
        if (change.innerHTML == "Go Back")
        {
            change.innerHTML = "Check For Symptoms";
        }
        else {
            change.innerHTML = "Go Back";
        }
}

// Menu Modal
function modalHelper() {
    var openmodal = document.querySelectorAll('.modal-open')
    for (var i = 0; i < openmodal.length; i++) {
        openmodal[i].addEventListener('click', function (event) {
            event.preventDefault()
            toggleModal()
        })
    }

    const overlay = document.querySelector('.modal-overlay')
    overlay.addEventListener('click', toggleModal)

    var closemodal = document.querySelectorAll('.modal-close')
    for (var i = 0; i < closemodal.length; i++) {
        closemodal[i].addEventListener('click', toggleModal)
    }

    document.onkeydown = function (evt) {
        evt = evt || window.event
        var isEscape = false
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc")
        } else {
            isEscape = (evt.keyCode === 27)
        }
        if (isEscape && document.body.classList.contains('modal-active')) {
            toggleModal()
        }
    };
}
function toggleModal() {
    const body = document.querySelector('body')
    const modal = document.querySelector('.modal')
    modal.classList.toggle('opacity-0')
    modal.classList.toggle('pointer-events-none')
    body.classList.toggle('modal-active')
}

// API COVID-19 Stats data
let cases;

covidCasesData('https://covid2019-api.herokuapp.com/v2/country/india').then((res) => {
    cases = res;
    document.getElementById('india_cases_active').innerHTML = `${cases.data.active}`;
    document.getElementById('india_cases_deaths').innerHTML = `Fatalities (India): ${cases.data.deaths}`;
    document.getElementById('india_cases_recovered').innerHTML = `Recovered (India): ${cases.data.recovered}`;
});

covidCasesData('https://covid2019-api.herokuapp.com/v2/total').then((res) => {
    cases = res;
    document.getElementById('global_cases_active').innerHTML = `${cases.data.confirmed}`;
    document.getElementById('global_cases_recovered').innerHTML = `${cases.data.recovered}`;
    document.getElementById('global_cases_deaths').innerHTML = `Fatalities (Global): ${cases.data.deaths}`;
})

searchBox.addEventListener('keyup', () => postData(url, searchBox.value).then(() => modalHelper()));
