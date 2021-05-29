<template>
    <div>
        <b-card
            overlay
            img-src="https://picsum.photos/900/250/?image=3"
            img-alt="Card Image"
            text-variant="white"
            title="Image Overlay"
            sub-title="Subtitle"
        >
            <b-row>
                <b-col cols="12" md="8" align-self="end">{{pelicula.title}}({{pelicula.original_title}})</b-col>
                <b-col align-self="end"></b-col>
            </b-row>
            <b-card-text>
                <span class="material-icons">star</span>
                {{ pelicula.vote_average }}
            </b-card-text>
        </b-card>
</div>
</template>

<script>
    import ApiService from "@/services/api.service";
    import Movie from "@/models/Movie";
    export default {
        data() {
            return {
            pelicula:{},
            };
        },
        mounted() {
            this.getPelicula();
        },
        methods: {
            async getPelicula() {
                const { data } = await ApiService.getMovie(this.$route.params.id);
                this.pelicula = new Movie(data);
            },
        },
    };
</script>
