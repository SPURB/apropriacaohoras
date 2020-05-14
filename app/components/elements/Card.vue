<template>
  <div class="card__projeto">
    <section class="card__header">
      <h2>Nome do projeto</h2>
    </section>
    <section class="card__body"></section>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style lang="scss" scoped>
.card__projeto {
  background-color: $verde;
  border-radius: 7px;
  color: #fff;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;

  .card__header {
    align-items: flex-end;
    display: flex;
    height: 30%;
    width: 100%;

    h2 {
      margin: 5px;
      font-size: 13pt;
    }
  }
  .card__body {
    background-color: #fff;
    border-radius: 7px;
    justify-self: flex-end;
    height: 70%;
    width: 100%;
  }
}
</style>
