<template>
	<table>
		<thead>
			<tr>
				<th colspan="7">
					<button @click="monthInc(-1)"><i class="icon icon-seta_esquerda"></i></button>
					{{ `${decodeMonth(month)} &middot; ${year}` }}
					<button @click="monthInc(1)"><i class="icon icon-seta_direita"></i></button>
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
		<tbody>
			<tr
				:key="weekIndex"
				v-for="(week, weekIndex) in weeksThisMonth">
				<td 
					:key="day"
					v-for="day in calendario(weekIndex)"
					:class="daysClassification(day)" 
					v-html="formatDate(day)"
					@click="setData({
						day: `${day}`.padStart(2, '0'),
						month: `${month}`.padStart(2, '0'),
						year,
						hms: hms()
						},
					)"
				/>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'Calendario',
	data () {
		return {
			date: new Date(),
			months: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
			selection: null
		}
	},
	computed: {
		today: {
			get () { return this.date },
			set (newDate) { this.date = newDate }
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
			return new Date(this.year, (this.month + 1), 0).getDate() 
		}, 
		weeksThisMonth () { 
			return Math.ceil(this.daysThisMonth/7) }, 
		firstWeekDay () { 
			return new Date(this.year, this.month, 1).getDay() 
		}
	},
	methods: {
		...mapActions(['setData']),
		calendario (weekIndex) {
			const totalDayMonth = this.daysThisMonth + this.firstWeekDay
			let day = []
			// if (dayIndex >= weekIndex * 7 && dayIndex <= ((weekIndex + 1) * 7) - 1) {}
			for (let dayIndex = 0; dayIndex <= this.daysThisMonth + this.firstWeekDay; dayIndex++) {
				if (dayIndex >= weekIndex * 7 && dayIndex <= ((weekIndex + 1) * 7) - 1) {
					day.push(dayIndex+1) // attr + 1 para acertar data
				}
			}
			return day
		},
		monthInc (inc) {
			let newMonth = this.month + inc
			this.today = new Date(this.year, newMonth, this.todayMonthDay)
			if (this.selection) this.selection.classList.remove('selected')
			if (this.selection) this.selection = undefined
		},
		decodeMonth (monthNumber) { return this.months[monthNumber] },
		daysClassification (monthday) {
			let out = []
			let thisday = new Date(this.year, this.month, monthday)
			thisday.toLocaleString().substring(0, 10) === new Date().toLocaleString().substring(0, 10) ? out.push('today') : false
			return out.toString()
		},
		formatDate (monthday) {
			if (monthday - this.firstWeekDay < 1) { return '' }
			else { return monthday - this.firstWeekDay }
		},		
		hms () {
			let d = new Date()
			let h = `${d.getHours()}`.padStart(2, '0')
			let m = `${d.getMinutes()}`.padStart(2, '0')
			let s = `${d.getSeconds()}`.padStart(2, '0')

			return h + ":" + m + ":" + s
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
				@include bg-white-alpha(.1);
				border-radius: 100%;
				padding: 0;
				color: inherit;
				cursor: pointer;
				&:nth-child(1) { float: left; }
				&:nth-child(2) { float: right; }
				.icon {
					font-size: 1.5rem;
					line-height: 1.4rem;
					vertical-align: -2px;
				}
				&:hover { @include bg-white-alpha(.2); }
			}
		}
		tr th:not([colspan]) {
			font-weight: normal;
			@include color-white-alpha(.4);
			&:first-child, &:last-child { @include color-white-alpha(.1); }
		}
	}
	tbody {
		tr {
			td {
				@include bg-white-alpha(.04);
				border-radius: 0.25rem;
				line-height: calc(2.5rem - 8px);
				text-align: center;
				border-top: 4px solid transparent;
				border-bottom: 4px solid transparent;
				cursor: pointer;
				box-shadow: 0 0 0 transparent;
				transition: all ease-in .1s;
				&:nth-child(1), &:nth-child(7) { @include color-white-alpha(.4); }
				&:hover { @include bg-white-alpha(.08); }
				&.today { border-bottom-color: rgba(255, 255, 255, .2); }
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
					transform: scale(1.25);
					@include bg-white-alpha(.12);
					box-shadow: $s-2-4-48;
				}
			}
		}
	}
}
</style>
