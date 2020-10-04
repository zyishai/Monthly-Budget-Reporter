<script>
  import Chart from 'chart.js';
  import Number from '../components/Number.svelte';
  import { getMonthlyStats } from '../stores/stats';

  const stats = getMonthlyStats();
  let diffText = 'חיסכון', 
      diffSign = '+', 
      saving = true, 
      deficit = false;
  $: saving = $stats.diff >= 0;
  $: deficit = $stats.diff < 0;
  $: diffText = saving
    ? 'חיסכון'
    : 'גירעון';
  $: diffSign = saving ? '+' : '';

  $: options = {
    type: 'horizontalBar',
    data: {
      labels: $stats.categories.map(category => category.name),
      datasets: [
        {
          label: "תקרה",
          data: $stats.categories.map(category => category.maxExpense),
          backgroundColor: '#000',
          barThickness: 15,
          order: 1
        },
        {
          label: "הוצאות בפועל",
          data: $stats.categories.map(category => category.total),
          backgroundColor: i => ($stats.categories.length && $stats.categories[i.dataIndex].total > $stats.categories[i.dataIndex].maxExpense) ? '#ff9696' : '#96dd96',
          barThickness: 15,
          order: 2
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      events: [],
      legend: {
        display: false,
        rtl: true,
      },
      tooltips: {
        rtl: true,
        intersect: false,
        position: 'nearest',
        mode: 'nearest'
      },
      scales: {
        xAxes: [{
          ticks: {
            stepSize: 100
          }
        }]
      }
    }
  };
  let canvas;
  let chart;
  $: canvas ? chart = new Chart(canvas, options) : null;
</script>

<style lang="postcss">
  .saving {
    @apply text-green-500;
  }
  .deficit {
    @apply text-red-500;
  }
</style>

<div class="flex-1 flex flex-col items-center p-4">
  <h1 class="self-start text-xl font-medium">
    סטטיסטיקה חודשית
  </h1>
  <div class="flex gap-x-5 mb-8">
    <div class="flex flex-col items-center">
      <h2 dir="ltr" class="text-4xl font-bold">
        <Number currency="₪">{$stats.total}</Number>
      </h2>
      <p class="text-sm font-medium tracking-wide">סה״כ הוצאות חודשיות</p>
    </div>
    <div class="flex flex-col items-center" class:saving class:deficit>
      <h2 dir="ltr" class="text-4xl font-bold">
        {diffSign} <Number currency="₪">{$stats.diff}</Number>
      </h2>
      <p class="text-sm font-medium tracking-wide">סה״כ {diffText}</p>
    </div>
  </div>
  <div class="relative flex-1 self-stretch overflow-x-auto">
    <canvas bind:this={canvas}></canvas>
  </div>
</div>