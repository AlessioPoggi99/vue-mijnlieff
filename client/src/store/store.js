import { ref } from "vue"

export const tilesRotation = ref({
  areRotate: false,
  setAreRotate(bool) {
    this.areRotate = bool
  }
})