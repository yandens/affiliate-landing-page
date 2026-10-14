<script setup lang="ts">
import { calculator, content } from '~/data/landing'
import { clampOrderValue, clampSales } from '~/composables/useCommissionCalculator'

const copy = content.slip
const CUSTOM = 'custom'

const { sales, orderValue, result } = useCommissionCalculator()

const presetOptions = [
  ...calculator.orderValuePresets.map(preset => ({ label: preset.label, value: String(preset.value) })),
  { label: copy.customOption, value: CUSTOM }
]

const isPreset = (value: number) => calculator.orderValuePresets.some(preset => preset.value === value)

const orderChoice = ref(isPreset(orderValue.value) ? String(orderValue.value) : CUSTOM)
const customOrderValue = ref(orderValue.value)

// The number input emits null or NaN while the field is being edited, so only
// finite values reach the shared state.
const salesInput = computed({
  get: () => sales.value,
  set: (value: number | null | undefined) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      sales.value = clampSales(value)
    }
  }
})

const customInput = computed({
  get: () => customOrderValue.value,
  set: (value: number | null | undefined) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      customOrderValue.value = clampOrderValue(value)
    }
  }
})

watch([orderChoice, customOrderValue], ([choice, custom]) => {
  orderValue.value = choice === CUSTOM ? custom : Number(choice)
})

const salesValueText = computed(() => copy.salesValueText.replace('{count}', String(sales.value)))
const salesBreakdown = computed(() => `${result.value.sales} × ${formatIDR(result.value.orderValue)}`)

const yearlyText = computed(() => copy.yearlyText.replace('{amount}', formatIDR(result.value.yearly)))

const rows = computed(() => [
  { label: copy.tierLabel, value: result.value.tier.name },
  { label: copy.rateLabel, value: `${result.value.tier.rate}%` },
  { label: copy.salesTotalLabel, hint: salesBreakdown.value, value: formatIDR(result.value.salesValue) }
])

const idrFormat: Intl.NumberFormatOptions = { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }
</script>

<template>
  <div class="rounded-xl bg-default p-6 shadow-xl ring ring-default shadow-slate-900/5">
    <h2 class="text-lg font-bold text-highlighted">
      {{ copy.title }}
    </h2>

    <div class="mt-5 space-y-5">
      <UFormField
        :label="copy.salesLabel"
        name="sales"
      >
        <div class="flex items-center gap-4">
          <USlider
            v-model="sales"
            :min="calculator.minSales"
            :max="calculator.maxSales"
            :aria-label="copy.salesLabel"
            :aria-valuetext="salesValueText"
            size="lg"
            class="min-w-0 flex-1"
          />
          <UInputNumber
            v-model="salesInput"
            :min="calculator.minSales"
            :max="calculator.maxSales"
            :increment="false"
            :decrement="false"
            :ui="{ base: 'px-3 text-center tabular-nums' }"
            class="w-20 shrink-0"
          />
        </div>
      </UFormField>

      <URadioGroup
        v-model="orderChoice"
        :legend="copy.orderValueLabel"
        :items="presetOptions"
        variant="card"
        indicator="hidden"
        orientation="horizontal"
        :ui="{
          fieldset: 'grid grid-cols-2 gap-2 sm:grid-cols-4',
          item: 'justify-center p-2.5 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/10',
          label: 'text-sm whitespace-nowrap tabular-nums',
          legend: 'mb-1.5 text-sm'
        }"
      />

      <UFormField
        v-if="orderChoice === CUSTOM"
        :label="copy.customLabel"
        name="custom-order-value"
      >
        <UInputNumber
          v-model="customInput"
          :min="calculator.minOrderValue"
          :max="calculator.maxOrderValue"
          :step="calculator.orderValueStep"
          :format-options="idrFormat"
          locale="id-ID"
          :ui="{ base: 'tabular-nums' }"
          class="w-full"
        />
      </UFormField>
    </div>

    <div
      class="my-6 -mx-6 slip-tear"
      aria-hidden="true"
    />

    <div aria-live="polite">
      <dl class="space-y-2.5">
        <div
          v-for="row in rows"
          :key="row.label"
          class="flex items-baseline gap-2"
        >
          <dt class="text-sm font-medium text-muted">
            {{ row.label }}
            <span
              v-if="row.hint"
              class="block text-xs tabular-nums"
            >{{ row.hint }}</span>
          </dt>
          <span
            class="min-w-4 flex-1 border-b border-dotted border-accented"
            aria-hidden="true"
          />
          <dd class="text-sm font-semibold text-highlighted tabular-nums">
            {{ row.value }}
          </dd>
        </div>
      </dl>

      <p class="mt-6 text-sm font-medium text-muted">
        {{ copy.monthlyLabel }}
      </p>
      <p class="mt-1">
        <span class="-mx-2 inline-block rounded-md bg-amber-300 px-2 text-4xl leading-tight font-semibold tracking-tight text-highlighted tabular-nums sm:text-5xl lg:text-4xl xl:text-5xl">
          {{ formatIDR(result.monthly) }}
        </span>
      </p>
      <p class="mt-2 text-sm text-muted tabular-nums">
        {{ yearlyText }}
      </p>
    </div>

    <p class="mt-5 text-sm text-muted">
      {{ copy.footnote }}
    </p>
  </div>
</template>
