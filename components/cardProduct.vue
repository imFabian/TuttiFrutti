<template>
    <div class="col-3 mb-3" style="border: 1px solid #cec9c9;padding: 10px;">
            <div class="card" style="width: 15rem;">
              <img :src="product.url" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">{{product.name ?? "Producto"}}</h5>
                <span class="card-text">
                  <div class="row">
                    <div class="col-9">
                      <span style="color:#36783d;font-weight: bold;font-size: 35;">${{product.price}}</span>
                    </div>
                    <div class="col-3">
                      <span>un.</span>
                    </div>
                  </div>  
                </span>
                <div class="col text-center mt-3" @click="addToCart()" v-if="(getCart.findIndex(element => element.id === product.id) === -1)">
                  <div class="btn" style="background-color: #ade373;color:#36783d;font-weight: bold;padding-left: 40px;padding-right: 40px;">Agregar</div>
                </div>
                <div v-if="(getCart.findIndex(element => element.id === product.id) != -1)" class="mt-3 text-center">
                    <div class="btn" style="background-color: #ade373;color:#36783d;font-weight: bold;margin-bottom: 10px;" @click="deleteItem()" v-if="(getQtty == 1)">
                      <font-awesome-icon icon="trash" style="height:16px;color:#36783d;"/>
                    </div>
                    <div class="btn" style="background-color: #ade373;color:#36783d;font-weight: bold;margin-bottom: 10px;" @click="addOrSubstract('substract')" v-if="(getQtty > 1)">
                      <font-awesome-icon icon="minus" style="height:16px;color:#36783d;"/>
                    </div>
                    <input type="text" disabled :value="getQtty" style="width:80px;height: 35px;text-align: center;font-size: 21px;font-weight: 400;height: 40px;">
                    <div class="btn" style="background-color: #ade373;color:#36783d;font-weight: bold;margin-bottom: 10px;" @click="addOrSubstract('add')">
                      <font-awesome-icon icon="plus" style="height:16px;color:#36783d;"/>
                    </div>
                </div>
              </div>
            </div>
          </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    props:['product'],
    computed:{
      ...mapGetters(['getCart']),
      getQtty(){
        let found = this.getCart.find(element => element.id === this.product.id);
        return found.amount;
      }
    },
    methods:{
      async addToCart(){
        if(this.getCart.length == 0){
          let temporalCart = [];
          this.product.amount = 1;
          temporalCart.push(this.product);
          await this.$store.dispatch('setCartStore',temporalCart);
        }else{
          let found = this.getCart.find(element => element.id === this.product.id);
          if(found == undefined){
           let copyCart = [...this.getCart];
           this.product.amount = 1;
           copyCart.push(this.product);
           await this.$store.dispatch('setCartStore',copyCart);
          }else{
            let copyCart = [...this.getCart];
            let index = copyCart.findIndex(element => element.id === this.product.id);
            this.product.amount = found.amount + 1;
            copyCart[index] = this.product;
            await this.$store.dispatch('setCartStore',copyCart);          }
        }
      },
      async addOrSubstract(action){
        let found = this.getCart.find(element => element.id === this.product.id);
        let copyCart = [...this.getCart];
        let index = copyCart.findIndex(element => element.id === this.product.id);
        this.product.amount = action == 'add' ? found.amount + 1 : found.amount - 1;
        copyCart[index] = this.product;
        await this.$store.dispatch('setCartStore',copyCart);          
      },
      async deleteItem(){
        let copyCart = [...this.getCart];
        let index = copyCart.findIndex(element => element.id === this.product.id);
        copyCart.splice(index, 1);
        await this.$store.dispatch('setCartStore',copyCart);  
      }
    }
}
</script>