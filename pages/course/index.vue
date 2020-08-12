  <template>
  <div v-if="!loading" id="courses">
    <div class="my-5">
      <h1 class="text-center">CERTIFICADOS POR COMPETÊNCIA PROFISSIONAL</h1>
          <ul class="categorylist mt-5">
            <li v-for="categoria in categorias" v-bind:key="categoria.id">
              <a class="categorybtn">{{categoria.nome}}</a>
            </li>
          </ul>
      <div class="container-fluid">

        <form class="form-inline w-100 justify-content-center my-2 mt-4">
          <input v-model="search" class="form-control w-50" type="text" placeholder="Qual certificado você procura?" aria-label="Search">
        </form>


     
        <ul v-if="search">
          <li v-bind:key="curso.id" v-for="curso in filteredList">
            <nuxt-link :to="{name: 'course-id', params:{id: curso.id}}">
              <div class="card">
                <img class="card-img-top" :src="'http://localhost:1337'+curso.imagem.url" alt="Card image cap">
                <div class="card-body">
                  <p class="firstp">{{curso.categoria.nome}}</p>
                  <h5>{{curso.nome}}</h5>
                  <p class="hoursp">{{curso.horas}} Horas</p>
                  <p class="lastp">R${{curso.preco}},00</p>
                </div>
                <button type="submit" class="w-100 cardbtn">QUERO SABER MAIS</button>
              </div>
            </nuxt-link>
          </li>
        </ul>

        <ul v-if="!search">
          <li v-bind:key="curso.id" v-for="curso in filteredbyCategory">
            <nuxt-link :to="{name: 'course-id', params:{id: curso.id}}">
              <div class="card">
                <img class="card-img-top" :src="'http://localhost:1337'+curso.imagem.url" alt="Card image cap">
                <div class="card-body">
                  <p class="firstp">{{curso.categoria.nome}}</p>
                  <h5>{{curso.nome}}</h5>
                  <p class="hoursp">{{curso.horas}} Horas</p>
                  <p class="lastp">R${{curso.preco}},00</p>
                </div>
                <button type="submit" class="w-100 cardbtn">QUERO SABER MAIS</button>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </template>
  <script>


import cursosQuery from '~/apollo/queries/curso/cursos'
import categoriasQuery from '~/apollo/queries/categoria/categorias'

    export default {
        data(){
            return{
              cursos:[],
              categorias:[],
              catactive: '',
              query: '',
              loading:0,
              search: ''
            }
        },
        apollo: {
        $loadingKey: 'loading',
        cursos: {
          prefetch: true,
          query: cursosQuery
        },
        categorias: {
          prefetch:true,
          query:categoriasQuery
        }
      },

        computed: {
           filteredList(){
            return this.cursos.filter(curso => {
              return curso.nome.toLowerCase().match(this.search.toLowerCase())
            })
          },
          filteredbyCategory(){
            return this.cursos.filter(curso=> {
              return curso.categoria.nome.toLowerCase().match(this.catactive)
            })
          }
        }

    }
  </script>
  <style>
    .categorylist{
      background:#F5F5F5;
    }
    .categorybtn{
      font-weight:normal;
      color:#686868;
      text-decoration:underline!important;
    }
    .categorybtn:hover{
      color:#FBD400!important;
      transition: 0.2s ease-in-out;
    }
    .card-body{
  color:black;
}
.card-img-top{
  height:150px!important;
}
.firstp{
  color:#FBD400!important;
}
.hoursp{
  color:#686868;
}
.lastp{
  font-weight:bold;
  font-size:18px;
}

  #courses ul{
  list-style:none;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
}

#courses ul li{
  margin: 20px 20px;
}
#courses ul li .card{
  width:15rem;
  border:0;
}

.cardbtn{
  background-color:#13411F;
  padding:10px 20px;
  outline:0;
  border:0;
  border-radius:200px;
  color:white;
}

  </style>