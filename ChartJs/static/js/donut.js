var ctx2 = document.getElementById("myChart2");

d3
.csv("/static/file/Bar_cases.csv")
.then(makeChart);

function makeChart(players) {
  var date = players.map(function(d) {return d.date_active;});
  var month_end = players.map(function(d) {return d.EndOfMonth;});
  var province = players.map(function(d) {return d.province;});
  var value = players.map(function(d) {return d.cumulative_cases;});

  // get unique value of array
  function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
    }
  var pro_unique = province.filter( onlyUnique );
  var ab_val = []
  var BC_val = []
  var mb_val = []
  var nb_val = []
  var nl_val = []

  date.forEach((i_dt, index) => {
    if (i_dt == '2020-06-20' && province[index] =="Quebec") {
    ab_val.push(value[index]);
  } else if (i_dt == '2020-06-20' && province[index] =="Ontario") {
    BC_val.push(value[index]);
  } else if (i_dt == '2020-06-20' && province[index] =="Alberta") {
    mb_val.push(value[index]);
  } else if (i_dt == '2020-06-20' && province[index] =="BC") {
    nb_val.push(value[index]);
  }
   else if (i_dt == '2020-06-20' && province[index] =="Saskatchewan") {
   nl_val.push(value[index]);
  }
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

  var randomScalingFactor = function() {
          return Math.round(Math.random() * 100);
      };
      
      var config = new Chart(ctx2, {
          type: 'doughnut',
          data: {
              datasets: [{
                  data: [
                      ab_val,
                      BC_val,
                      mb_val,
                      nb_val,
                      nl_val,
                  ],
                  backgroundColor: [
                      window.chartColors.red,
                      window.chartColors.orange,
                      window.chartColors.yellow,
                      window.chartColors.green,
                      window.chartColors.blue,
                  ],
                  label: 'Dataset 1'
              }],
              labels: pro_unique
          },
          options: {
              responsive: true,
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Cumulative positive Cases of COVID in provinces of Canada'
              },
              animation: {
                  animateScale: true,
                  animateRotate: true
              }
          }
      });

      window.onload = function() {
          var ctx = document.getElementById('chart-area').getContext('2d');
          window.myDoughnut = new Chart(ctx, config);
      };

}