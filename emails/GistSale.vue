<script setup lang="ts">
import { ETailwind, EHtml, EHead, EBody, EContainer, EHeading, EText } from 'vue-email'
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
  }>(),
  {
    name: 'Dev',
  },
)
</script>

<template>
  <ETailwind>
    <EHtml>
      <EHead />
      <EBody class="bg-white my-auto mx-auto font-sans">
        <EContainer
          class="border border-solid border-[#eaeaea] p-[20px] md:p-7 rounded my-[40px] mx-auto max-w-[465px]"
        >
          <EHeading class="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            Compra aprovada!
          </EHeading>

          <EText class="text-black text-[14px] leading-[24px]"> Olá {{ props.name }}, parabéns pela compra! </EText>
        </EContainer>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
