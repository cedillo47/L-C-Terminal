
window.addEventListener('DOMContentLoaded', () => {
console.log("hello")


const apiKeyforPolygon = "KcvZeL7kY8MCWPBjov6DbC4adwjjuWf2"
const poloyBaseURL = "https://api.polygon.io/"
const ticker = "AAPL"



const apiKeyforTweleveData = "4fa2fb4f065046a7a1904ed616c5ec53";
const tweleveDataBaseURL = `https://api.twelvedata.com`

// exmaple fetch call https://api.twelvedata.com/time_series?symbol=AAPL&interval=0.99min&apikey=your_api_key

/// https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=your_api_key possible way to get chart data 

const fetchingPolydata = async () =>{
    // const data = await fetch(`${poloyBaseURL}v3/reference/tickers/${ticker}?apiKey=${apiKeyforPolygon}`)
    const dataobj = await data.json()
    return dataobj
}

const fetchingPolydataNews = async () =>{
    const data = await fetch(`${poloyBaseURL}v2/reference/news?ticker=${ticker}&order=asc&limit=6&sort=published_utc&apiKey=${apiKeyforPolygon}`)
    const dataobj = await data.json()
    console.log(dataobj.next_url)
    return dataobj 
}
 
// fetchingPolydataNews()

// fetchingPolydata().then(data => console.log(data));
})