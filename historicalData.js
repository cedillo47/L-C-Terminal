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

    


    // console.log(historicalDiv)
    
    // console.log(tickervalue.value)
    let tickerval; 

    const LeosapiKeyforPolygon = "KcvZeL7kY8MCWPBjov6DbC4adwjjuWf2"
    const poloyBaseURL = "https://api.polygon.io/"

    const LeosapiKeyforTweleveData = "4fa2fb4f065046a7a1904ed616c5ec53";
    const tweleveDataBaseURL = `https://api.twelvedata.com`

    const LEOsapiKryforAlphaVantage = `MDALAPN8VGQ1J9CY`
    const baseURLForAlphvantage = 'https://www.alphavantage.co/'

// this all the functions for get graph data

form.addEventListener("submit", async (e)=> {
    e.preventDefault();
    tickerval = tickervalue.value;
    // console.log(tickerval)

    const historyData = await fetchingPolydata();
    const dataobj = await graphData();

    
    fiftyTwoWeekHli.innerText = `The 52 week high of ${tickerval} is ${historyData.fiftyTwoWeekHigh}` 
    fiftyTwoWeekli.innerText = `The 52 week low of ${tickerval} is ${historyData.fiftyTwoWeekLow}` 
    avgVolli.innerText = `The avrage volume of ${tickerval} is ${historyData.avgVolume}`
    openli.innerText = `The opening price of ${tickerval} is ${historyData.openPrice}` 
    precloli.innerText = `${tickerval} previous close was ${historyData.preClose}` 
    rangeli.innerText = `the current trading range of ${tickerval} is ${historyData.tradingRange}` 
    percentChangeli.innerText = `The percent change previous days open to todays open is ${historyData.percentChange}` 
    
//   console.log(historicalDATA)



    getGraph(dataobj);
})

    async function graphData(){
        let dateData = [];
        let priceData = [];
        const response = await fetch(`${baseURLForAlphvantage}query?function=TIME_SERIES_DAILY&symbol=${tickerval}&apikey=${LEOsapiKryforAlphaVantage}&datatype=csv`)
        const data = await response.text()

        const csvData = Papa.parse(data, {
            header: true,
            skipEmptyLines: true
        })

        for (let i = 0; i < csvData.data.length; i++) {
            priceData.push(csvData.data[i].open)
        }
        for (let i = csvData.data.length - 1; 0 <= i; i--) {
            dateData.push(csvData.data[i].timestamp)
        }
        return { priceData, dateData }
    }
// this function will call graphData to then create a graph that will be shown on the DOM 
    async function getGraph(input) {
        const data = input
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [...data.dateData],
                datasets: [{
                    label: `${tickervalue.value}`,
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
    }
// getGraph() // this will call a graph to the DOM


// this fucntion will retreve all of the historical data we need ATM
    async function fetchingPolydata(){

        const historicalDataURLFrom12Data = `${tweleveDataBaseURL}/quote?symbol=${tickerval}&apikey=${LeosapiKeyforTweleveData}`

        const data = await fetch(`${historicalDataURLFrom12Data}`)
        const dataobj = await data.json()
        // console.log(dataobj)
        // console.log(dataobj)
        const fiftyTwoWeekHigh = dataobj.fifty_two_week.high
        const fiftyTwoWeekLow = dataobj.fifty_two_week.low 
        const avgVolume = dataobj.average_volume
        const openPrice = dataobj.open
        const preClose = dataobj.previous_close
        const tradingRange = dataobj.fifty_two_week.range
        const percentChange = dataobj.percent_change

        return { fiftyTwoWeekHigh, fiftyTwoWeekLow, avgVolume, openPrice, preClose, tradingRange, percentChange }
    };  
    // console.log(fetchingPolydata()); 
    // fetchingPolydata().then(data => console.log(data))    
    
})