<template>
    <nav class="navbar navbar-expand-lg navbar-ligth bg-ligth static-top">
        <div class="container">
            <a class="navbar-brand" href="#">
            <img src="https://img.freepik.com/premium-vector/fruits-logo-design_10250-808.jpg" alt="logo" height="100">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <NuxtLink to="/">
                        <span class="nav-link" aria-current="page" role="button" style="font-size: 16px;line-height: 16px;margin-top: 5px;color: black;">Catálogo</span>
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/Nosotros">
                        <span class="nav-link" aria-current="page" role="button" style="font-size: 16px;line-height: 16px;margin-top: 5px;color: black;">Nosotros</span>
                    </NuxtLink>
                </li>
            </ul>

            <ul class="navbar-nav ml-auto">
                <li class="nav-item" @click="loginOrLogout()">
                        <span class="nav-link" aria-current="page" role="button" style="font-size: 16px;line-height: 16px;margin-top: 5px;color: black;">{{verifyUser}} <font-awesome-icon icon="user" style="height:16px;color:black;"/></span>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/Carrito">
                        <span class="nav-link" aria-current="page" role="button" style="font-size: 16px;line-height: 16px;margin-top: 5px;color: black;">
                         Carrito <font-awesome-icon icon="cart-shopping" style="height:16px;color:black;"/> <span class="badge badge-dark">{{getCart.length}}</span>
                        </span>
                    </NuxtLink>
                </li>
                <li class="nav-item" v-if="(getUserLogged != null)">
                    <NuxtLink to="/Admin">
                        <span class="nav-link" aria-current="page" role="button" style="font-size: 16px;line-height: 16px;margin-top: 5px;color: black;">Admin <font-awesome-icon icon="screwdriver-wrench" style="height:16px;color:black;"/></span>
                    </NuxtLink>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    methods:{
        loginOrLogout(){
            if(this.getUserLogged != null){
                this.$store.dispatch('setUserLogged',null);
            }else{
                this.$router.push('/Login');
            }
        }
    },
    computed:{
        ...mapGetters(['getUserLogged','getCart']),
        verifyUser(){
            if(this.getUserLogged != null){
                return "Cerrar Sesión";
            }else{
                return "Iniciar Sesión";
            }
        }
    }
}
</script>