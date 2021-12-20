<template>

<header class="em-c-header em-c-header--condensed em-u-margin-bottom-none" role="banner">
  <div class="em-l-container em-c-header__inner">
    <div class="em-c-header__body">
      <div class="em-c-header__title-container">
          <h2 class="em-c-header__title">
            <router-link 
              to="/"
              rel="home"
              class="em-c-header__title-link"
            >vuenity</router-link>

          </h2>
      </div>
      <!-- end em-c-header__left -->
      <button class="em-c-btn em-c-btn--small em-c-btn--inverted em-c-header__nav-btn em-js-nav-trigger">
        <div class="em-c-btn__inner">
          <svg class="em-c-icon em-c-icon--small em-c-btn__icon em-js-btn-icon" data-em-btn-toggle-text="Close" data-em-icon-path="../../public/images/em-icons.svg">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../../public/images/em-icons.svg#hamburger"></use>
          </svg>
          <svg class="em-c-icon em-c-icon--small em-c-btn__icon em-u-is-hidden em-js-btn-swap-icon" data-em-icon-path="../../public/images/em-icons.svg">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="../../public/images/em-icons.svg#x-filled"></use>
          </svg>
          <span class="em-c-btn__text em-js-btn-label">Menu</span>
        </div>
      </button>
      <!-- end em-c-btn -->
      <div class="em-c-header__nav-container em-js-nav-panel">
        <nav id="nav" class="em-c-primary-nav" role="navigation">
          <ul class="em-c-primary-nav__list">
              <li class="em-c-primary-nav__item ">
                <router-link
                  tag="a"
                  class="em-c-primary-nav__link "
                  to="/"
                  active-class="em-is-current"
                  exact
                >Home</router-link>
              </li>

              <!-- end em-c-nav__list__item -->
              <li class="em-c-primary-nav__item ">
                <router-link
                  tag="a"
                  class="em-c-primary-nav__link "
                  to="/about"
                  active-class="em-is-current"
                  exact
                >About</router-link>
              </li>

                <li class="em-c-primary-nav__item ">
                <router-link
                  tag="a"
                  class="em-c-primary-nav__link "
                  to="/about"
                  active-class="em-is-current"
                  exact
                >Contact  </router-link>
              </li>
          </ul>
          <!-- end em-c-nav__list -->
        </nav>
        <!-- end em-c-nav -->
      </div>
      <!-- end em-c-header__nav -->
    </div>
    <!-- end em-c-header__body -->
  </div>
  <!-- end em-l-container -->
</header>
<!-- end em-c-header -->
<!-- uncoment the following when using SPA (e.g. Angular, React, etc). For traditional websites, Unity JS handles this automagically :) -->
<!-- <div class="em-c-header-overlay"></div> -->

</template>

<script>
export default {
  data () {
    return {};
  }
};
</script>

<style scoped>
</style>
