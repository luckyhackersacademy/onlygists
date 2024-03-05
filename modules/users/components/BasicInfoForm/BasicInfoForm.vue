<script setup lang="ts">
import type { User } from '@/modules/users/entities/User/User'
import type { ZodFormattedError } from 'zod'

const props = defineProps<{
  errors?: ZodFormattedError<User>
}>()

const user = defineModel<User>({
  required: false,
  default: {
    name: '',
    site: '',
    bio: '',
    phone: '',
  },
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="name">Nome</label>
        <InputText id="name" placeholder="Igor Halfeld" v-model="user.name" />
        <small v-if="props.errors?.name">{{ props.errors?.name._errors[0] }}</small>
      </div>

      <div class="flex flex-col gap-2 flex-1">
        <label for="site">Site</label>
        <InputText id="site" placeholder="igorhalfeld.com" v-model="user.site" />
        <small v-if="props.errors?.site">{{ props.errors?.site._errors[0] }}</small>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="bio">Bio</label>
        <InputText id="bio" placeholder="Software Engineer" v-model="user.bio" />
        <small v-if="props.errors?.bio">{{ props.errors?.bio._errors[0] }}</small>
      </div>

      <div class="flex flex-col gap-2 flex-1">
        <label for="phone">Site</label>
        <InputText id="phone" placeholder="(99) 9 9999-9999" v-model="user.phone" />
        <small v-if="props.errors?.phone">{{ props.errors?.phone._errors[0] }}</small>
      </div>
    </div>
  </div>
</template>
