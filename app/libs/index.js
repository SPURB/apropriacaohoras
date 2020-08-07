export default {
  splitDate (date) {
    let sDate = date.split('-')
    sDate = {
      sYear: sDate[0],
      sMonth: sDate[1],
      sDay: sDate[2]
    }
    return sDate
  },
  isWeekend (date) {
    let data = this.splitDate(date)
    const day = +data.sDay.padStart(2, '')
    const month = +data.sMonth.padStart(2, '')
    const year = +data.sYear

    let then = new Date(year, month - 1, day)

    if (then.getDay() === 6 || then.getDay() === 0) {
      return true
    } else {
      return false
    }
  },
  currentDate () {
    const today = new Date()
    const cDay = `${today.getDate()}`.padStart(2, '0')
    const cMonth = `${today.getMonth() + 1}`.padStart(2, '0')
    const cYear = today.getFullYear()
    const date = {
      cMonth,
      cDay,
      cYear
    }
    return date
  },
  separarArray (arr, tamanho) {
    let novoArray = []
    let i = 0
    while (i < arr.length) {
      novoArray.push(arr.slice(i, i + tamanho).map(a => a.nome))
      i += tamanho
    }
    if (novoArray.length > 1) {
      novoArray = novoArray.map(n => {
        while (n.length != 4) {
          n.push('')
        }
        return n
      })
    }
    return novoArray
  },
  arrayIntersect (primeira, segunda, terceira) {
    let arr_join = [],
      arr = primeira.map((res, i) => {
        arr_join.push(res)
        if (segunda[i]) {
          arr_join.push(segunda[i])
        }
        if (terceira[i]) {
          arr_join.push(terceira[i])
        }

        return arr_join
      })
    return arr[0]
  }
}
