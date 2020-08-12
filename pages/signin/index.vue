<template>
  <div class="container py-5">
    <div class="container-fluid text-center">
      <div class="card text-center d-inline-block" style="width:300px;">
        <div class="card-header">
          IQTC
        </div>
        <div class="card-body">
          <h5 class="card-title">Login</h5>
          <form class="form-signin card-text" method="post" @submit.prevent="login">
            <label for="inputEmail" class="sr-only">Email</label>
            <input id="inputEmail" v-model="login_email" type="email" class="form-control" placeholder="Digite seu email" autofocus required>
            <label for="inputSenha" class="sr-only">Senha</label>
            <input id="inputSenha" v-model="login_senha" type="password" class="form-control" placeholder="Digite sua senha" required>
          <button type="submit" class="w-100 btn verde">Entrar</button>
          </form>      
        </div>
        <div class="card-footer text-muted">
          Não possui uma conta?
          <nuxt-link to="/register">
            Criar conta
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'  
import axios from 'axios';

export default {
  data(){
    return{
      login_email: '',
      login_senha: '',
      loading:false
    }
  },
  methods: {
      async login(){
        // Request API.
        // Add your own code here to customize or restrict how the public can register new users.
       try{
         this.loading=true
       const response = await axios
          .post('http://localhost:1337/auth/local', {
            identifier: this.login_email,
            password: this.login_senha,
          })

        this.loading=false
        this.setUser(response.data.user)
        this.$router.push('/')

       } catch (err) {
        this.loading=false
        alert(err.message|| 'an error ocurred')
      }

      },
      // Define all your needed mutations, here: auth/setUser
    ...mapMutations({
      setUser: 'auth/setUser'
    })
  }
}
</script>

<style scoped>
  .form-signin input[type="email"]{
    margin-bottom: 10px;
  }
  .form-signin input[type="password"]{
    margin-bottom: 10px;
  }
  .verde{
    background-color: #13411f;
    color: white;
  }
  .pt-10{
    padding-top: 10rem;
  }
</style>
