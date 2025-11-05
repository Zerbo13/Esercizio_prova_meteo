const OPENMETEOURL =
  "https://api.open-meteo.com/v1/forecast?latitude=41.7926&longitude=12.8713&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&hourly=temperature_2m&current=temperature_2m&timezone=Europe%2FBerlin"

const getWeather = function () {
  fetch(OPENMETEOURL)
    .then((response) => {
      if (response.ok === true) {
        // solo qui dentro io proseguo cercando di recuperare il body
        return response.json()
      } else {
        // qui dentro finite in caso di 401, 404, 500, etc.
        throw new Error('Errore nella risposta!')
      }
    })
    .then((datiMeteo) => {
      console.log('datimeteo', datiMeteo)
      console.log('TEMPERATURA CORRENTE', datiMeteo.current.temperature_2m)
      console.log('TEMPERATURA MASSIMA', datiMeteo.daily.temperature_2m_max[0])
      console.log('TEMPERATURA MINIMA', datiMeteo.daily.temperature_2m_min[0])
      console.log('PROBABILITA DI PRECIPITAZIONI', datiMeteo.daily.precipitation_probability_max[0])
      const minSpan = document.getElementById('min-temp')
      const maxSpan = document.getElementById('max-temp')
      const maxPrec = document.getElementById('max-prec')
      minSpan.innerText = datiMeteo.daily.temperature_2m_min[0]
      maxSpan.innerText = datiMeteo.daily.temperature_2m_max[0]
      maxPrec.innerText = datiMeteo.daily.precipitation_probability_max[0] + "%"

      //metto la temperatura corrente
      const currentTempSpan = document.getElementById('current-temp')
      currentTempSpan.innerText = datiMeteo.current.temperature_2m
    })
    .catch((err) => {
      console.log('ERRORE!', err)
    })
}

getWeather()