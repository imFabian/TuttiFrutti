<template>
    <b-modal id="modal-product-crud" class="modal-product-crud" ref="modal-product-crud"
        title="Agregar Producto"
        size="sm"
        hide-footer
        centered
    >
        <div class="text-center bodymodal">
                <input type="text" class="inputSearchAdmin mb-2" v-model="(name)" placeholder="Nombre">
                <input type="text" class="inputSearchAdmin mb-2" v-model="(imgUrl)" placeholder="Imagen Url">
                <input type="number" class="inputSearchAdmin mb-2" v-model="(price)" min="0" oninput="this.value = Math.abs(this.value)" placeholder="Precio">
                <div class="error" v-show="(error != null)" style="color:red;">
                    {{error}}
                </div>
                <div class="row mt-3">
                    <div class="col" @click="$bvModal.hide('modal-product-crud');">
                        <span class="btn btn-danger">Cancelar</span>
                    </div>
                    <div class="col" @click="saveEdit()">
                        <span class="btn" style="background-color: #ade373;color:#36783d;">Guardar</span>
                    </div>
                </div>
        </div>
    </b-modal>
</template>
<script>
export default {
    props:['product'],
    data() {
        return {
            name: "",
            imgUrl:"",
            price:0,
            error:null
        }
    },
    methods:{
        async saveEdit(){
            this.error = null;
            if(this.name == ""){
                this.error = "Nombre requerido";
                return;
            }
            if(this.imgUrl == ""){
                this.error = "Url imagen requerida";
                return;
            }
            if(this.price == 0 || this.price < 0){
                this.error = "El precio no puede ser cero o menor que cero";
                return;
            }
            if(this.product != null){
                let product = {
                    name:this.name,
                    url:this.imgUrl,
                    price:this.price,
                    id:this.product.id
                };
                await this.$store.dispatch('updateProductDB',product);
                this.$bvModal.hide('modal-product-crud');
                this.$emit("refresh");
            }else{
                let product = {
                    name:this.name,
                    url:this.imgUrl,
                    price:this.price
                };
                await this.$store.dispatch('setProductDB',product);
                this.$bvModal.hide('modal-product-crud');
                this.$emit("refresh");
            }
        }
    },
    watch: {
        product: { 
            handler(){
                if(this.product != null){
                    this.price = this.product.price;
                    this.imgUrl = this.product.url;
                    this.name = this.product.name;
                }else{
                    this.price = 0;
                    this.imgUrl = "";
                    this.name = "";
                }
            }
        }
    }
}
</script>