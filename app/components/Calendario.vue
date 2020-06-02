<template>
  <table class="calendario">
    <thead>
      <tr>
        <th colspan="7" data-cy="mes__atual">
          <button type="button" @click="monthInc(-1)" data-cy="prev__mes">
            <i class="icon icon-seta_esquerda"></i>
          </button>
          {{ `${decodeMonth(month)} &middot; ${year}` }}
          <button type="button" @click="monthInc(1)" data-cy="prox__mes">
            <i class="icon icon-seta_direita"></i>
          </button>
        </th>
      </tr>
      <tr>
        <th>DOM</th>
        <th>SEG</th>
        <th>TER</th>
        <th>QUA</th>
        <th>QUI</th>
        <th>SEX</th>
        <th>SÁB</th>
      </tr>
    </thead>
    <tbody id="tbody" ref="tbody">
      <tr :key="weekIndex" v-for="(week, weekIndex) in weeksThisMonth">
        <td
          :key="dayIndex"
          v-for="(day, dayIndex) in calendario(weekIndex)"
          :class="daysClassification(day)"
          :data-date="getFullData(formatDate(day))"
          v-html="formatDate(day)"
          @click="
            setMultipleData({
              event: $event,
              date: getFullData(formatDate(day))
            })
          "
          data-cy="select__data"
        >
          {{ day }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Lib from '@/libs'
import Horas from '@/services/api-horas'

export default {
  name: 'Calendario',
  data () {
    return {
      date: new Date(),
      months: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ],
      selection: null
    }
  },
  computed: {
    ...mapState('form-registrar-horas', {
      updateCalendario: state => state.updateCalendario,
      multipleData: state => state.multipleData
    }),
    ...mapState('usuario', {
      idusuario: state => state.id
    }),
    today: {
      get () {
        return this.date
      },
      set (newDate) {
        this.date = newDate
      }
    },
    todayWeekDay () {
      return this.today.getDay()
    },
    todayMonthDay () {
      return this.today.getDate()
    },
    month () {
      return this.today.getMonth()
    },
    year () {
      return this.today.getFullYear()
    },
    daysThisMonth () {
      return new Date(this.year, this.month + 1, 0).getDate()
    },
    weeksThisMonth () {
      return Math.ceil(this.daysThisMonth / 6)
    },
    firstWeekDay () {
      return new Date(this.year, this.month, 1).getDay() - 1
    }
  },
  watch: {
    updateCalendario (updateStatus) {
      if (updateStatus) {
        this.typeClass()
        this.TOGGLE_CALENDARIO_STATUS({ status: false })
      }
    }
  },
  updated () {
    this.typeClass()
    this.resetSelected()
  },
  mounted () {
    this.typeClass()
  },
  methods: {
    ...mapMutations('form-registrar-horas', [
      'TOGGLE_CALENDARIO_STATUS',
      'RESET_CALENDARIO'
    ]),
    ...mapActions('form-registrar-horas', ['setMultipleData']),
    calendario (weekIndex) {
      const totalDayMonth = this.daysThisMonth + this.firstWeekDay
      let day = []
      for (let dayIndex = 0; dayIndex <= totalDayMonth; dayIndex++) {
        if (dayIndex >= weekIndex * 7 && dayIndex <= (weekIndex + 1) * 7 - 1) {
          day.push(dayIndex)
        }
      }
      return day
    },
    resetSelected (event) {
      let calendario = this.$refs.tbody
      let dateIn = [] // var aux
      let allTds = [] // var aux

      // guarda o primeiro valor do array antes de mudar o mês
      const multipleDate = this.multipleData

      // remove todas as ocorrencias da class::selected
      calendario.childNodes.forEach(tr => {
        tr.childNodes.forEach(td => {
          if (td.classList.contains('selected')) td.classList.remove('selected')
          allTds.push(td)
        })
      })

      this.multipleData.forEach(data => {
        const el = document.querySelector(`[data-date~="${data}"]`)
        if (el) {
          el.classList.add('selected')
        }
      })
    },
    monthInc (inc) {
      let newMonth = this.month + inc
      this.today = new Date(this.year, newMonth, this.todayMonthDay)
    },
    decodeMonth (monthNumber) {
      return this.months[monthNumber]
    },
    daysClassification (monthday) {
      let out = []
      let thisday = new Date(this.year, this.month, monthday - 4)
      thisday.toLocaleString().substring(0, 10) ===
      new Date().toLocaleString().substring(0, 10)
        ? out.push('today')
        : false
      return out.toString()
    },
    formatDate (monthday) {
      if (monthday - this.firstWeekDay < 1) {
        return ''
      } else {
        return monthday - this.firstWeekDay
      }
    },
    getFullData (day) {
      return (
        this.year +
        '-' +
        `${this.month + 1}`.padStart(2, '0') +
        '-' +
        `${day}`.padStart(2, '0')
      )
    },
    typeClass () {
      let tbody = this.$refs.tbody
      const currentDate = Lib.currentDate()
      const now = new Date()
      const currentYear = now.getFullYear().toString()
      const current = `${currentYear}-${currentDate.cMonth}-${currentDate.cDay}`

      tbody.childNodes.forEach(tr => {
        tr.childNodes.forEach(td => {
          const tDate = td.dataset.date
          const sDate = Lib.splitDate(td.dataset.date)
          const isWeekend = Lib.isWeekend(tDate)

          const currentTdDate = `${sDate.sYear}-${sDate.sMonth}-${sDate.sDay}`
          const isFuture = this.$moment(current).isBefore(currentTdDate)

          td.classList.remove('warning')
          td.classList.remove('success')
          td.classList.remove('danger')

          if (!isFuture && sDate.sDay !== '00' && isWeekend === false) {
            Horas.getStatus(this.idusuario, tDate)
              .then(res => td.classList.add(res.data.type))
              .catch(err => new Error(err))
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
table {
  border-spacing: 1rem;
  table-layout: fixed;
  & * {
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }
  thead {
    tr th[colspan] {
      font-size: 1.25rem;
      font-weight: normal;
      text-shadow: $s-1-2-48;
      text-transform: uppercase;
      button {
        border: none;
        @include bg-white-alpha(0.1);
        border-radius: 100%;
        padding: 0;
        color: inherit;
        cursor: pointer;
        &:nth-child(1) {
          float: left;
        }
        &:nth-child(2) {
          float: right;
        }
        .icon {
          font-size: 1.5rem;
          line-height: 1.4rem;
          vertical-align: -2px;
        }
        &:hover {
          @include bg-white-alpha(0.2);
        }
      }
    }
    tr th:not([colspan]) {
      font-weight: normal;
      @include color-white-alpha(0.4);
      &:first-child,
      &:last-child {
        @include color-white-alpha(0.1);
      }
    }
  }
  tbody {
    tr {
      td {
        @include bg-white-alpha(0.04);
        border-radius: 0.25rem;
        line-height: calc(2.5rem - 8px);
        text-align: center;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        cursor: pointer;
        box-shadow: 0 0 0 transparent;
        transition: all ease-in 0.1s;
        &:nth-child(1),
        &:nth-child(7) {
          @include color-white-alpha(0.4);
        }
        &:hover {
          @include bg-white-alpha(0.08);
        }
        &.today {
          border-bottom: 5px solid #89afab !important;
        }
        &.filled {
          background-color: $verde;
          text-shadow: $s-1-2-48;
        }
        &.missingAll {
          background-color: $vermelho;
          text-shadow: $s-1-2-48;
        }
        &.missingSome {
          background-color: $laranja;
          text-shadow: $s-1-2-48;
        }
        &.selected {
          background-color: $verde-escuro;
          transform: scale(1.2);
          box-shadow: $s-2-4-48;
        }
      }
    }
  }
}

.danger {
  border: 1px dashed rgba(255, 255, 255, 0.5);
}

.warning {
  background-color: $laranja !important;
}

.success {
  background-color: $verde !important;
}

.success:hover,
.warning:hover {
  opacity: 0.8;
}

@media (max-width: 850px) {
  .selected {
    transform: scale(1.15) !important;
  }
}
</style>
