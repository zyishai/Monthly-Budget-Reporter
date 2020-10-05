<script>
  import { beforeUpdate } from 'svelte';

  beforeUpdate(() => {
    google.charts.setOnLoadCallback(drawChart);
  });

  function drawChart() {
    const avg = categories.length &&  Math.round(categories.reduce((sum, category) => sum + +category.maxExpense, 0) / categories.length);
    data = google.visualization.arrayToDataTable([
      ['קטגוריה',
      {label: 'הוצאות בפועל', type: 'number'},
      {role: 'style'},
      {label: 'תקרה', type: 'number'},
      ],
      ...categories.map(category => ([
        category.name, 
        category.total,
        category.diff >= 0 ? '#96dd96' : '#ff5656',
        category.maxExpense,
      ]))
    ]);

    const options = {
      vAxis: {
        title: 'סכום ב₪',
        viewWindow: {
          max: avg
        }
      },
      hAxis: {
        direction: -1,
      },
      legend: {
        position: 'none'
      },
      bar: {
        groupWidth: '70%'
      },
      colors: ['#595959']
    };

    chart = new google.visualization.ColumnChart(chartContainer);
    chart.draw(data, options);
  }

  export let categories;
  let chartContainer;
  let data;
  let chart;
</script>

<style global>
  svg text[text-anchor="middle"] {
    direction: rtl !important;
  }
</style>

<div bind:this={chartContainer} class={$$props.class}></div>