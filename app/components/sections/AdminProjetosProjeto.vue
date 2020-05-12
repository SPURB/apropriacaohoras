<template>
	<div class="admin-projetos-projeto">
		{{ idprojeto }}
	</div>
</template>
<script>
export default {
	name: 'AdminProjetosProjeto',
	props: {
		idProjeto: {
			type: Number,
			required: true
		}
	}
}
</script>