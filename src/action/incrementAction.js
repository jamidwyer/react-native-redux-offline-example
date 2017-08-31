export const incrementAction = (count) => ({
  type: 'COUNT_INC',
  payload: { count },
  meta: {
    offline: {
      effect: { url: '...', method: 'POST', body: { count } },
    //  commit: { type: 'COUNT_INC_COMMIT', meta: { count } },
      rollback: { type: 'COUNT_INC_ROLLBACK', meta: { count } },
    }
  }
});
