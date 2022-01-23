console.log('Client side file is loading!!!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')






weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                return msgOne.textContent = data.error
            }

            msgOne.textContent = data.location
            msgTwo.textContent = data.Forecast
        })
    })

})