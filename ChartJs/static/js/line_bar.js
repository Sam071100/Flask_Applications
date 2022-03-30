var ctx3 = document.getElementById("myChart3");

d3
.csv("/static/file/Line_Bar.csv")
.then(makeChart);

function makeChart(players) {
var date = players.map(function(d) {return d.date;});
var case1 = players.map(function(d) {return d.cumulative_cases;});
var recover = players.map(function(d) {return d.cumulative_recovered;});
var deaths = players.map(function(d) {return d.cumulative_deaths;});
var case_mean = players.map(function(d) {return d.active_cases_mean;});
var province = players.map(function(d) {return d.province;});

// get unique value of array
function onlyUnique(value, index, self) {
return self.indexOf(value) === index;
  }
var date_unique = date.filter( onlyUnique );
var ab_case = []
var ab_recover = []
var ab_deaths = []
var ab_case_mean = []
var ab_case_log = []
var ab_recover_log = []

province.forEach((i_pro, index) => {
  if (i_pro =="Alberta") {
  ab_case.push(case1[index]);
  ab_recover.push(recover[index]);
  ab_deaths.push(deaths[index]);
  ab_case_mean.push(case_mean[index]);
}
});
// take log on ab_case, ab_recover
ab_case.forEach((i_ab, index) => {
    ab_recover_log.push(Math.log(ab_recover[index]));
    ab_case_log.push(Math.log(i_ab));
});

window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
  };
  new Chart(ctx3, {
  type: 'bar',
  data: {
      datasets: [{
          label: 'log on cumulative_cases in Alberta',
          backgroundColor: window.chartColors.red,
          data: ab_case_log,
          borderColor: 'white',
                  borderWidth: 2
      }, {
          label: 'log on cumulative_recovered in Alberta',
          backgroundColor: window.chartColors.green,
          data: ab_recover_log,
          borderColor: 'white',
                  borderWidth: 2
      },{
          label: 'cumulative_deaths in Alberta',
          backgroundColor: window.chartColors.purple,
          data: ab_deaths,
          borderColor: 'white',
                  borderWidth: 2
      },
      {
          label: 'Month average of active cases in Alberta',
          data: ab_case_mean,
          fill: false,
          borderColor:window.chartColors.blue,
          borderWidth: 2,
          // Changes this dataset to become a line
          type: 'line'
      }],
      labels: date_unique
  },
  options: {
    title: {
      display: true,
      text: 'Cumulative positive and revovered cases, deaths, and average of active cases change of COVID in provinces of Canada'
    },
    hover: {
          mode: 'index',
          intersect: true
        },
  }

      });
}