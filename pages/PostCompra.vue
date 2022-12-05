<template>
    <div class="container">
        <NavBar/>
        <div class="text-center">
            <span v-if="(sale == null)">Cargando...</span>
            <div v-else>
                <img :src="sale.transactionStatus.status == 'AUTHORIZED' ? 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Sign-check-icon.png' : 'https://w7.pngwing.com/pngs/595/505/png-transparent-computer-icons-error-closeup-miscellaneous-text-logo.png'" alt="" style="width:150px">
                <div v-if="sale.transactionStatus.status == 'AUTHORIZED'">
                    <p>Transaccion finalizada</p>
                    <p>Tu pedido llegará en los proximos dias a la direccion <span style="font-weight:bold;">{{sale.direccion}}</span></p>
                    <p>N° Orden {{sale.transactionStatus.buy_order}}</p>
                    <p>Monto {{sale.transactionStatus.amount}}</p>
                    <p>Fecha {{sale.transactionStatus.transaction_date}}</p>
                </div>
                <div v-else class="mt-3">
                    <p>No se ha realizado ningun cargo(Transacción rechazada)</p>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sale: null
        }
    },
    async mounted(){
        //Aceptar la transaccion
        let data = await this.$store.dispatch('confirmTransaction',this.$route.query.token_ws);
        //ir a buscar la transaccion
        let saleDB = await this.$store.dispatch('getSaleDB',data.buy_order);
        //actualizar la transaccion completa
        saleDB.transactionStatus = data;
        await this.$store.dispatch('setSaleDB',saleDB);
        this.sale = saleDB;
        if(this.sale.transactionStatus.status == "AUTHORIZED"){
            localStorage.removeItem("buy_order");
            await this.$store.dispatch('setCartStore',[]);
        }
    }
}
</script>