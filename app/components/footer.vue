<template>
	<footer>
		<div>
			<span>Dúvidas e sugestões</span> &middot; Ramal XXXX &middot; email@spurbanismo.prefeitura.sp.gov.br
		</div>
	</footer>
</template>

<script>
export default {
	name: 'Footer'
}
</script>

<style lang="scss">
@import 'assets/variables';
@import 'assets/generalstyles';

footer {
	background-color: $verde;
	color: #FFF;
	padding: 2.5rem 0;
	margin: 6rem 0 0;
	div {
		max-width: 1200px;
		margin: 0 auto;
		span { font-weight: bold; }
	}
}
</style>
