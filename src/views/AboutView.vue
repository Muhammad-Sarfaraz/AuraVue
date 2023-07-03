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
import HttpAdapter from '@/services/adapters/http.adapter';

export default {
  components: {
    master
  },
  computed: {
    ...mapState('about', ['data']),
    ...mapGetters('about', ['getTitle']),
    http(){
      const adapter = new HttpAdapter(this.$Progress);
      return adapter.http();
    },
    loader(){
      return new LoaderService(this.$loading);
    }
  },

  data() {
    return {
    }
  },

  methods: {
    del() {
      this.$store.dispatch('about/deleteTitle', this.id)
    },
    ...mapMutations('about', ['setTitle']),
  },

  created() {

    // Custom Plugins...
    console.log(this.$world.execute());

    // Http...
    this.http.get('https://jsonplaceholder.typicode.com/todos/1')

    // VueX...
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

    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => {
        this.$Progress.finish()
      }, (response) => {
        this.$Progress.fail()
      })
  }
}

</script>


