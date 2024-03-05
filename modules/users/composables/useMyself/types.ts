import type { User } from '@/modules/users/entities/User/User'

export interface MyselfContextProvider {
  user: Ref<User | undefined>
  loading: Ref<boolean>
}
