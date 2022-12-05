<template>
    <div class="container">
        <NavBar/>
        <div class="row">
            <div class="col-3">
                <h3 class="text-center">Mantenedores</h3>
                <ul class="list-group">
                    <li :class="(indexMantenedor == 0) ? 'list-group-item activeMenuAdmin' : 'list-group-item'" role="button" @click="changeIndex(0)">Mantenedor Productos</li>
                    <li :class="(indexMantenedor == 1) ? 'list-group-item activeMenuAdmin' : 'list-group-item'" role="button" @click="changeIndex(1)">Gestor de ventas</li>
                </ul>
            </div>
            <div class="col-9 estiloMainContainerAdmin">
                <MantenedorProductos v-if="(indexMantenedor == 0)"/>
                <GestorVentas v-if="(indexMantenedor == 1)"/>
            </div>  
        </div>
        <Footer/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            indexMantenedor: 0
        }
    },
    methods:{
        changeIndex(index){
          this.indexMantenedor = index;
        }
    }
}
</script>
<style>
 .estiloMainContainerAdmin{
    border: 1px solid #dfdfdf;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    padding-left: 0px !important;
    padding-right: 0px !important;
 }
 .activeMenuAdmin{
    background-color:#ade373;
 }
</style>