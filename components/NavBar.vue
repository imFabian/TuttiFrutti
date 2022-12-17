<template>
    <nav class="navbar navbar-expand-lg navbar-ligth bg-ligth static-top">
        <div class="container">
            <div class="social mr-2">
               <a class="facebook" href="https://img.freepik.com/premium-vector/fruits-logo-design_10250-808.jpg"></a>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <NuxtLink to="/">
                        <span class="nav-link btn btn-secondary" aria-current="page" role="button" style="font-size: 16px;line-height: 16px;margin-top: 5px;color: white;">Catálogo</span>
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/Nosotros">
                        <span class="nav-link btn btn-secondary ml-2" aria-current="page" role="button" style="font-size: 16px;line-height: 16px;margin-top: 5px;color: white;">Nosotros</span>
                    </NuxtLink>
                </li>
            </ul>

            <ul class="navbar-nav ml-auto">
                <li class="nav-item" @click="loginOrLogout()">
                        <span class="nav-link btn btn-secondary ml-2" aria-current="page" role="button" style="font-size: 16px;line-height: 16px;margin-top: 5px;color: white;">{{verifyUser}} <font-awesome-icon icon="user" style="height:16px;color:white;"/></span>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/Carrito">
                        <span class="nav-link btn btn-secondary ml-2" aria-current="page" role="button" style="font-size: 16px;line-height: 16px;margin-top: 5px;color: white;">
                         Carrito <font-awesome-icon icon="cart-shopping" style="height:16px;color:white;"/> <span class="badge badge-dark">{{getCart.length}}</span>
                        </span>
                    </NuxtLink>
                </li>
                <li class="nav-item" v-if="(getUserLogged != null)">
                    <NuxtLink to="/Admin">
                        <span class="nav-link btn btn-secondary ml-2" aria-current="page" role="button" style="font-size: 16px;line-height: 16px;margin-top: 5px;color: white;">Admin <font-awesome-icon icon="screwdriver-wrench" style="height:16px;color:white;"/></span>
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
<style>
.social .facebook {
  display: inline-block;
  width: 100px;
  height: 100px;
  background: url(https://img.freepik.com/premium-vector/fruits-logo-design_10250-808.jpg);
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 50%;
}
</style>