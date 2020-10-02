<script>
  import { getMonthlyStats } from '../stores/stats';

  const stats = getMonthlyStats();
</script>

<p>Monthly Total: {$stats.total}</p>
<p>Monthly Difference: {$stats.diff}</p>