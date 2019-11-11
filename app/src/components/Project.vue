<template>
  <div>
      <h4>{{ project.attributes.name }}</h4>
      <div v-for="content in content.data" :key="content.id">
        <p><a href="#" @click="downloadFile(content.attributes.displayName, content.id)">
          {{ content.attributes.displayName }}
        </a></p>
      </div>
  </div>

</template>

<script>

import { getFolders, getContents, getItem, getResource } from "@/forge.js"
import { saveData } from '@/utils.js'

export default {
  name: 'home',
  props: ["hub", "project"],
  data () {
    return {
      content: []
    }
  },
  async mounted() {
      const folders = await getFolders(this.hub.id, this.project.id)
      for (let folder of folders.data) {
        this.content = await getContents(this.project.id, folder.id)
      }
  },
  methods: {
    downloadFile(filename, itemId) {
      getItem(this.project.id, itemId)
        .then(response => {
          const url = response.included[0].relationships.storage.meta.link.href
          getResource(url)
            .then(response => {
              response.blob().then(blob => {
                saveData(blob, filename)
              })
            })

        })
    }
  }
}
</script>
