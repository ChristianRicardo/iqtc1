<template>  

<div class="content py-5">
<div class="container">
	 <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-7 col-xs-12">
                    <div class="box">
                        <h3 class="box-title">Vamos finalizar sua compra</h3>
                        <hr>
                        <form>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Nome</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ex:John Doe">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Email</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ex:johndoe@gmail.com">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">CPF</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Ex:123.457.738-99">
                            </div>
                        </form>
                    </div>
                    <div class="box">
                        <h3 class="box-title">Dados do cartão</h3>
                        <hr>
                        <card
                          ref="card-stripe"
                          stripe="YOUR_PUBLIC_STRIPE_API_KEY"
                          @change='complete = $event.complete'
                        />
                    </div>
                    <a href="#" class="greenbtn btn-lg mb30">Finalizar Compra</a>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-5 col-xs-12">
                  
                    <div class="widget">
                        <h4 class="widget-title">Resumo da Compra</h4>
                        <hr>
                        <div class="summary-block" v-bind:key="curso.id" v-for="curso in selectedCursos">
                            <div class="summary-content d-flex justify-content-between align-items-center">
                                <div class="summary-head">
                                  <img :src="'http://localhost:1337'+ curso.imagem.url" alt="..." class="img-fluid img-responsive"/>
                                </div>
                                <div class="pl-3 summary-price text-right">
                                  <h5 class="summary-title">{{curso.nome}}</h5>
                                    <p class="summary-text">R${{curso.preco}},00</p>
                                    <span class="summary-small-text pull-right">Quantidade: {{curso.quantity}}</span>
                                </div>
                            </div>
                            <hr>
                        </div>
                        <div class="summary-text">
                          <h5>Total: <strong>R${{price}},00</strong></h5>  
                        </div>

                    </div>
                   
                </div>
            </div>
	
</div>
</div>
</template>

<script>   
import { Card, createToken } from 'vue-stripe-elements-plus'  

export default {  
  components: {
    Card,
  },
  data() {
    return {
      address: '',
      postalCode: '',
      city: '',
      complete: false,
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      let token
      try {
        const response = await createToken()
        token = response.token.id
      } catch (err) {
        alert('An error occurred.')
        this.loading = false
        return
      }
      try {
        await strapi.createEntry('orders', {
          amount: this.$store.getters['cart/price'],
          dishes: this.$store.getters['cart/items'],
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          token
        })
        alert('Your order have been successfully submitted.')
        this.emptyCart()
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        alert('An error occurred.')
      }
    }
  },
    computed: {
    id() {
      return this.$route.params.id
    },
    selectedCursos() {
      return this.$store.getters['cart/items']
    },
    price() {
      return this.$store.getters['cart/price']
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    }
  }
}
</script> 
<style scoped>
.greenbtn{
	background-color:#13411F;
  outline:0;
  border:0;

  color:white!important;
  box-shadow:2px 2px 5px rgba(0,0,0,0.3);
  cursor:pointer;
  text-decoration:none;
}
.box { background-color: #fff; border-radius: 8px; box-shadow:2px 2px 8px rgba(0,0,0,0.2); padding: 50px; margin-bottom: 30px; }
.box-title { margin-bottom: 30px; text-transform: uppercase; font-size: 16px; font-weight: bold; color: #FBD400; letter-spacing: 2px; }
.plan-selection { border-bottom: 2px solid #e9ebef; padding-bottom: 25px; margin-bottom: 35px; }
.plan-selection:last-child { border-bottom: 0px; margin-bottom: 0px; padding-bottom: 0px; }
.plan-data { position: relative; }
.plan-data label { font-size: 20px; margin-bottom: 15px; font-weight: 400; }
.plan-text { padding-left: 35px; }
.plan-price { position: absolute; right: 0px; color: #FBD400; font-size: 20px; font-weight: bold; letter-spacing: -1px; line-height: 1.5; bottom: 43px; }
.term-price { bottom: 18px; }
.secure-price { bottom: 68px; }
.summary-block:last-child { border-bottom: 0px; }
.summary-content { padding: 28px 0px; }
.summary-price { color: #FBD400; font-weight:bold; font-size: 20px; letter-spacing: -1px; margin-bottom: 0px; display: inline-block; }
.summary-small-text { font-weight: 700; font-size: 12px; color: #8f929a; }
.summary-text { margin-bottom: -10px; }
.summary-title { font-weight: 700; font-size: 14px; color: #1c1e22; }
.summary-head { display: inline-block; width: 120px; }

.widget { margin-bottom: 30px; background-color: #f5f5f5; padding: 50px; border-radius: 6px; box-shadow:2px 2px 8px rgba(0,0,0,0.2)}
.widget:last-child { border-bottom: 0px; }
.widget-title { color: #FBD400; font-size: 16px; font-weight: 700; text-transform: uppercase; margin-bottom: 25px; letter-spacing: 1px; display: table; line-height: 1; }

.btn { font-family: 'Noto Sans', sans-serif; font-size: 16px; text-transform: capitalize; font-weight: 700; padding: 12px 36px; border-radius: 4px; line-height: 2; letter-spacing: 0px; -webkit-transition: all 0.3s; -moz-transition: all 0.3s; transition: all 0.3s; word-wrap: break-word; white-space: normal !important; }
.btn-default { background-color: #13411F; color: #fff; border: 1px solid #13411F; }
.btn-default:hover { background-color: #13411F; color: #fff; border: 1px solid #13411F; }
.btn-default.focus, .btn-default:focus { background-color: #13411F; color: #fff; border: 1px solid #13411F; }
</style>