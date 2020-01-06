<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <form class="form-signup" @submit.prevent="signup">
          <h3 class="card-title">Get Started</h3>
          <hr />
          <br />
          <div class="alert alert-danger" v-if="error">{{ error }}</div>
          <div class="form-group">
            <label for="name">Your Name</label>
            <input
              v-model="name"
              type="company_name"
              class="form-control"
              id="name"
              placeholder="John Snow"
              required
            />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="username"
              type="username"
              class="form-control"
              id="username"
              placeholder="username"
              required
            />
          </div>
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
          <div class="form-group">
            <label for="password">Password Confirmation</label>
            <input
              v-model="password_confirmation"
              type="password"
              class="form-control"
              id="password_confirmation"
              placeholder="Password Confirmation"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary mb-3">Sign up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      username: "",
      name: "",
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
    signup() {
      const user = {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password,
        password_confirmation: this.password_confirmation
      };
      this.$http.plain
        .post("/signup", { user })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error));
    },
    signinSuccessful(response) {
      if (!response.data.csrf) {
        this.signinFailed(response);
        return;
      } else {
        localStorage.csrf = response.data.csrf;
        localStorage.signedIn = true;
        localStorage.admin = response.data.admin;
        this.error = "";
        if (response.data.admin) {
          this.$router.replace("/article/new");
        } else {
          this.$router.replace("/articles");
        }
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
      if (localStorage.signedIn && localStorage.admin) {
        this.$router.replace("/articles/new");
      } else if (localStorage.signedIn && !localStorage.admin) {
        this.$router.replace("/articles");
      } else {
        this.$router.replace("/register");
      }
    }
  }
};
</script>

<style lang="css">
.form-signup {
  width: 70%;
  max-width: 500px;
  padding: 10% 15px;
  margin: 0 auto;
  margin-top: 20px !important;
  padding-top: 20px !important;
}
</style>
