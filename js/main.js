var mainContainer = document.getElementsByClassName("componentContainer")[0];
var searchBox = document.getElementById("search_box");
window.onload = function() {
    setTimeout(function(){ document.getElementById("load").style.opacity = "-100";  }, 3000);
    setTimeout(function(){ document.getElementById("load").style.display = "none";  }, 3001);
    
    // this.console.log("chal raha hai")//example function call.
  }
async function postData(url = '', searchText) {
    const response = await fetch(url);
    const cards = await response.json();

    let matches = cards.filter(card => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return card.city.match(regex) || card.country.match(regex);
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
{/* <img class="w-8 m-2" src="assets/cash.svg">
                <img class="w-8 m-2" src="assets/Gpay.svg">
                <img class="w-8 m-2" src="assets/Paytm.svg">
                <img class="w-8 m-2" src="assets/Netbanking.svg"> */}
                    function PayFN(PaymentArr)
                    {
                        let tag=``;
                        PaymentArr.forEach(element => {
                            tag+=`<img class="w-8 m-2" src="assets/${element}.svg">`
                        });
                        console.log(tag);
                        return tag;
                    }
function appendData(data) {

    if (data.length > 0) {

        const html = data.map(match => `
        <div class="md:flex bg-gray-300 shadow-lg  rounded-lg p-6 mt-10 md:p-10" style="width: 50%;">
        <img class="h-16 w-16 md:h-40 md:w-40 rounded-full mx-auto md:mx-0 md:mr-16" src="./assets/profile-icon.png">
        <div class="text-center md:text-left">
          <h2 class="text-lg md:text-3xl"> ${match.name} </h2>
            <div class="text-gray-600 md:text-lg">${match.city}, ${match.country}</div>
            <div class="text-red-600 md:text-lg">Phone: ${match.phone}</div>
            <p class="text-sm md:text-lg text-gray-600 flex text-center items-center">
                Payment method: &nbsp; 
                ${PayFN(match.paymentModes)}
                <!-- <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
</svg> -->
                <!-- Insert different svg graphics like cash for COD, paytm , atm for online banking etc. -->
            </p>
            
            <button class="modal-open md:text-lg bg-transparent border border-gray-500 hover:border-red-600 text-gray-500 hover:text-red-600 font-bold py-2 px-10 my-2 rounded-lg text-sm">Menu</button>
        </div>
      </div>
        `).join('');

        mainContainer.innerHTML = html;
    } else {
        mainContainer.innerHTML = '';
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
    document.getElementById('india_cases_deaths').innerHTML = `Deaths (India): ${cases.data.deaths}`;
    document.getElementById('india_cases_recovered').innerHTML = `Recovered (India): ${cases.data.recovered}`;
});

covidCasesData('https://covid2019-api.herokuapp.com/v2/total').then((res) => {
    cases = res;
    document.getElementById('global_cases_active').innerHTML = `${cases.data.confirmed}`;
    document.getElementById('global_cases_recovered').innerHTML = `${cases.data.recovered}`;
    document.getElementById('global_cases_deaths').innerHTML = `Deaths (Global): ${cases.data.deaths}`;
})

searchBox.addEventListener('keyup', () => postData('../data/sample.json', searchBox.value).then(() => modalHelper()));