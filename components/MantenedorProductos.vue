<template>
    <div>
        <div class="text-center headerMantainer">
            <h4>Mantenedor de productos</h4>
        </div>
        <div class="row" style="padding-left:15px;padding-right:15px;">
            <div class="col-10 text-center">
                <input type="text" class="inputSearchAdmin" placeholder="¿Qué estás buscando?">
            </div>
            <div class="col-2 text-right" @click="addProducts()">
                <span class="btn" style="background-color: #ade373;color:#36783d;">Agregar <font-awesome-icon icon="plus" style="height:16px;color:#36783d;"/></span>
            </div>
            <div class="w-100 mt-3 pr-3 pl-3 mb-3">
                <h5>Listado de productos</h5>
                <div v-for="(item, index) in listadoProductos" :key="index" class="w-100 mb-2 p-2 row" style="border-radius: 10px;border-bottom: 1px solid grey;">
                    <div class="col-2">
                        <img :src="item.url" :alt="item.id" height="50px" width="50px">
                    </div>
                    <div class="col-7">{{item.name}}</div>
                    <div class="col-3 row text-right">
                        <div class="col">
                            ${{item.price}}
                        </div>
                        <div class="col">
                            <font-awesome-icon @click="editItem(item)" role="button" icon="edit" style="height:16px;color:black;"/>
                        </div>
                        <div class="col">
                            <font-awesome-icon @click="deleteItem(item.id)" role="button" icon="xmark" style="height:16px;color:black;"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal edit/add product -->
        <modalProductCrud @refresh="refreshTable()" :product="selectedProduct"/>

    </div>
</template>
<script>
export default {
    data() {
        return {
            listadoProductos:[],
            selectedProduct:null
        }
    },
    async mounted(){
       this.listadoProductos = await this.$store.dispatch('getAllProducts');
    },
    methods:{
        addProducts(){
          this.selectedProduct = null;
          this.$bvModal.show('modal-product-crud');
        },
        editItem(item){
            this.selectedProduct = item;
            this.$bvModal.show('modal-product-crud');
        },
        async deleteItem(id){
            await this.$store.dispatch('deleteById',id);
            this.refreshTable();
        },
        async refreshTable(){
            this.listadoProductos = await this.$store.dispatch('getAllProducts');
        },
    }
}
</script>
<style>
    .headerMantainer{
        background-color: #ade373;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
    }
    .inputSearchAdmin{
        background-color: #e2e2e2;
        border: 1px solid #eee;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 7px;
        width: 100%;
    }
</style>