<template>
  <div>
    <div v-if="!hubs">
      <a :href="authUrl">Login</a>
    </div>
    <div v-else>
      <h1>Hubs</h1>
      <div v-for="hub in hubs ? hubs.data : []" :key="hub.id">
        <p>{{hub.attributes.name}}</p>

        <div v-for="project in projects ? projects.data : []" :key="project.id">
          <Project v-bind="{ hub, project }"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { setToken, getAuthenticationUrl, getHubs, getProjects } from "@/forge.js"
import Project from "@/components/Project"

export default {
  name: 'home',
  components: {
    Project
  },
  data () {
    return {
      authUrl: getAuthenticationUrl(),
      hubs: null,
      projects: null,
    }
  },
  beforeRouteEnter (to, from, next) {
    // HACK: we are not using a proper serves to catch call back
    // and Vue router is not propertly formatting query
    if (to.hash) {
      window.location.href = window.location.href.replace("#", "?")
    }
    next()
  },
  methods: {
    authenticate () {
      const accessToken = this.$route.query["access_token"] || localStorage.getItem("access_token")
      if (accessToken) {
        setToken(accessToken)
        return true
      }
    },
  },
  async mounted() {
    if (!this.authenticate()) return
    this.hubs = await getHubs()
    for (let hub of this.hubs.data) {
      this.projects = await getProjects(hub.id)
    }
  }
}
</script>
