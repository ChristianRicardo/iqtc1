<template>

<div v-if="!loading" class="container py-5">
    <div class="col-12 d-flex align-items-center">
        <div class="col-6">
            <img class="height100 img-fluid w-100" :src="'http://localhost:1337'+curso.imagem.url">
        </div>
        <div class="col-6">
            <p class="cursobold">Curso: {{curso.nome}}</p>
            <hr>
            <p>Preço: <span class="detail">R${{curso.preco}},00</span></p>
            <p>Carga Horária: <span class="detail">{{curso.horas}} Horas</span></p>
            <p>Categoria: <span class="detail">{{curso.categoria.nome}}</span></p>
            <p>Descrição: <br><span class="detail">{{curso.descricao}}</span></p>
            <button type="submit" class="btn w-100 cardbtn">COMPRAR</button>
            <button class="btn w-100 greybtn mt-2" @click="addToCart(curso)">ADICIONAR AO CARRINHO</button>
        </div>
    </div>
</div>



</template>


<script>
import cursoQuery from '~/apollo/queries/curso/curso'
import { mapMutations } from 'vuex' 


export default {  
   data() {
    return {
       curso: [],
       loading:0
    }
  },
  apollo: {
    $loadingKey: 'loading',
    curso: {
      prefetch: true,
      query: cursoQuery,
      variables () {
        return { id: parseInt(this.$route.params.id) }
      }
    }
  },
  methods:{
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove'
    }),
  }

}
</script>
<style>
.cardbtn{
  background-color:#13411F;
  padding:10px 20px;
  outline:0;
  border:0;
  border-radius:200px;
  color:white;
  box-shadow:2px 2px 5px rgba(0,0,0,0.4);
}
.cardbtn:hover{
  color:#DDDDDD;
}
.height100{
  height:400px!important;
  border-radius:5px;
  box-shadow:2px 2px 5px rgba(0,0,0,0.3);
}
.greybtn{
  background-color: #DDDDDD;
  color:#686868;
  padding:10px 20px;
  outline:0;
  border:0;
  border-radius:200px;
  box-shadow:2px 2px 5px rgba(0,0,0,0.4);

}
.cursobold{
  font-weight:bold;
  font-size:20px;
}
.detail{
  font-weight:bold;
  color:#686868;
}
</style>
