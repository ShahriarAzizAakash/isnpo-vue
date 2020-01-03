<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/" class="navbar-brand"
          ><img src="../assets/logo.png" alt="ISNPO Logo" style="width: 120px"
        /></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link" v-if="!signedIn()"
                >Sign In</router-link
              >
            </li>
            <li class="nav-item active">
              <router-link to="/register" class="nav-link" v-if="!signedIn()"
                >Sign Up</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  created() {
    this.signedIn();
  },
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    signedIn() {
      return localStorage.signedIn;
    },
    signOut() {
      this.$http.secure
        .delete("/logout")
        .then(response => {
          delete localStorage.csrf;
          delete localStorage.signedIn;
          this.$router.replace("/");
          return response;
        })
        .catch(error => this.setError(error, "Cannot Sign Out"));
    }
  }
};
</script>

<style></style>
