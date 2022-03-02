window.addEventListener('DOMContentLoaded', () => {
    console.log("hello")

    const shevApiKeyForPolygon = '1Ju681No8yQpB1Pz2i3hjruwbdY5kOkv'
    const LeosapiKeyforPolygon = "KcvZeL7kY8MCWPBjov6DbC4adwjjuWf2"
    const poloyBaseURL = "https://api.polygon.io/"
    const ticker = "AAPL"
    const news1 = document.getElementById('new1')
    const news2 = document.getElementById('news2')
    const news3 = document.getElementById('news3')
    const news4 = document.getElementById('news4')
    const news5 = document.getElementById('news5')
    const news6 = document.getElementById('news6')
    
    
    const LeosapiKeyforTweleveData = "4fa2fb4f065046a7a1904ed616c5ec53";
    const tweleveDataBaseURL = `https://api.twelvedata.com`
    
    // exmaple fetch call https://api.twelvedata.com/time_series?symbol=AAPL&interval=0.99min&apikey=your_api_key
    
    /// https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=your_api_key possible way to get chart data 
    
    
    
    
    
    ///  this is using vantage point 
    
    // another way to query chart data https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo
    const LEOsapiKryforAlphaVantage = `MDALAPN8VGQ1J9CY`
    
    const fetchingPolydata = async () =>{
        const data = await fetch(`${poloyBaseURL}v3/reference/tickers/${ticker}?apiKey=${shevApiKeyForPolygon}`)
        const dataobj = await data.json()
        return dataobj
    }
    
    const fetchingPolydataNews = async () =>{
        const data = await fetch(`${poloyBaseURL}v2/reference/news?ticker=${ticker}&order=asc&limit=6&sort=published_utc&apiKey=${shevApiKeyForPolygon}`)
        const dataobj = await data.json()
        console.log(dataobj)
         news1.innerText = `${dataobj.results[0].title},${dataobj.results[0].article_url},${dataobj.results[0].author},${dataobj.results[0].description}`
         news2.innerText = `${dataobj.results[1].title},${dataobj.results[1].article_url},${dataobj.results[1].author},${dataobj.results[1].description}`
         news3.innerText = `${dataobj.results[2].title},${dataobj.results[2].article_url},${dataobj.results[2].author},${dataobj.results[2].description}`
         news4.innerText = `${dataobj.results[3].title},${dataobj.results[3].article_url},${dataobj.results[3].author},${dataobj.results[3].description}`
         news5.innerText = `${dataobj.results[4].title},${dataobj.results[4].article_url},${dataobj.results[4].author},${dataobj.results[4].description}`
         news6.innerText = `${dataobj.results[5].title},${dataobj.results[5].article_url},${dataobj.results[5].author},${dataobj.results[5].description}`
        return dataobj
    }
     
    // fetchingPolydataNews()
    
     //fetchingPolydata().then(data => console.log(data));
    })