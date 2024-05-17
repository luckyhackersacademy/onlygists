## `onlygists`

Share and monetize code snippets. Earn extra income with the codes you make on a daily basis.  
This is the source code to my course called: [`NuxtExtreme`](https://luckyhackers.academy/course/nuxt-extreme)

### Setup

```sh
# instal deps
yarn install

# run local
yarn dev
```

### Test payments locally

You'll need to install [stripe-cli](https://docs.stripe.com/stripe-cli/overview) and run

```sh
# to authenticate with your account
stripe login

# to bypass events to your local machine
stripe listen --forward-to localhost:3000/api/webhooks/payment
```