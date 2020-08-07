module.exports = {
  promiseAllTable: (commit, { promises, table }) => {
    Promise.all(promises)
      .then(res => {
        const datas = res.map(({ data }) => data)
        commit('SET', { data: datas, key: table })
      })
      .catch(err => {
        commit('SET', { data: err, key: 'err' })
        commit('SET', { data: true, key: 'error' })
      })
      .finally(() => commit('SET', { data: false, key: 'fetching' }))
  },
  promiseTable: (commit, { promise, table, }) => {
    commit('SET', { data: true, key: 'fetching' })
    promise
      .then(res => {
        commit('SET', { data: res.data, key: table })
      })
      .catch(err => {
        commit('SET', { data: err, key: 'err' })
        commit('SET', { data: true, key: 'error' })
      })
      .finally(() => commit('SET', { data: false, key: 'fetching' }))
  },
  createHashTable: (items) => {
    let table = {}
    items.forEach(({ id, nome }) => {
      table[id] = nome
    })
    return table
  }
}