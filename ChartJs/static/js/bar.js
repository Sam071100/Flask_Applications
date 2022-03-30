var ctx = document.getElementById("myChart");

d3
    .csv("/static/file/Bar_cases.csv")
    .then(makeChart);
    function makeChart(data) {
      var country = data.map(function(d) {return d.province;});
      var value = data.map(function(d) {return d.active_cases;});
      new Chart(ctx, {
        type: 'bar',
          data: {
            labels: country,
            datasets: [
              {
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: value
              }
            ]
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Top active cases of COVID19 in Canada 5 provinces'
            }
          }
      });
    }
