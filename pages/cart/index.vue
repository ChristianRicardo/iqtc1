  <template>
 	<div class="container main-section">
		<div class="row">
  			<div class="col-lg-12 pl-3 mt-5 mb-3">
				<table class="table table-hover border bg-white">
				    <thead style="background: #f5f5f5">
				      	<tr>
					        <th>Curso</th>
					        <th>Preço</th>
					        <th style="width:10%;">Quantidade</th>
					        <th>Subtotal</th>
					        <th>Ação</th>
				      	</tr>
				    </thead>
				    <tbody>
				      	<tr class="center" :key="curso.id" v-for="curso in selectedCursos">
					        <td>
					        	<div class="row">
									<div class="col-lg-2 Product-img">
										<img :src="'http://localhost:1337'+ curso.imagem.url" alt="..." class="img-responsive"/>
									</div>
									<div class="col-lg-10">
										<h5 class="nomargin">{{ curso.nome }}</h5>
										<p style="color:#686868">{{curso.descricao}}</p>
									</div>
								</div>
					        </td>
					        <td>R${{ curso.preco }},00</td>
					        <td style="text-align:center" data-th="Quantity">
								{{curso.quantity}}
							</td>
							<td>R${{curso.preco*curso.quantity}},00</td>
					        <td class="actions" data-th="" style="width:10%;">
								<button class="btn btn-info btn-sm" @click="addToCart(curso)"><span>+</span></button>
								<button class="btn btn-danger btn-sm" @click="removeFromCart(curso)"><span>-</span></button>								
							</td>
				      	</tr>
				    </tbody>
				    <tfoot>
						<tr>
							<td><nuxt-link to="/course" class="btn greybtn"><i class="fa fa-angle-left"></i> Continuar comprando</nuxt-link></td>
							<td colspan="" class="hidden-xs"></td>
							<td style="text-align:center"><strong>Total:</strong></td>
							<td class="hidden-xs text-center" style="width:10%;"><strong>R${{price}},00</strong></td>
							<td><a @click="goToCheckout" class="btn greenbtn">Checkout <i class="fa fa-angle-right"></i></a></td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>
</template>

<script>  
import { mapMutations } from 'vuex'

export default {  
  methods:{
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove'
	}),
	
	goToCheckout() {  
  // Redirect to signin page if not logged in.
  const isConnected = this.$store.getters['auth/username']
  if (!isConnected) {
    this.$router.push('/signin')
    return
  }
  this.$router.push('/checkout')
},
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
.greybtn{
  background-color: #DDDDDD;
  color:#686868;
  outline:0;
  border:0;
  box-shadow:2px 2px 5px rgba(0,0,0,0.4);
  border-radius:4px;
}
.greenbtn{
	background-color:#13411F;
  outline:0;
  border:0;

  color:white!important;
  box-shadow:2px 2px 5px rgba(0,0,0,0.4);
  cursor:pointer;
}
.greybtn:hover{
	color: grey!important;
	transition: 0.3s ease-in-out;
}
.greenbtn:hover{
	color:#f5f5f5!important;
	transition: 0.3s ease-in-out;
}

.Product-img img{
	width: 100%;
}
.main-section{
	font-family: 'Roboto Condensed', sans-serif;
}
</style>