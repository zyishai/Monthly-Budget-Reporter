<script>
  import { dateview } from '../stores/dateview';
  const months = [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר'
  ];
  const changeMonth = e => dateview.changeMonth(e.target.value);
</script>

<div class="flex items-center {$$props.class}">
  <span class="font-bold tracking-wide">
    <select 
      class="appearance-none outline-none text-center font-bold tracking-wide border-b-2 border-dotted border-black"
      value={$dateview.month}
      on:input="{changeMonth}">
      {#each months as month, index}
        <option value="{index + 1}">{month}</option>
      {/each}
    </select>
     {$dateview.year}
  </span>
</div>