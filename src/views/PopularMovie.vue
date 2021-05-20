<template>
  <div class="about">
    <head>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
        crossorigin="anonymous"
      />
    </head>
    <body>
      <h1>Lista de Peliculas</h1>

      <div class="d-flex justify-content-around flex-wrap" style="span: 3px">
        <b-card 
          img-top
          style="max-width: 182px;"
          class="btn" v-for="peli in peliculas" :key="peli.title" :peliculas="peli" v-b-modal.modal-center >
          <img class="card-img-top" style="max-height: 180 px; max-width: 180px" :src="peli.poster_path" :alt="peli.original_title"/>
          <div>
            {{ peli.original_title }}
          </div>
          <div>
            
            <span class="material-icons">star</span>
            {{ peli.vote_average }}
          </div>
        </b-card>   
      </div>

      

      <div v-if="loading" class="text-center my-3 d-flex justify-content-center" >
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
      <div v-else class="row mx-0">
        <div class="col-12">
          <button class="btn btn-primary m-2" @click="getPeliculas(page.length + 1)" >ver Mas</button>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
//import MovieCard from "@/models/MovieCard";
import ApiService from "@/services/api.service";
import Movie from "@/models/Movie";
export default {
  data() {
    return {
      page: [],
      loading: true,
      aux: [],
      peliculas: [],
    };
  },
  mounted() {
    this.getPeliculas(1);
  },
  methods: {
    async getPeliculas(page) {
      this.page = this.page.concat(page);
      this.loading = true;
      for (let i = 0; i < this.page.length; i++) {
        const { data } = await ApiService.getPopular(this.page[i]);
        this.aux = data.results;
        for (let j = 0; j < this.aux.length; j++)
          this.aux[j] = await this.getPelicula(this.aux[j].id);
      }
      this.peliculas = this.peliculas.concat(this.aux);
      this.loading = false;
    },

    async getPelicula(id) {
      const { data } = await ApiService.getMovie(id);
      return new Movie(data);
    },
  },
};
</script>