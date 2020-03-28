async function postData(url = '', data = {}) {
    const response = await fetch(url);
    return await response.json();
}

postData("../data/sample.json")
    .then(data => {
        appendData(data);
    }).then(() => modalHelper())

function appendData(data) {

    var mainContainer = document.getElementsByClassName("componentContainer")[0];

    if (data.length > 0) {
        const html = data.map(match => `
        <div class="md:flex bg-gray-300 shadow-lg  rounded-lg p-6 mt-10 md:p-10" style="width: 50%;">
        <img class="h-16 w-16 md:h-40 md:w-40 rounded-full mx-auto md:mx-0 md:mr-16" src="https://avatars.mds.yandex.net/get-altay/226077/2a00000160b9f8f243035488b3fde484ff3e/L">
        <div class="text-center md:text-left">
          <h2 class="text-lg md:text-3xl"> ${match.name} </h2>
            <div class="text-gray-600 md:text-lg">some other detail?</div>
            <div class="text-red-600 md:text-lg">Phone: ${match.phone}</div>
            <p class="text-sm md:text-lg text-gray-600 flex text-center items-center">
                Payment method: &nbsp; 
                <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                </svg>
                <!-- Insert different svg graphics like cash for COD, paytm , atm for online banking etc. -->
            </p>
            
            <button class="modal-open md:text-lg bg-transparent border border-gray-500 hover:border-red-600 text-gray-500 hover:text-red-600 font-bold py-2 px-10 my-2 rounded-lg text-sm">Menu</button>
        </div>
      </div>
        `).join('');

        mainContainer.innerHTML = html;
    }

}

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