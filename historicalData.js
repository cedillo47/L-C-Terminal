window.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("myChart").getContext("2d");
  const form = document.getElementById("tickerForm");

  const tickervalue = document.getElementById("tickerID");
  const historicalDiv = document.getElementById("historicalDiv");
  const fiftyTwoWeekHli = document.getElementById("fiftyTwoWeekHigh");
  const fiftyTwoWeekli = document.getElementById("fiftyTwoWeekLow");
  const avgVolli = document.getElementById("avgVolume");
  const openli = document.getElementById("openPrice");
  const precloli = document.getElementById("preClose");
  const rangeli = document.getElementById("tradingRange");
  const percentChangeli = document.getElementById("percentChange");

  const newsHeader = document.getElementById("newsHeader");

  const security = document.getElementById("secNameAndPrice");

  const testNewsDiv = document.getElementById("newsContainerTest");

  const hisHeader = document.getElementById("hisH");

  let tickerval;

  const LeosapiKeyforPolygon = "KcvZeL7kY8MCWPBjov6DbC4adwjjuWf2";
  const poloyBaseURL = "https://api.polygon.io/";

  const LeosapiKeyforTweleveData = "4fa2fb4f065046a7a1904ed616c5ec53";
  const tweleveDataBaseURL = `https://api.twelvedata.com`;

  const LEOsapiKryforAlphaVantage = `MDALAPN8VGQ1J9CY`;
  const baseURLForAlphvantage = "https://www.alphavantage.co/";

  let stockChart = null;

  const message = document.getElementById("StartMessage");

  let minPrice;
  let maxPrice;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    message.style.display = "none";
    tickerval = tickervalue.value;

    const historyData = await fetchingPolydata();
    const dataobj = await graphData();
    const nD = await fetchingPolydataNews();

    testNewsDiv.innerHTML = "";
    for (const news in nD) {
      let newsArtical = document.createElement("div");
      newsArtical.className = "newsBlock";
      newsArtical.id = `${news}`;
      newsArtical.innerHTML = `<h5>${nD[news].title} by ${nD[news].author}</h5>`;
      testNewsDiv.appendChild(newsArtical);
    }

    let newDivChildren = document.getElementById("newsContainerTest").children;

    for (let i = 0; i < newDivChildren.length; i++) {
      let node = document.getElementById(`${newDivChildren[i].id}`);
      node.addEventListener("click", () => {
        window.open(`${nD[node.id].url}`, "_blank");
      });

      $(`#${node.id}`).hover(
        () => {
          makeBoxBorderRed(node);
        },
        () => {
          turnBoxBack(node);
        }
      );
    } // this too to a helper fucntion

    hisHeader.innerText = `Quick Facts`;
    fiftyTwoWeekHli.innerText = `The 52 week high of ${tickerval} is ${turnNumtoTenthplace(
      historyData.fiftyTwoWeekHigh
    )}`;
    fiftyTwoWeekli.innerText = `The 52 week low of ${tickerval} is ${turnNumtoTenthplace(
      historyData.fiftyTwoWeekLow
    )}`;
    avgVolli.innerText = `The average volume of ${tickerval} is ${turnNumtoTenthplace(
      historyData.avgVolume
    )}`;
    // openli.innerText = `The opening price of ${tickerval} is ${historyData.openPrice}`
    precloli.innerText = `${tickerval} previous close was ${turnNumtoTenthplace(
      historyData.preClose
    )}`;
    // rangeli.innerText = `the current trading range of ${tickerval} is ${minPrice.toString()} - ${maxPrice.toString()}`
    percentChangeli.innerText = `The percent change from yesterday's close to todays open is ${turnNumtoTenthplace(
      historyData.percentChange
    )} percent`;

    security.innerText = `${
      historyData.name
    } opened today at ${turnNumtoTenthplace(historyData.openPrice)}`;

    newsHeader.innerText = "News";

    getGraph(dataobj);
    rangeli.innerText = `The current trading range of ${tickerval} is from a low of ${minPrice.toString()} to high of ${maxPrice.toString()}`;
  });

  const baseURLforAlpha = "https://www.alphavantage.co/query?";
  const timeSeriesDailyAPI = "TIME_SERIES_DAILY_ADJUSTED";

  /// THIS GETS GRAPH DATA

  async function graphData() {
    let dateData = [];
    let priceData = [];
    const response = await fetch(
      `${baseURLforAlpha}function=${timeSeriesDailyAPI}&symbol=${tickerval}&apikey=${LEOsapiKryforAlphaVantage}&datatype=csv`
    );

    const data = await response.text();

    const csvData = Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
    });
    for (let i = csvData.data.length - 1; 0 <= i; i--) {
      dateData.push(csvData.data[i].timestamp);
      priceData.push(csvData.data[i].open);
    }
    return { priceData, dateData };
  }

  /// THIS GETS THE GRAPH

  async function getGraph(input) {
    const data = input;
    minPrice = Math.min(...data.priceData);
    maxPrice = Math.max(...data.priceData);

    if (stockChart) {
      stockChart.data.datasets[0].data = [...data.priceData];
      stockChart.data.datasets[0].labels = [...data.dateData];
      stockChart.data.datasets[0].label = tickerval;
      stockChart.update();
      return;
    }
    stockChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [...data.dateData],
        datasets: [
          {
            label: `${tickerval}`,
            data: [...data.priceData],
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  /// THIS GETS THE QUNTATATIVE DATA

  // make this a good app

  async function fetchingPolydata() {
    // try {
    const historicalDataURLFrom12Data = `${tweleveDataBaseURL}/quote?symbol=${tickerval}&apikey=${LeosapiKeyforTweleveData}`;
    const data = await fetch(`${historicalDataURLFrom12Data}`);
    const dataobj = await data.json();
    
    return {
        fiftyTwoWeekHigh : dataobj.fifty_two_week.high,
        fiftyTwoWeekLow : dataobj.fifty_two_week.low,
        avgVolume:  dataobj.average_volume,
        openPrice: dataobj.open,
        preClose: dataobj.previous_close,
        tradingRange: dataobj.fifty_two_week.range,
        percentChange: dataobj.percent_change,
        name: dataobj.name,
    };
    // } catch (error) {
    // -> we might be able to use these too our advantage -> we might have to show to stages -> we can have a function that is fired that will fetch data and stat- > if for some re
    // should
    // return "could not handle request"
    // };
  }

  /// TURNS NUM TO TENTH PLACE

  function turnNumtoTenthplace(num) {
    return Math.round(100 * num) / 100;
  }

  /// NEWS DATA
  // this function is good
  async function fetchingPolydataNews() {
    let news = {};
    const data = await fetch(
      `${poloyBaseURL}v2/reference/news?ticker=${tickerval}&order=asc&limit=6&sort=published_utc&apiKey=${LeosapiKeyforPolygon}`
    );
    const dataobj = await data.json();
    const dataWeNeed = dataobj.results;

    for (let i = 0; i < dataobj.results.length; i++) {
      news[`news${i + 1}`] = {
        title: dataWeNeed[i].title,
        description: dataWeNeed[i].description,
        url: dataWeNeed[i].article_url,
        author: dataWeNeed[i].author,
      };
    }
    return news;
  }

  /// trying to implaments live stockprice feature;
  // only seems to work with QQQ

  // streach feture
  const callingLivePrice = async () => {
    const livePriceSocket = new WebSocket(
      `wss://ws.twelvedata.com/v1/quotes/price?apikey=${LeosapiKeyforTweleveData}`
    );

    livePriceSocket.onopen = function (e) {
      livePriceSocket.send(
        JSON.stringify({
          action: "subscribe",
          params: {
            symbols: `QQQ`,
          },
        })
      );
    };

    livePriceSocket.onmessage = (e) => {
      console.log(e);
      alert(`[message] Data received from server: ${e.data}`);
    };
  };
  // callingLivePrice();
});

function turnBoxBack(box) {
  box.style.color = "black";
  box.style.textDecoration = "none";
}

function makeBoxBorderRed(box) {
  box.style.color = "blue";
  box.style.cursor = "pointer";
  box.style.textDecoration = "underline";
}
