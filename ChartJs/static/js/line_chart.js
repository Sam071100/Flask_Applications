var ctx1 = document.getElementById("myChart1");

    d3
  .csv("/static/file/line_cases.csv")
  .then(makeChart);
  //read in data
  function makeChart(players) {
    var month = players.map(function(d) {return d.date;});
    var value = players.map(function(d) {return d.cumulative_cases;});
    var province = players.map(function(d) {return d.province;});
    var ab_val = []
    var BC_val = []
    var mb_val = []
    var nb_val = []
    var nl_val = []

    // get unique value of array
    function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
      }
    var mon_unique = month.filter( onlyUnique );

    province.forEach((pro, index) => {
      if (pro =="Alberta") {
      ab_val.push(value[index]);
    } else if (pro =="BC") {
      BC_val.push(value[index]);
    } else if (pro =="Manitoba") {
      mb_val.push(value[index]);
    } else if (pro =="New Brunswick") {
      nb_val.push(value[index]);
    }
     else {
      nl_val.push(value[index]);
    }
    });

    // Line chart
    new Chart(ctx1, {
  type: 'line',
  data: {
    labels: mon_unique,
    datasets: [{
        data: ab_val,
        label: "Alberta",
        borderColor: "#3e95cd",
        fill: false
      }, {
        data: BC_val,
        label: "BC",
        borderColor: "#8e5ea2",
        fill: false
      }, {
        data: mb_val,
        label: "Manitoba",
        borderColor: "#3cba9f",
        fill: false
      }, {
        data: nb_val,
        label: "New Brunswick",
        borderColor: "#e8c3b9",
        fill: false
      }, {
        data: nl_val,
        label: "NL",
        borderColor: "#c45850",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Cumulative positive Cases of COVID in provinces of Canada'
    },
    hover: {
					mode: 'index',
					intersect: true
				},
  }
});
}