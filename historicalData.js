window.addEventListener('DOMContentLoaded', () => {
    // console.log("hello")


    const LeosapiKeyforPolygon = "KcvZeL7kY8MCWPBjov6DbC4adwjjuWf2"
    const poloyBaseURL = "https://api.polygon.io/"
    const ticker = "GME"



    const LeosapiKeyforTweleveData = "4fa2fb4f065046a7a1904ed616c5ec53";
    const tweleveDataBaseURL = `https://api.twelvedata.com`

    const LEOsapiKryforAlphaVantage = `MDALAPN8VGQ1J9CY`
    const baseURLForAlphvantage = 'https://www.alphavantage.co/'


    const ctx = document.getElementById('myChart').getContext('2d');
// this all the functions for get graph data 
    const graphData = async () => {
        let dateData = [];
        let priceData = [];
        const response = await fetch(`${baseURLForAlphvantage}query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${LEOsapiKryforAlphaVantage}&datatype=csv`)
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
    const getGraph = async () => {
        const data = await graphData()
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [...data.dateData],
                datasets: [{
                    label: `${ticker}`,
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

// getGraph()

    
    
    // const fetchingPolydata = async () =>{
    //     const data = await fetch(`${poloyBaseURL}v3/reference/tickers/${ticker}?apiKey=${putyourkeyHEre}`)
    //     const dataobj = await data.json()
    //     return dataobj
    // }  
    
    // fetchingPolydata().then(data => console.log(data));
})