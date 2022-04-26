<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleUpdateProfile">
        <div v-if="!successful">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              v-model="profile.name"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="name"
              value="currentUser.username"
            />
            <div
              v-if="submitted && errors.has('name')"
              class="alert-danger"
            >{{errors.first('name')}}</div>
          </div>

          <div class="form-group">
            <label for="DOB">Date of Birth</label>
            <input
              v-model="profile.DOB"
              v-validate="'required'"
              type="date"
              class="form-control"
              name="DOB"
            />
            <div
              v-if="submitted && errors.has('DOB')"
              class="alert-danger"
            >{{errors.first('DOB')}}</div>
          </div>
          
          <div class="form-group">
            <label for="education">Education</label>
            <select name="education" id="education" v-model="profile.education" v-validate="'required'" class="form-control">
                <option disabled>Select</option>
                <option>Software Engineer</option>
                <option>Computer Science</option>
                <option>Information Technology</option>
            </select>
            <div
              v-if="submitted && errors.has('education')"
              class="alert-danger"
            >{{errors.first('education')}}</div>
          </div>
          <div class="form-group">
            <label for="image">Image</label>
            <input
              @change="onFileChange"
              v-validate="'required'"
              type="file"
              class="form-control"
              name="image"
            />
            <div
              v-if="submitted && errors.has('image')"
              class="alert-danger"
            >{{errors.first('image')}}</div>
          </div>
          <div class="form-group">
              <input type="hidden" name="user_id" ref="user_id" id="user_id" :value="currentUser.id">
            <button class="btn btn-primary btn-block">Update</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
import profile from '../models/profile';

export default {
  name: 'UpdateProfile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  data() {
    return {
        test: this.$refs.user_id,
      profile: new profile('', '', '', '', this.test),
      
      submitted: false,
      successful: false,
      message: ''
    };
  },
  methods: {
      onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    handleUpdateProfile() {
        console.log(this.test); return false;
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/updateProfile', this.profile).then(
            data => {
              this.message = data.message;
              this.successful = true;
              this.$router.push('/profile');
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};

</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>