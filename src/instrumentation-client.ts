import { initBotId } from 'botid/client/core'

initBotId({
  protect: [
    { path: '/api/form-submissions', method: 'POST' },
    { path: '/api/downloads/ipd-04', method: 'GET' },
    { path: '/api/downloads/ipd-referral-form', method: 'GET' },
  ],
})
