import { ref } from "vue"

export const tilesRotation = ref({
  areRotate: false,
  setAreRotate(bool) {
    this.areRotate = bool
  }
})

export const whiteFlag = ref({
  hasBeenClicked: false,
  setHasBeenClicked(bool) {
    this.hasBeenClicked = bool
  }
})