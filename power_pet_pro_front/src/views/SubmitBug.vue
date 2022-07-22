<template>
  <section class="hero is-fullheight is-warning">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title is-1">
          Submit a Bug
        </p>
        <hr>
        <p class="subtitle">
          Please let me know what went wrong and provide a picture of where it happened.
        </p>

        <div class="columns is-centered">
          <div class="column is-5">
            <form class="box" @submit.prevent="submit_bug">
              <figure class="image is-128x128 is-inline-block">
                <img
                    class="is-square"
                    alt="ppp-logo"
                    src="../assets/ppp_logo.jpg"
                />
              </figure>
              <div class="field">
                <h1 class="title is-4">
                  First Name
                </h1>
                <div class="control is-large">
                  <input class="input is-link" type="text" placeholder="First Name" v-model="user_name">
                </div>
                <h1 class="title is-4">
                  Bug Details
                </h1>
                <p class="help has-text-info">
                  * A step by step explanation of what you did would be very helpful so I could retrace your steps and
                  recreate the problem *
                </p>
                <div class="control is-large">
                  <textarea class="textarea is-medium"
                            placeholder="Any information that led you to the problem"
                            v-model="bug_details"
                  >
                  </textarea>
                </div>
                <br>
                <div id="file-js-example" class="file has-name is-centered">
                  <label class="file-label">
                    <input
                        class="file-input"
                        type="file"
                        name="resume"
                        @change="onFileSelected"
                    />
                    <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Choose a file… </span>
                  </span>
                    <span class="file-name"> {{ file_name }}</span
                    >&nbsp;
                    <span>
                    <button
                        class="button is-danger is-outlined"
                    >
                      <span>Remove File </span>
                      <span class="icon is-small">
                        <i class="fas fa-times"></i>
                      </span>
                    </button>
                  </span>
                  </label>
                </div>
                <br>
                <button class="button is-success is-outlined">
                  Submit
                </button>
                <div>
                  <p class="help is-danger" v-if="err">
                    Please fill in your First Name and Bug Details. A Picture is NOT required!! Thank you
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Bug Modal -->
    <div class="modal" :class="{'is-active': showBug}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <!-- Any other Bulma elements you want -->
        <div class="box has-background-success">
          <div class="content is-large">
            <h1>
              Thank you for submitting a bug report!
            </h1>
            <div class="box">
              <h1 class="title is-4">
                Bug Report #{{ showBugInfo.id }}
              </h1>
              <h2 class="subtitle is-5">
                Submitted by: {{ showBugInfo.bug_owner_name }}
              </h2>
              <p>
                <strong>
                  "{{ showBugInfo.bug_message }}"
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeBugInfo()"></button>
    </div>

  </section>
</template>
<script>
import {mapState} from 'vuex'
import Cookies from 'cookies-js'
import axios from 'axios'
import { toast }from 'bulma-toast'

export default{
  name: "SubmitBug",
  data(){
    return{
      user_name: "",
      bug_details: "",
      file_name: "None Selected",
      bug_image: null,
      err: false,
      showBug: false,
      showBugInfo: {},
    }
  },
  computed:{
    ...mapState(['accessToken'])
  },
  methods:{
    onFileSelected(event){
      // we have to have an event as our parameter and search through it for our image
      this.bug_image = event.target.files[0]    // this allows us to set bug_image as our image file
      this.file_name = this.bug_image.name  // once we have the file obj as bug_image we could access the file name
    },
    remove_file(){
      // resetting the modified data from getting an img
      this.file_name = "None Selected";
      this.bug_image = null
    },
    submit_bug(){
      // to submit images we need fd (Form data)
      if(this.user_name && this.bug_details){
        this.err = false
        const fd = new FormData();
        fd.append("bug_message", this.bug_details)
        fd.append("bug_owner_name", this.user_name)
        if(this.bug_image){
          fd.append("bug_image", this.bug_image)
        }
        if(this.accessToken){
          fd.append("bug_owner", Cookies('user_id'))
        }
        let axios_posting = {
          url: "bugs/submit_bug/",
          method: "POST",
          data: fd
        }
        axios(axios_posting).then((response)=>{
          toast({
            message: "Thank you for the bug report. I will be checking it out soon :)",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
            duration: 6000, // milliseconds
            position: "bottom-right",
          })
          if(this.accessToken){
            // if the user is authenticated then we can push them to their profile showing the bug report
            this.$router.push({name:"Profile", params:{'showBug':"true"}})
          } else {
            this.showBug = !this.showBug
            this.showBugInfo = response.data
          }

        })
      } else {
        this.err = true
      }
    },
    closeBugInfo(){
      this.showBug = !this.showBug
      this.$router.push({name:"Home"})
    }
  },
  created(){
    if(Cookies('accessToken')){
      // we have a user so we could just set User_name as their username
      this.user_name = Cookies('username')
    }
  }
}
</script>