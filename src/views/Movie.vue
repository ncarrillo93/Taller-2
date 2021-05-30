<template>
    <div  class="d-flex container flex-wrap align-items-start bd-highlight">
        <div class="w-100"><h1>{{ pelicula.title }}</h1></div>
        <div class="w-100"><h3>({{ pelicula.original_title }})</h3></div>

    <div class="poster w-40"> <img :src="pelicula.backdrop_path" /></div>    
    <div class="d-flex flex-column bd-highlight mb-" >
        
        <div class="w-100">
                <b-icon icon="star-fill" animation="fade" font-scale="1"></b-icon>
                <div>{{ pelicula.vote_average }}</div>
        </div>

        
        
    <div class="card text-start" > {{ pelicula.overview }}</div>
    </div>
    

  </div>
</template>

<script>
import ApiService from "@/services/api.service";
import Movie from "@/models/Movie";
export default {
  data() {
    return {
      pelicula: {},
    };
  },
  mounted() {
    this.getPelicula();
  },
  methods: {
    async getPelicula() {
      const { data } = await ApiService.getMovie(this.$route.params.id);

      this.pelicula = new Movie(data);
      console.log(this.pelicula.genres);
    },
  },
};
</script>
<style >
.carta {
  background-color: crimson;

}
.poster {
    margin: auto;
    max-height: auto;
    max-width: auto;
    border-radius: 15px;
    box-shadow: 2px;
}
</style>
