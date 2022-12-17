<template>
    <div class="container">
      <NavBar/>
      <div class="container">
        <h3>Catálogo de productos</h3>
        <div class="row justify" style="border: 5px solid #cec9c9;padding: 15px;">
          <cardProduct v-for="item in listadoProductos" :key="item.id" :product="item" />
        </div>
      </div>
      <Footer/>
    </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      listadoProductos:[]
    }
  },
  async mounted(){
    this.listadoProductos = await this.$store.dispatch('getAllProducts');
  },
}
</script>
<style>
body{
  background-color: #eaeaea;
}
</style>
