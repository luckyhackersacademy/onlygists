<script setup lang="ts">
import type { Address } from '@/modules/users/entities/Address/Address'

const props = defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'trigger-address-search')
}>()

const address = defineModel<Address>({
  require: true,
  default: {
    zipCode: '',
    number: '',
    street: '',
    city: '',
    state: '',
    neighborhood: '',
    complement: '',
  },
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col lg:flex-row gap-2 flex-1">
        <div class="flex flex-col gap-2 flex-1">
          <label for="cep">
            CEP
            <i v-if="props.loading" class="pi pi-spinner text-gray-500 animate-spin"></i>
          </label>
          <InputText
            placeholder="00000-000"
            @blur="() => emit('trigger-address-search')"
            id="cep"
            v-maska
            data-maska="#####-###"
            v-model="address.zipCode"
          />
        </div>

        <div class="flex flex-col gap-2 flex-1">
          <label for="number">Número</label>
          <InputText placeholder="42" v-model="address.number" id="street" />
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="city">Cidade</label>
        <InputText placeholder="São Paulo" v-model="address.city" id="city" />
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="state">Estado</label>
        <InputText placeholder="São Paulo" v-model="address.state" id="state" />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="neighborhood">Bairro</label>
        <InputText placeholder="Aclimação" v-model="address.neighborhood" id="neighborhood" />
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="complement">Estado</label>
        <InputText placeholder="Apto 22" v-model="address.complement" id="complement" />
      </div>
    </div>
  </div>
</template>
