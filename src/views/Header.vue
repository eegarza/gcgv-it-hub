<template>
  <header
    class="
      em-c-header em-c-header--white em-c-header--condensed
      em-u-margin-bottom-none
    "
    role="banner"
  >
    <div class="em-l-container em-c-header__inner">
      <div class="em-c-header__body">
            <!-- <router-link to="/" rel="home" class="em-c-header__title-link"
              > -->
              <img src="../../public/images/logo.png" class="logo"/>
              <span class="">  Gulf Coast Growth Ventures</span>
              <!-- </router-link
            > -->
        <!-- <button
          class="
            em-c-btn em-c-btn--small em-c-btn--inverted
            em-c-header__nav-btn
            em-js-nav-trigger
          "
        >
          <div class="em-c-btn__inner">
            <svg
              class="em-c-icon em-c-icon--small em-c-btn__icon em-js-btn-icon"
              data-em-btn-toggle-text="Close"
              data-em-icon-path="../../public/images/em-icons.svg"
            >
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="../../public/images/em-icons.svg#hamburger"
              ></use>
            </svg>
            <svg
              class="
                em-c-icon em-c-icon--small
                em-c-btn__icon
                em-u-is-hidden em-js-btn-swap-icon
              "
              data-em-icon-path="../../public/images/em-icons.svg"
            >
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="../../public/images/em-icons.svg#x-filled"
              ></use>
            </svg>
            <span class="em-c-btn__text em-js-btn-label">Menu</span>
          </div>
        </button>
        <div class="em-c-header__nav-container em-js-nav-panel">
          <nav id="nav" class="em-c-primary-nav" role="navigation">
            <ul class="em-c-primary-nav__list">
              <li class="em-c-primary-nav__item">
                <router-link
                  tag="a"
                  class="em-c-primary-nav__link"
                  to="/"
                  active-class="em-is-current"
                  exact
                  >Home</router-link
                >
              </li>
            </ul>
          </nav>
        </div> -->
      </div>
    </div>
    <!-- <div class="em-c-header-overlay"></div> -->
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
header {
  padding: 0.5rem;
}

.em-c-header--white {
  background-color: #e9e9e9;
  background-image: none;
}
.em-c-header__body span {
  font-weight: 600;
  font-size: 1.1rem;
  color: rgb(20, 33, 92);
}

.logo {
  max-width: 3.5rem !important;
  margin-right: 10px;
  mix-blend-mode:color-burn;
  mix-blend-mode: darken;
}

.em-c-header__title-link {
  font-size: 2.1rem;
}
</style>
