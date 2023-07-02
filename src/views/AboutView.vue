<template>
  <master>
    <template v-slot:content>
      <div class="col-3">
        <section class="about">
          <div class="intro">
            <div class="intro-inner">
              <div class="text">
                <h1>About</h1>
              </div>
            </div>
          </div>
          <p>Examples are given below:</p>
        </section>

        <h3>VueX:</h3>
        <h4>Title: {{ $store.state.about.data.title }}</h4>
           <form>
            <input type="text" v-model="title">
            <button @click.prevent="setTitle(title)">Set title</button>
            <button @click.prevent="del()">Remove Title</button>
          </form>
      </div>
    </template>
  </master>
</template>

<script>

import { mapState, mapGetters, mapMutations } from 'vuex';
import NotificationService from '@/services/notification.service';
import LoaderService from '@/services/loader.service';
import master from './layout/master.vue';

export default {
  components: {
    master
  },
  computed: {
    ...mapState('about', ['data']),
    ...mapGetters('about', ['getTitle']),
  },

  data() {
    return {
      loader: new LoaderService(this.$loading),
    }
  },

  methods: {
    del() {
      this.$store.dispatch('about/deleteTitle', this.id)
    },
    ...mapMutations('about', ['setTitle']),
  },

  created() {

    // VueX
    this.$store.dispatch('about/getTitle')

    // Show Loader...
    this.loader.show();

    // // hide Loader...
    setTimeout(() => {
      this.loader.hide();
    }, 2000)

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


