<template>
  <main class="main" style="background: #f9f9f9">
    <section>
      <vu-container padding="2rem 4rem 3rem">
        <vu-section underline blue>IT Service Request Links</vu-section>

        <ul class="em-c-card-list em-l-grid em-l-grid--4up">
          <li
            class="em-c-card-list__item em-l-grid__item"
            v-for="(link, index) in links"
            :key="index"
          >
            <div class="em-c-card">
              <a :href="link.linkURL" :target="link.target">
                <div class="em-c-card__body">
                  <div class="em-c-media-block em-c-media-block--small">
                    <div
                      class="em-c-media-block__media"
                      v-if="link.backgroundImageURL"
                    >
                      <img
                        :src="link.backgroundImageURL"
                        :alt="link.backgroundImage"
                        class="em-c-media-block__img em-c-avatar"
                      />
                    </div>
                    <div class="em-c-media-block__body">
                      <h4 class="em-c-media-block__headline">
                        {{ link.title }}
                      </h4>
                      <p class="em-c-media-block__desc">
                        {{ link.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </vu-container>
    </section>
  </main>
</template>

<script>
import SPLinks from "../services/SharePointLinks";

export default {
  data() {
    return {
      links: [],
    };
  },
  mounted() {
    // Need to bring in some data?
  },
  created() {
    SPLinks.getAllLinks().then((res) => {
      this.links = res.sort((a, b) => {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      });
    });
  },
  methods: {
    // Perhaps a method or two?
  },
};
</script>

<style scoped>
.em-c-card:hover {
  background: #cfe4f2;
}

.em-c-card {
  border: 1px solid #f5f5f5;
}

.em-c-avatar {
  border-radius: 10%;
}
</style>
