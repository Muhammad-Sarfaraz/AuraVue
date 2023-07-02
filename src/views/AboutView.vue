<template>
  <div class="about">
    <h1>{{ $store.state.about.data.title }}</h1>
    <form>
      <input type="text" v-model="title">
      <button @click.prevent="setTitle(title)">Set title</button>
      <button @click.prevent="del()">Remove Title</button>
      
    </form>
  </div>
</template>

<script>

import { mapState, mapGetters, mapMutations } from 'vuex';
import NotificationService from '@/services/notification.service';
import LoaderService from '@/services/loader.service';

export default{

  computed: {
    ...mapState('about', ['data']),
    ...mapGetters('about', ['getTitle']),
  },

  data(){
    return{
      loader : new LoaderService(this.$loading),
    }
  },

  methods:{
    del() {
      this.$store.dispatch('about/deleteTitle', this.id)
    },
    ...mapMutations('about', ['setTitle']),
  },

  created(){

    // VueX
    this.$store.dispatch('about/getTitle')

    // Show Loader...
    this.loader.show();

    // // hide Loader...
     setTimeout(()=>{
        this.loader.hide();
    },2000)

    // Toastr Notification...
    NotificationService.success("Hey,There");
    NotificationService.error("Hey,There");
    NotificationService.warning("Hey,There");
    NotificationService.info("Hey,There");

    // Progressbar...
    this.$Progress.start()

    fetch('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=7waqfqbprs7pajbz28mqf6vz')
    .then((response) => {
        this.$Progress.finish()
    }, (response) => {
        this.$Progress.fail()
    })
  }
}

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
