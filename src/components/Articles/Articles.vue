<template>
  <div>
    <div>{{articles}}</div>
    <div class="alert alert-danger">{{error}}</div>
  </div>
</template>

<script>
export default {
  name: "Articles",
  data() {
    return {
      articles: [],
      error: ""
    };
  },
  created() {
    if (!localStorage.signedIn) {
      this.$router.replace("/");
    } else {
      this.$http.secured
        .get("/articles")
        .then(response => {
          console.log(response);
          this.articles = response.data;
        })
        .catch(error => {
          this.setError(error, "something went wrong!");
        });
    }
  }
};
</script>

<style></style>
