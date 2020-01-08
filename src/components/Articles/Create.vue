<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form class="form-create" @submit.prevent="create">
          <h3 class="card-title">Create Article</h3>
          <hr />
          <br />
          <div class="alert alert-danger" v-if="error">{{ error }}</div>
          <div class="alert alert-success" v-if="sucessful">{{ sucessful }}</div>
          <div class="form-group">
            <label for="title">Title</label>
            <input
              v-model.lazy="title"
              type="title"
              class="form-control"
              id="title"
              placeholder="CISCO Global Problem Solver Challenge 2020 ..."
              required
            />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              v-model.lazy="description"
              type="text"
              rows="4"
              class="form-control"
              id="description"
              placeholder="The fourth annual Cisco Global Problem Solver Challenge aims to recognize new business ideas ..."
              required
            />
          </div>
          <div class="form-group">
            <label for="deadline">Deadline</label>
            <input v-model="deadline" type="date" class="form-control" id="deadline" required />
          </div>
          <div class="form-group">
            <label for="country">Country</label>
            <input
              v-model.lazy="country"
              type="country"
              class="form-control"
              id="country"
              placeholder="Bangladesh ..."
              required
            />
          </div>
          <div class="form-group">
            <label for="typeofscholarship">Type of Scholarship</label>
            <input
              v-model.lazy="typeofscholarship"
              type="typeofscholarship"
              class="form-control"
              id="typeofscholarship"
              placeholder="Fully Funded ..."
              required
            />
          </div>
          <div class="form-group">
            <label for="institute">Name of Institution</label>
            <input
              v-model.lazy="institute"
              type="institute"
              class="form-control"
              id="institute"
              placeholder="Harvard University ..."
              required
            />
          </div>
          <div class="form-group">
            <label for="benefits">Benefits</label>
            <input
              v-model.lazy="benefits"
              type="text-area"
              class="form-control"
              id="benefits"
              placeholder="$500 monthly allowance, etc etc ..."
              required
            />
          </div>
          <div class="form-group">
            <label for="eligibilities">Eligibilities</label>
            <input
              v-model.lazy="eligibilities"
              type="text-area"
              class="form-control"
              id="eligibilities"
              placeholder="IELTS Score: 6.5, Graduation: Bachelors of Science ..."
              required
            />
          </div>
          <div class="form-group">
            <label for="process">Process</label>
            <input
              v-model.lazy="process"
              type="text-area"
              class="form-control"
              id="process"
              placeholder="Step 1: Go to university website ..."
              required
            />
          </div>
          <div class="form-group">
            <label for="url">URL</label>
            <input
              v-model.lazy="url"
              type="url"
              class="form-control"
              id="url"
              placeholder="http://www.OfficialLinkForApplying.com"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary mb-3">Submit</button>
        </form>
      </div>

      <div class="col render" v-if="!isMobile()">
        <div v-if="title">
          <h3 class="card-title">{{title}}</h3>
          <hr />
        </div>
        <div v-if="description">
          <p>Description: {{description}}</p>
        </div>
        <div v-if="deadline">
          <p>Deadline: {{deadline}}</p>
        </div>
        <div v-if="country">
          <p>Country: {{country}}</p>
        </div>
        <div v-if="institute">
          <p>Institute: {{institute}}</p>
        </div>
        <div v-if="typeofscholarship">
          <p>Type of Scholarship: {{typeofscholarship}}</p>
        </div>
        <div v-if="benefits">
          <p>Benefits: {{benefits}}</p>
        </div>
        <div v-if="eligibilities">
          <p>Eligibilities: {{eligibilities}}</p>
        </div>
        <div v-if="process">
          <p>Procedure: {{process}}</p>
        </div>
        <div v-if="url">
          <p>Official Website: {{url}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Create",
  data() {
    return {
      title: "",
      description: "",
      deadline: "",
      country: "",
      institute: "",
      typeofscholarship: "",
      benefits: "",
      eligibilities: "",
      process: "",
      url: "",
      error: "",
      sucessful: ""
    };
  },
  created() {
    this.checkSignedIn();
  },
  updated() {
    this.checkSignedIn();
  },

  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    create() {
      event.preventDefault();
      const article = {
        title: this.title,
        description: this.description,
        deadline: this.deadline,
        country: this.country,
        institute: this.institute,
        typeofscholarship: this.typeofscholarship,
        benefits: this.benefits,
        eligibilities: this.eligibilities,
        process: this.process,
        url: this.url
      };
      this.$http.secured
        .post("/api/v1/articles", { article: article })
        .then(response => {
          this.createSuccessful(response);
        })
        .catch(error => this.createFailed(error));
    },
    createSuccessful(response) {
      if (response.status == 201 || response.status == 200) {
        this.sucessful = "Success! " + response.data.title + " Created!";
      } else {
        this.createFailed(response);
        return;
      }
    },
    createFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        "";
    },
    checkSignedIn() {
      if (localStorage.signedIn) {
        if (localStorage.admin === localStorage.signedIn) {
          this.$router.replace("/article/new");
        } else {
          this.$router.replace("/articles");
        }
      } else {
        this.$router.replace("/");
      }
    }
  }
};
</script>

<style lang="css">
.form-create {
  width: 70%;
  max-width: 500px;
  padding: 10% 15px;
  margin: 0 auto;
  margin-top: 20px !important;
  padding-top: 20px !important;
}

.render {
  width: 70%;
  max-width: 500px;
  padding: 10% 15px;
  margin: 0 auto;
  padding-right: 10px !important;
  margin-top: 20px !important;
  padding-top: 20px !important;
}
</style>
