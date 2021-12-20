<template>
  <!--
Text passage
https://unity.exxonmobil.com/components/text/body-text.html
  -->
  <div v-bind="$attrs" class="em-c-text-passage">
    <slot></slot>
  </div>
</template>

<script>
import smIcons from "../../../public/images/em-icons.svg";

export default {
  name: "vuTextPassage",
  props: {
    external: {
      default: false,
      type: Boolean
    }
  },
  mounted() {
    // exit function if external == false
    if (!this.external) {
        return
    }

      let links = []
      let httpRegex = /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i

      this.$slots.default.forEach(() => {
        links = this.$slots.default.filter(item => {
          // filter any elements with the a href tag
          return item.elm.outerHTML.match(httpRegex);
        })
      })

      if (links) {
        // if any links found
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg") //Create new <svg> element
        svg.setAttribute("class", "em-c-icon") //Apply Unity icon class to element

        var use = document.createElementNS("http://www.w3.org/2000/svg", "use") //Create <use> element
        use.setAttributeNS(
          "http://www.w3.org/1999/xlink", // xlink namespace URI
          "href", // attribute (no 'xlink:' required)
          smIcons + "#icon-external-link"
        ); // value to set
        svg.appendChild(use) //Append <use> to <svg>

        links.forEach(link => {
          link.elm.appendChild(svg)
        })
    }
  }
}
</script>
