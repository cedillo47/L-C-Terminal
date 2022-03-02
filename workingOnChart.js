window.addEventListener('DOMContentLoaded', () => {
    console.log("hello")
    
    
    const LeosapiKeyforPolygon = "KcvZeL7kY8MCWPBjov6DbC4adwjjuWf2"
    const poloyBaseURL = "https://api.polygon.io/"
    const ticker = "AAPL"
    
    
    
    const LeosapiKeyforTweleveData = "4fa2fb4f065046a7a1904ed616c5ec53";
    const tweleveDataBaseURL = `https://api.twelvedata.com`

    const LEOsapiKryforAlphaVantage = `MDALAPN8VGQ1J9CY`
    const baseURLForAlphvantage = 'https://www.alphavantage.co/'
    

    const graphData = async () => {
        const response = await fetch(`${baseURLForAlphvantage}query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${LEOsapiKryforAlphaVantage}&datatype=csv`)
        const data = await response.text()
        console.log(data);
    }

    // graphData()




    
    // exmaple fetch call https://api.twelvedata.com/time_series?symbol=AAPL&interval=0.99min&apikey=your_api_key
    
    /// https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=your_api_key possible way to get chart data 
    
    
    
    
    
    ///  this is using vantage point 
    
    // another way to query chart data https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo
    // const LEOsapiKryforAlphaVantage = `MDALAPN8VGQ1J9CY`
    
    
    // const fetchingPolydata = async () =>{
    //     const data = await fetch(`${poloyBaseURL}v3/reference/tickers/${ticker}?apiKey=${putyourkeyHEre}`)
    //     const dataobj = await data.json()
    //     return dataobj
    // }
    
    // const fetchingPolydataNews = async () =>{
    //     const data = await fetch(`${poloyBaseURL}v2/reference/news?ticker=${ticker}&order=asc&limit=6&sort=published_utc&apiKey=${putyourkeyHEre}`)
    //     const dataobj = await data.json()
    //     console.log(dataobj)
    //     return dataobj 
    // }
     
    // fetchingPolydataNews()
    
    // fetchingPolydata().then(data => console.log(data));
    })