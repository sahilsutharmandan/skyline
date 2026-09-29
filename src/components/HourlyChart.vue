<template>
  <div class="card chart-container" v-if="chartData">
    <h3>Next 24 Hours</h3>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
)

const props = defineProps({
  hourly: { type: Object, default: null },
  unit: { type: String, default: 'C' }
})

function convertTemp(val) {
  if (props.unit === 'F') return Math.round(val * 9 / 5 + 32)
  return Math.round(val)
}

const chartData = computed(() => {
  if (!props.hourly) return null
  const times = props.hourly.time.slice(0, 24)
  const temps = props.hourly.temperature_2m.slice(0, 24)

  return {
    labels: times.map((t) => {
      const d = new Date(t)
      return d.getHours().toString().padStart(2, '0') + ':00'
    }),
    datasets: [
      {
        label: `Temperature (°${props.unit})`,
        data: temps.map(convertTemp),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5
      }
    ]
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.parsed.y}°${props.unit}`
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        maxTicksLimit: 12,
        color: '#94a3b8'
      }
    },
    y: {
      grid: { color: 'rgba(148, 163, 184, 0.15)' },
      ticks: {
        color: '#94a3b8',
        callback: (val) => `${val}°`
      }
    }
  }
}))
</script>
