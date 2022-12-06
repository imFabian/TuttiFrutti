<template>
    <div>
        <div class="text-center headerMantainer">
            <h4>Gestor y visualizacion de ventas</h4>
        </div>
        <div class="row" style="padding-left:15px;padding-right:15px;">
            <div class="col-10 text-center">
                <input type="text" class="inputSearchAdmin" placeholder="Filtrar">
            </div>
            <div class="w-100 mt-3 pr-3 pl-3 mb-3">
                <h5>Listado de ventas <small style="font-size:14px !important;">({{listadoVentas.length}})</small></h5>
                <div v-for="(item, index) in listadoVentas" :key="index" class="w-100 mb-2 p-2 row" style="border-radius: 10px;border-bottom: 1px solid grey;">
                    <div class="col-4"><span style="font-weight:bold;">{{item.rut}} {{item.nombre}} {{item.apellido}}</span></div>
                    <div class="col row justify-content-between" v-if="(item.transactionStatus != undefined)">
                        <span class="col" :style="item.transactionStatus.status == 'AUTHORIZED' ? 'color:green;font-weight:bold;' : 'color:red;font-weight:bold;'">{{item.transactionStatus.status}}</span>
                        <span class="col">Total:${{item.transactionStatus.amount}}</span>
                        <span class="col">Fecha:{{item.transactionStatus.transaction_date}}</span>
                    </div>
                    <div v-else>
                        <span class="col" style="color:red;font-weight:bold">CANCELED</span>
                    </div>
                    <div class="col-12 text-center">
                        Direccion de entrega: <span style="font-weight:bold;">{{item.direccion}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            listadoVentas: []
        }
    },
    async mounted(){
        this.listadoVentas = await this.$store.dispatch('getAllSalesDB');
        // console.log(await this.$store.dispatch('getAllSalesDB'));
    }
}
</script>