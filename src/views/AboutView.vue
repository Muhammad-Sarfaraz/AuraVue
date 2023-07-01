<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>

import NotificationService from '@/services/notification.service';
export default{
  created(){

    NotificationService.success("Hey,There");
    NotificationService.error("Hey,There");
    NotificationService.warning("Hey,There");
    NotificationService.info("Hey,There");

    
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
