<template>
  <div class="about">
    <h1>Lista de Peliculas</h1>
    <div v-if="loading" class="text-center my-3 d-flex justify-content-center">
    </div>
    <div v-else class="row mx-0">
      <div class="col-12">
        <button class="btn btn-primary m-2" :disabled="page == 0" @click="getPeliculas(page - 1)">Anterior</button>
        <button class="btn btn-primary m-2" @click="getPeliculas(page + 1)">Siguiente</button>
      </div>
      <div v-for="peli in peliculas" :key="peli.title" :pokemon="peli">
            {{ peli.title }}
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "@/services/api.service";
import Movie from "@/models/Movie";
export default {
    data(){
        return{
            page: 0,
            loading: true,
            peliculas:[],
        };
    },
    mounted() {
        this.getPeliculas(1);
    },
    methods: {
        async getPeliculas(page){
            this.page = page;
            this.loading = true;
            const {data} = await ApiService.getTopRated(this.page);
            this.peliculas=data.results;
            
            for( let i=0; i<this.peliculas.length;i++){
                //console.log(this.peliculas[i].title);
                this.peliculas[i]=await this.getPelicula(this.peliculas[i].id);
            }
            this.loading = false;
        },
        async getPelicula(id){
            const {data} = await ApiService.getMovie(id);
            return new Movie(data);
        }
    }
}
</script>