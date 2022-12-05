<template>
    <div class="container">
        <NavBar/>
        <section class="vh-100" style="background-color: #e9e9e9;">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-xl-10">
                    <div class="card">
                    <div class="row g-0">
                        <div class="col-md-6 col-lg-5 d-none d-md-block">
                        <img src="https://t1.uc.ltmcdn.com/es/posts/4/0/5/cuales_son_las_frutas_de_invierno_7504_600.jpg" alt="login form" class="img-fluid" style="height: 100%;object-fit: cover;" />
                        </div>
                        <div class="col-md-6 col-lg-7 d-flex align-items-center">
                        <div class="card-body p-4 p-lg-5 text-black">

                            <form>

                            <div class="d-flex align-items-center mb-3 pb-1">
                                <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                                <span class="h1 fw-bold mb-0">
                                    TuttiFrutti
                                </span>
                            </div>

                            <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Inicia Sesión en tu cuenta</h5>

                            <div class="form-outline mb-2">
                                <input type="email" id="form2Example17" v-model="email" placeholder="example@example.com" class="form-control form-control-lg" />
                                <label class="form-label" for="form2Example17">Correo</label>
                            </div>

                            <div class="form-outline mb-2">
                                <input type="password" id="form2Example27" v-model="password" placeholder="******" class="form-control form-control-lg" />
                                <label class="form-label" for="form2Example27">Contraseña</label>
                            </div>

                            <div class="text-center">
                                <span style="color:red;font-weight:bold;">{{error}}</span>
                            </div>
                            <div class="pt-1 mb-2">
                                <button class="btn btn-dark btn-lg btn-block" type="button" @click="login()">Entrar</button>
                            </div>

                            <div>
                                <div class="row">
                                    <div class="col-6">
                                        <span role="button" class="small text-muted">Terminos de uso</span>
                                    </div>
                                    <div class="col-6">
                                        <span role="button" class="small text-muted text-right">Politicas de privacidad</span>
                                    </div>
                                </div>
                            </div>
                            </form>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
            <Footer/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email: "test@gmail.com",
            password:"123456",
            error:null
        }
    },
    methods:{
        login(){
           this.error = null;
           var user = {
                email: this.email,
                password: this.password,
                returnSecureToken: true
           };
           if(this.email == ""){
            this.error = "Email requerido";
            return;
           }
           if(this.password == ""){
            this.error ="Contraseña requerida";
            return;
           }
           this.$axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCQaOlakw4d_VyBTzXtRDKYbBQQhF_D4xY",user).then((res)=>{
               if(res.status == 200){
                  this.$store.dispatch('setUserLogged',res.data);
                  this.$router.push('/')
               }else{
                  this.error = "Usuario o contraseña incorrecto";
               }
           }).catch((e)=>{
              this.error = "Usuario o contraseña incorrecto";
           })
        }
    }
}
</script>