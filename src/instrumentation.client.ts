import { initBotId } from 'botid/client/core'

const protectedRoutes = [
  {
    path: '/api/form-submissions',
    method: 'POST',
  },
]

initBotId({
  protect: protectedRoutes,
})
