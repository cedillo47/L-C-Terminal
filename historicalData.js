window.addEventListener('DOMContentLoaded', () => {
    // console.log("hello")
    const ctx = document.getElementById('myChart').getContext('2d');
    const form = document.getElementById("tickerForm");

    const tickervalue = document.getElementById("tickerID")
    const historicalDiv = document.getElementById("historicalDiv");
    const fiftyTwoWeekHli = document.getElementById("fiftyTwoWeekHigh")
    const fiftyTwoWeekli = document.getElementById("fiftyTwoWeekLow")
    const avgVolli = document.getElementById("avgVolume")
    const openli = document.getElementById("openPrice")
    const precloli = document.getElementById("preClose")
    const rangeli = document.getElementById("tradingRange")
    const percentChangeli = document.getElementById("percentChange")

    const NewsDiv = document.getElementById("newsDiv").children
// console.log(NewsDiv)

// for(let i = 0; i < NewsDiv.length; i++){
//     console.log(NewsDiv[i], i)
//     NewsDiv.innerText = `hello ${i}`
// }

// for(node of NewsDiv){
//     node.innerHTML = "<div>Hello</div>"
// }
    // NewsDiv.forEach(node => {
        // node.innerHTML = "<div>Hello</div>"
    // })


    const news1 = document.getElementById('new1')
    const news2 = document.getElementById('news2')
    const news3 = document.getElementById('news3')
    const news4 = document.getElementById('news4')
    const news5 = document.getElementById('news5')
    const news6 = document.getElementById('news6')





    let tickerval;

    const shevApiKeyForPolygon = '1Ju681No8yQpB1Pz2i3hjruwbdY5kOkv'
    const LeosapiKeyforPolygon = "KcvZeL7kY8MCWPBjov6DbC4adwjjuWf2"
    const poloyBaseURL = "https://api.polygon.io/"


    const LeosapiKeyforTweleveData = "4fa2fb4f065046a7a1904ed616c5ec53";
    const tweleveDataBaseURL = `https://api.twelvedata.com`


    const LEOsapiKryforAlphaVantage = `MDALAPN8VGQ1J9CY`
    const baseURLForAlphvantage = 'https://www.alphavantage.co/'

    let stockChart = null;



    // this all the functions for get graph data
    //this is where all API are called when the form is interacted with
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        tickerval = tickervalue.value;
        const historyData = await fetchingPolydata();
        const dataobj = await graphData();
        const newsData = await fetchingPolydataNews();
        
        fiftyTwoWeekHli.innerText = `The 52 week high of ${tickerval} is ${historyData.fiftyTwoWeekHigh}`
        fiftyTwoWeekli.innerText = `The 52 week low of ${tickerval} is ${historyData.fiftyTwoWeekLow}`
        avgVolli.innerText = `The avrage volume of ${tickerval} is ${historyData.avgVolume}`
        openli.innerText = `The opening price of ${tickerval} is ${historyData.openPrice}`
        precloli.innerText = `${tickerval} previous close was ${historyData.preClose}`
        rangeli.innerText = `the current trading range of ${tickerval} is ${historyData.tradingRange}`
        percentChangeli.innerText = `The percent change previous days open to todays open is ${historyData.percentChange}`

        console.log(newsData)

        let counter = 0

        for(node of NewsDiv){
            node.innerHTML = `<h6>${newsData.tittle[counter]} by ${newsData.author[counter]}</h6>
            <p>${newsData.description[counter]}</p>`
            counter++; 
        }
        
        getGraph(dataobj);
    })




    async function graphData() {
        let dateData = [];
        let priceData = [];
        const response = await fetch(`${baseURLForAlphvantage}query?function=TIME_SERIES_DAILY&symbol=${tickerval}&apikey=${LEOsapiKryforAlphaVantage}&datatype=csv`)
        const data = await response.text()
        const csvData = Papa.parse(data, {
            header: true,
            skipEmptyLines: true
        })
        // for (let i = 0; i < csvData.data.length; i++) {
        //     priceData.push(csvData.data[i].open)
        // }
        for (let i = csvData.data.length - 1; 0 <= i; i--) {
            dateData.push(csvData.data[i].timestamp)
            priceData.push(csvData.data[i].open)
        }
        return { priceData, dateData }
    }





    // this function will call graphData to then create a graph that will be shown on the DOM



    async function getGraph(input) {
        const data = input

        if(stockChart){
            // console.log(data)
            stockChart.data.datasets[0].data = [...data.priceData]
            stockChart.data.datasets[0].labels = [...data.dateData]
            stockChart.data.datasets[0].label = tickerval
            // console.log(stockChart.data)
            stockChart.update();
            return;
        } 
        
        stockChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [...data.dateData],
                datasets: [{
                    label: `${tickerval}`,
                    data: [...data.priceData],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // console.log("hi")

        // stockChart.update()

    }




    // this fucntion will retreve all of the historical data we need ATM
    async function fetchingPolydata() {
        const historicalDataURLFrom12Data = `${tweleveDataBaseURL}/quote?symbol=${tickerval}&apikey=${LeosapiKeyforTweleveData}`
        const data = await fetch(`${historicalDataURLFrom12Data}`)
        const dataobj = await data.json()
        const fiftyTwoWeekHigh = dataobj.fifty_two_week.high
        const fiftyTwoWeekLow = dataobj.fifty_two_week.low
        const avgVolume = dataobj.average_volume
        const openPrice = dataobj.open
        const preClose = dataobj.previous_close
        const tradingRange = dataobj.fifty_two_week.range
        const percentChange = dataobj.percent_change
        return { fiftyTwoWeekHigh, fiftyTwoWeekLow, avgVolume, openPrice, preClose, tradingRange, percentChange }
    };


/// this is where the news fucntion will live


    async function fetchingPolydataNews() {
        const tittle = [];
        const description = [];
        const urlToArtical = [];
        const author = [];
        const data = await fetch(`${poloyBaseURL}v2/reference/news?ticker=${tickerval}&order=asc&limit=6&sort=published_utc&apiKey=${shevApiKeyForPolygon}`)
        const dataobj = await data.json()
        console.log(dataobj)
        // news1.innerText = `${news.results[0].title},${news.results[0].article_url},${news.results[0].author},${news.results[0].description}`

        const dataWeNeed = dataobj.results
        for(let i = 0; i < dataobj.results.length; i++){
            tittle.push(dataWeNeed[i].title);
            description.push(dataWeNeed[i].description);
            urlToArtical.push(dataWeNeed[i].article_url)
            author.push(dataWeNeed[i].author)

        }

// console.log(tittle)
        // console.log(tittle,description,urlToArtical,author)
        return {tittle, description, urlToArtical, author}
    }


/// trying to implaments live stockprice feature; 

    const callingLivePrice = async() => {

        const livePriceSocket = new WebSocket(`wss://ws.twelvedata.com/v1/quotes/price?apikey=${LeosapiKeyforTweleveData}`)

        // livePriceSocket.addEventListener("open", e => {
            // livePriceSocket.send(JSON.stringify({

            //     "action": "subscribe",

            //     "params": {
            //         "symbols": `${tickerval}`
            //     }


            // }))
        // })



        livePriceSocket.onopen = function(e){
            // alert("[open] Connection established");
            // alert("Sending to server");
            livePriceSocket.send(JSON.stringify({
                "action": "subscribe",
                "params": {
                    "symbols": `QQQ`
                }
            }))
        }

        livePriceSocket.onmessage = (e) => {
            //you would just do e[what you want]
            // console.log(price.timestamp)
            // const data = price; 
            // const jsondata = data.json()
            // console.log(jsondata)
            // console.log(data.json())
            console.log(e)
            alert(`[message] Data received from server: ${e.data}`);
            // const data = await e.data.json()
            
            // console.log(data)
            // console.log
        }


        // const response = await fetch(`wss://ws.twelvedata.com/v1/quotes/price?apikey=${LeosapiKeyforTweleveData}`)
        // const data = await response.json()
        // console.log(data)
    }

    // callingLivePrice();

})



