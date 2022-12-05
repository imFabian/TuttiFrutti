<template>
    <div class="container">
        <NavBar/>
        <h4>Carro de compras </h4>
        <!-- <p>{{getCart.length}} Productos</p> -->
        <div>
            <ul class="list-group">
                <li class="list-group-item" v-for="(item, index) in getCart" :key="index">
                    <img :src="item.url" :alt="item.id" height="50px" width="50px">
                    <span>{{item.name}} <span class="badge badge-secondary" style="background-color:#ade373 !important;">{{item.amount}}</span></span>
                    <span style="float: right;color:#36783d;font-weight: 500;font-size: 16;">${{(item.price * item.amount)}}</span>
                </li>
            </ul>
            <div v-if="(getUserLogged != null)">
                <div class="mt-3">
                            <h4>Detalles de entrega</h4>
                            <input type="text" class="inputsEnvio mt-2" v-model="nombre" placeholder="Nombre">
                            <input type="text" class="inputsEnvio mt-2" v-model="apellido" placeholder="Apellido">
                            <input type="text" class="inputsEnvio mt-2" v-model="rut" placeholder="Rut">
                            <input type="text" class="inputsEnvio mt-2" v-model="direccion" placeholder="Direccion">
                        </div>
                        <div style="float: right;">
                            <span style="float: right;color: #7a8085;">Subtotal <span>${{getSubTotal}}</span></span>
                            <br>
                            <span style="float: right;color: #7a8085;">Envio $5000</span>
                            <br>
                            <span style="float: right;color: #36783d;font-weight: bold;">Total ${{getTotal}}</span>
                            <br>
                            <button class="btn btnPay mt-2" @click="pay()" :disabled="(nombre == '' || apellido == '' || rut == '' || direccion == '')">Pagar</button>

                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <form name="formPay" id="brouterForm"  method="POST" action="https://webpay3gint.transbank.cl/webpayserver/initTransaction" style="display:block;" v-if="(tokenWS != null)">
                            <input type="hidden" name="token_ws" :value="tokenWS" />
                            <input class="btn mt-2" ref="buttonSubmit" type="submit" value="Pagar" style="background-color: #ade373;color:#36783d;font-weight: bold;padding-left: 40px;padding-right: 40px;display:none;"/>
                            </form>
                        </div>
            </div>
            <div v-else class="text-center mt-3">
                <h3>Debes iniciar sesión para continuar con la compra</h3>
                <NuxtLink to="/Login">
                    <span class="btn btn-primary">Iniciar sesión</span>
                </NuxtLink>
            </div>
        </div>
        <Footer/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { uid } from 'uid';
export default {
    data() {
        return {
            tokenWS: null,
            buy_order:null,
            session_id:null,
            nombre:"Fabian",
            apellido:"Riveros",
            rut:"19.726.827-2",
            direccion:"Chiapas 2865",
        }
    },
    methods:{
        async pay(){
            let initialSale = {
                nombre:this.nombre,
                apellido:this.apellido,
                rut:this.rut,
                direccion:this.direccion,
                email:this.getUserLogged.email,
                buy_order:this.buy_order,
                session_id:this.session_id
            }
            await this.$store.dispatch('setSaleDB',initialSale);
            this.$refs.buttonSubmit.click();
        }
    },
    computed:{
      ...mapGetters(['getCart','getUserLogged']),
      getSubTotal(){
        let total = 0;
        this.getCart.forEach(element => {
            total += parseInt(element.price) * parseInt(element.amount);
        });
        return total;
      },
      getTotal(){
        return this.getSubTotal + 5000;
      }
    },
    async mounted(){
        this.buy_order = uid(16);
        this.session_id = uid(16);
        let item = {
            buy_order:this.buy_order,
            session_id:this.session_id,
            total:this.getTotal,
        };
        let data = await this.$store.dispatch('initTransaction',item);
        this.tokenWS = data.token;
        localStorage.setItem("buy_order",JSON.stringify(this.buy_order));
    },
}
</script>
<style>
.inputsEnvio{
        background-color: #e2e2e2;
        border: 1px solid #eee;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 7px;
        width: 100%;
}
.btnPay{
    background-color: #ade373;
    color:#36783d;
    font-weight: bold;
    padding-left: 40px;
    padding-right: 40px;
}
.btnPayDisabled{
    background-color: grey;
    color:white;
    font-weight: bold;
    padding-left: 40px;
    padding-right: 40px;
}
</style>