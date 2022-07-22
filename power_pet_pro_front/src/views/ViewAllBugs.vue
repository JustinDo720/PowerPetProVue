<template>
  <section class="hero is-fullheight is-warning">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title is-1">Bugs</p>
        <hr />
        <p class="subtitle">Viewing All Bugs Submitted by Users</p>

        <div class="columns is-centered">
          <div class="column is-8">
            <div class="container">
              <div class="box" v-for="(bug, index) in bugs" :key="index">
                <div class="card">
                  <div v-if="bug.bug_image">
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img :src="bug.bug_image" alt="bug-image">
                      </figure>
                    </div>
                    <div class="card-content">
                      <h3 class="title is-3">
                        Bug ID: #{{ bug.id }}
                      </h3>
                      <h4 class="subtitle is-4">
                        Submitted by: {{ bug.bug_owner_name }}
                      </h4>
                      <h5 class="title is-6 has-text-info" v-if="bug.bug_owner">
                        Status: User {{ bug.bug_owner }} Authenticated
                      </h5>
                      <h5 class="title is-6 has-text-info" v-else>
                        Status: Guest User Unauthenticated
                      </h5>
                      <h5 class="subtitle is-7 has-text-link">
                        Date Submitted: {{ bug.date_added }}
                      </h5>
                      <div class="content">
                        <strong>"{{ bug.bug_message }}"</strong>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="card-header">
                      <p class="title is-3">
                        Bug ID: #{{ bug.id }}
                      </p>
                      <br>
                    </div>
                    <div class="card-content">
                      <h4 class="title is-4">
                        Submitted by: {{ bug.bug_owner_name }}
                      </h4>
                      <h5 class="subtitle is-6" v-if="bug.bug_owner">
                        <strong class="has-text-info">Status: User {{ bug.bug_owner }} Authenticated</strong>
                      </h5>
                      <h5 class="subtitle is-6" v-else>
                        <strong class="has-text-info">Status: Guest User Unauthenticated</strong>
                      </h5>
                      <h5 class="title is-7 has-text-link">
                        Date Submitted: {{ bug.date_added }}
                      </h5>
                      <div class="content">
                        <strong>"{{ bug.bug_message }}"</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <br>
                <button class="button is-outlined is-success is-medium" @click="solved_bug(bug.id)">
                  Solved
                </button>
              </div>
              <br>
              <nav class="pagination" role="navigation" aria-label="pagination" v-if="previous || next">
                <button
                    class="pagination-previous is-disabled"
                    title="This is the first page"
                    @click="get_bugs(previous)"
                >
                  Previous
                </button>
                <button
                    class="pagination-next"
                    @click="get_bugs(next)"
                >
                  Next page
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Cookies from 'cookies-js'
import { toast } from "bulma-toast"

export default{
  name: "ViewAllBugs",
  data(){
    return{
      // base bug api url
      bug_url: 'admin_panel/bugs/view_all_bugs/',
      // take care of pagination
      previous: null,
      next: null,
      bugs: [],
    }
  },
  computed:{
    accessToken(){
      return Cookies('accessToken')
    }
  },
  methods:{
    get_bugs(url){
      axios.get(url, {
        headers:{
          Authorization: `Bearer ${this.accessToken}`
        }
      }).then((response)=>{
        // taking care of pagination
        if(response.data.next){
          this.next = response.data.next
        } else if(response.data.previous){
          this.previous = response.data.previous
        }

        // taking care of adding our bugs to the list
        this.bugs = response.data.results

      })
    },
    solved_bug(bug_id){
      axios.delete(`admin_panel/bugs/view_or_delete_bug/${bug_id}/`,{
        headers:{
          Authorization: `Bearer ${this.accessToken}`
        }
      }).then(response=>{
        toast({
          message: response.data.success,
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
          duration: 6000, // milliseconds
          position: "bottom-right",
        });
      })
    }
  },
  created(){
    this.get_bugs(this.bug_url)
  }
}
</script>