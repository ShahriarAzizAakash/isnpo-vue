<template>
  <div class="container">
    <div class="alert alert-danger" v-if="error">{{error}}</div>
    <h2>Articles</h2>
    <hr />
    <br />
    <div v-for="article in articles" :key="article.id">
      <h3 class="card-title">Title: {{article.title}}</h3>
      <p>Description: {{article.description}}</p>
      <br />
    </div>
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
      this.getArticles();
    }
  },
  methods: {
    getArticles() {
      this.$http.plain
        .get("/api/v1/articles")
        .then(response => {
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
