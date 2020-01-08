<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/" class="navbar-brand" v-if="!isSignedIn">
          <img src="../assets/logo.png" alt="ISNPO Logo" style="width: 120px" />
        </router-link>
        <router-link to="/articles" class="navbar-brand" v-if="isSignedIn">
          <img src="../assets/logo.png" alt="ISNPO Logo" style="width: 120px" />
        </router-link>
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
            <li class="nav-item">
              <router-link to="/" class="nav-link" v-if="!isSignedIn">Sign In</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link" v-if="!isSignedIn">Sign Up</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/article/new" class="nav-link" v-if="checkAdmin()">Create Article</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="isSignedIn" class="nav-link" to="/">
                <ui-button @click="signOut">Sign out</ui-button>
              </router-link>
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
    this.checksignedIn();
  },
  data() {
    return {
      isSignedIn: false
    };
  },
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    checkAdmin() {
      if (this.isSignedIn) {
        if (localStorage.admin === this.isSignedIn) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    checksignedIn() {
      this.isSignedIn = localStorage.signedIn;
      return this.isSignedIn;
    },
    signOut() {
      if (localStorage.signedIn) {
        this.$http.secured
          .delete("/logout")
          .then(response => {
            delete localStorage.csrf;
            delete localStorage.signedIn;
            localStorage.admin = false;
            this.$router.replace("/");
            return response;
          })
          .catch(error => this.setError(error, "Cannot sign out"));
      }
    }
  }
};
</script>

<style></style>
