<template>
  <div class="card currency-converter">
    <h3>Currency Converter</h3>
    <div class="converter-row">
      <div class="converter-field">
        <label>Amount</label>
        <input
          v-model.number="amount"
          type="number"
          min="0"
          class="input"
          @input="convert"
        />
      </div>
      <div class="converter-field">
        <label>From</label>
        <select v-model="fromCurrency" class="input" @change="convert">
          <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <div class="converter-field">
        <label>To</label>
        <select v-model="toCurrency" class="input" @change="convert">
          <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
    </div>
    <div v-if="result !== null" class="converter-result">
      {{ amount }} {{ fromCurrency }} = {{ result }} {{ toCurrency }}
    </div>
    <div v-if="error" class="converter-error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  defaultFrom: { type: String, default: 'USD' },
  defaultTo: { type: String, default: 'EUR' }
})

const currencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY',
  'SEK', 'NOK', 'MXN', 'INR', 'BRL', 'KRW', 'ZAR', 'TRY',
  'PLN', 'THB', 'IDR', 'PHP', 'AED', 'ARS', 'CLP', 'EGP',
  'NGN', 'NZD', 'SGD', 'HKD', 'CZK', 'DKK'
]

const amount = ref(100)
const fromCurrency = ref(props.defaultFrom)
const toCurrency = ref(props.defaultTo)
const result = ref(null)
const error = ref('')

async function convert() {
  if (!amount.value || amount.value <= 0) {
    result.value = null
    return
  }
  if (fromCurrency.value === toCurrency.value) {
    result.value = amount.value.toFixed(2)
    return
  }
  error.value = ''
  try {
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?from=${fromCurrency.value}&to=${toCurrency.value}`
    )
    const data = await res.json()
    if (data.rates && data.rates[toCurrency.value]) {
      result.value = (amount.value * data.rates[toCurrency.value]).toFixed(2)
    } else {
      error.value = 'Conversion not available'
      result.value = null
    }
  } catch {
    error.value = 'Failed to fetch exchange rate'
    result.value = null
  }
}

onMounted(convert)
</script>
