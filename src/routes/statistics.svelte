<script>
  import Chart from 'chart.js';
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
    type: 'bar',
    data: {
      labels: $stats.categories.map(category => category.name),
      datasets: [
        {
          label: "תקרה",
          data: $stats.categories.map(category => category.maxExpense),
          backgroundColor: '#ff9696',
          barThickness: 15
        },
        {
          label: "הוצאות בפועל",
          data: $stats.categories.map(category => category.total),
          backgroundColor: i => $stats.categories.length ? $stats.categories[i.dataIndex].color : '#000',
          barThickness: 20
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      events: [],
      legend: {
        rtl: true,
      },
      tooltips: {
        rtl: true
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
  <div class="flex gap-x-4 mb-8">
    <div class="flex flex-col items-center">
      <h2 dir="ltr" class="text-4xl font-bold">{$stats.total}</h2>
      <p class="text-sm font-medium tracking-wide">סה״כ הוצאות חודשיות</p>
    </div>
    <div class="flex flex-col items-center" class:saving class:deficit>
      <h2 dir="ltr" class="text-4xl font-bold">{diffSign} {$stats.diff}</h2>
      <p class="text-sm font-medium tracking-wide">סה״כ {diffText}</p>
    </div>
  </div>
  <div class="relative flex-1 overflow-auto">
    <canvas bind:this={canvas}></canvas>
  </div>
</div>