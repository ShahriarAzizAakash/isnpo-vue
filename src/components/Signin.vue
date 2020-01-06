<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <form class="form-signin" @submit.prevent="signin">
          <h3 class="card-title">Sign In</h3>
          <hr />
          <br />
          <div class="alert alert-danger" v-if="error">{{ error }}</div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email"
              placeholder="email@example.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary mb-3">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  created() {
    this.checkSignedIn();
  },
  updated() {
    this.checkSignedIn();
  },
  methods: {
    signin() {
      this.$http.plain
        .post("/signin", {
          email: this.email,
          password: this.password
        })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error));
    },
    signinSuccessful(response) {
      if (!response.data.csrf) {
        this.signinFailed(response);
        return;
      }
      localStorage.csrf = response.data.csrf;
      localStorage.signedIn = true;
      localStorage.admin = response.data.admin;
      this.error = "";
      if (response.data.admin) {
        this.$router.replace("/article/new");
      } else {
        this.$router.replace("/articles");
      }
    },
    signinFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        "";
      delete localStorage.csrf;
      delete localStorage.signedIn;
    },
    checkSignedIn() {
      if (localStorage.signedIn) {
        this.$router.replace("/article/new");
      }
    }
  }
};
</script>

<style lang="css">
.form-signin {
  width: 70%;
  max-width: 500px;
  padding: 10% 15px;
  margin: 0 auto;
  margin-top: 20px !important;
  padding-top: 20px !important;
}
</style>
