<template>
	<div class="registrar" @click="frameClick($event)">
		<Header @toggle-menu="toggleUserMenu" :userMenuState="userMenuState" :fullHeaderFromParent="true"></Header>
		<h2>Registrar horas</h2>
		<main>
			<Calendario class="calendario"></Calendario>
			<div class="formtop">
				<fieldset class="timeInput">
					<div class="main">
						<label for="horas">Número de horas</label>
						<div>
							<button @click="hoursInc(-1)">-</button> 
							<input id="horas" type="number" min="0" max="12" ref="hours" value="0">
							<button @click="hoursInc(1)">+</button>
						</div>
					</div>
					<aside>
						<label for="">Restante do dia</label><label for="">Horas extras</label>
						<div class="bar">
							<div ref="leftHoursBar" v-bind:style="leftHoursBarStyleRules"></div>
						</div>
					</aside>
				</fieldset>
				<fieldset>
					<label for="projeto-atividade">Projeto/atividade</label>
					<select id="projeto-atividade">
						<!-- <option v-for="projeto in projetos"></option> -->
						<option value="id1">PIU Minhocão</option>
						<option value="id2">PIU Setor Central</option>
						<option value="id3">PIU Bairros do Tamanduateí</option>
						<option value="id4">PIU Jockey Club</option>
						<option value="id5">...</option>
					</select>
				</fieldset>
				<fieldset>
					<label for="fase">Fase</label>
					<select id="fase">
						<!-- <option v-for="fase in fases[idProjeto]"></option> -->
						<option value="id1">Elementos prévios</option>
						<option value="id2">Formulação</option>
						<option value="id3">Consolidação</option>
						<option value="id5">...</option>
					</select>
				</fieldset>
				<fieldset>
					<label for="subatividade">Subatividade</label>
					<select id="subatividade">
						<!-- <option v-for="subatividade in subatividades[idFase[idProjeto]]"></option> -->
						<option value="id1">Diagnóstico Socioterritorial</option>
						<option value="id2">Diagnóstico Territorial</option>
						<option value="id3">Programa de Interesse Público</option>
						<option value="id4">Diretrizes Urbanísticas</option>
						<option value="id5">Viabilidade da Transformação</option>
						<option value="id6">Adensamento Populacional</option>
						<option value="id7">...</option>
					</select>
				</fieldset>
			</div>
			<div class="formbtm">
				<fieldset>
					<label for="descricao">Descrição (opcional)</label>
					<input id="descricao" type="text">
				</fieldset>
			</div>
			<button class="postBtn">Registrar horas</button>
		</main>
		<Footer></Footer>
	</div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Calendario from '../components/Calendario.vue'

export default {
	name: 'Registrar',
	components: {
		Header,
		Footer,
		Calendario
	},
	data () {
		return {
			userMenuState: false,
			userMenuEl: undefined,
			registro: {
				data: undefined,
				horasParaRegistrar: 0,
				projetoAtividade: undefined,
				fase: undefined,
				subatividade: undefined,
				descricao: undefined
			}
		}
	},
	computed: {
		leftHoursBarStyleRules: function () {
			let out = {
				width: 'calc(' + (8 - this.registro.horasParaRegistrar) + ' * (100%/8))'
			}
			console.log(out)
			return out
		}
	},
	methods: {
		toggleUserMenu (elementFromChild) {
			this.userMenuState = !this.userMenuState
			if (this.userMenuEl === undefined) { this.userMenuEl = elementFromChild }
		},
		frameClick (event) {
			if (this.userMenuState && event.target.contains(this.userMenuEl)) {
				this.toggleUserMenu()
			}
		},
		hoursInc (inc) {
			let actualNumValue = parseInt(this.$refs.hours.value)
			let newVal = actualNumValue += inc
			if (newVal >= 1 && newVal <= 12) {
				this.$refs.hours.value = newVal
				this.registro.horasParaRegistrar = newVal
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.registrar {
	h2 {
		max-width: 1200px;
		font-size: 1.5rem;
		color: #FFF;
		line-height: 3rem;
		margin: 4rem auto 1rem;
	}
	main {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		color: #FFF;
		& > * { border-radius: 1.5rem; }
		& > .calendario {
			width: calc(50% - 2rem);
			margin-right: 2rem;
			@include bg-white-alpha(.08);
		}
		* > fieldset {
			padding: 0;
			border: 0;
			label {
				display: block;
				@include color-white-alpha(.4);
				font-size: .75rem;
				line-height: 1;
				text-transform: uppercase;
				margin-bottom: .5rem;
			}
			input, select {
				border: none;
				color: inherit;
				font-family: inherit;
				font-size: 1.5rem;
				@include bg-white-alpha(.08);
				width: 100%;
				option { color: $preto; }
				padding: 0 .75rem;
				height: 3rem;
				border-radius: 1.5rem;
			}
			// sumindo com os controles de input number no firefox, chrome...
			input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
			    -webkit-appearance: none;
			    margin: 0;
			}
			input[type=number] {
			    -moz-appearance: textfield;
			    caret-color: transparent;
			}
		}
		& > .formtop {
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			width: calc(50% - 2rem);
			margin-left: 2rem;
			fieldset {				
				&.timeInput {
					.main {
						display: inline-block;
						width: 30%;
						label { display: inline-block; }
						& > div {
							position: relative;
							button {
								position: absolute;
								top: 0.5rem;
								height: calc(100% - 1rem);
								width: 20%;
								color: inherit;
								font-size: inherit;
								background-color: $verde;
								text-align: center;
								cursor: pointer;
								border: 2px solid rgba(255, 255, 255, .12);
								box-shadow: $s-1-2-48;
								&:first-child {
									left: 0.5rem;
									border-radius: 1.5rem 0 0 1.5rem;
									padding-left: .65rem;
								}
								&:last-child {
									right: 0.5rem;
									border-radius: 0 1.5rem 1.5rem 0;
									padding-right: 1rem;
								}
							}
							input { text-align: center; }
						}
					}
					aside {
						display: inline-block;
						height: 100%;
						width: calc(74.5% - 2rem);
						vertical-align: top;
						padding-left: 2rem;
						label {
							display: inline-block;
							margin-right: .75rem;
						}
						.bar {
							@include bg-white-alpha(.08);
							padding: .5rem;
							width: 100%;
							height: 3rem;
							border-radius: 1.5rem;
							position: relative;
							& > div {
								height: 100%;
								border-radius: 1rem;
							}
						}
					}
				}
			}
		}
		& > .formbtm {
			width: 100%;
			margin-top: 2rem;
		}
		& > .postBtn {
			border: 2px solid rgba(255, 255, 255, .24);
			background-color: $verde;
			font-size: inherit;
			font-family: inherit;
			border-radius: 2rem;
			color: inherit;
			padding: 1rem;
			margin: 2rem 0 0;
			width: 100%;
			box-shadow: $s-2-4-48;
			cursor: pointer;
			transition: all ease-in .2s;
			&:hover { box-shadow: $s-4-8-24; }
		}
	}
}
</style>
