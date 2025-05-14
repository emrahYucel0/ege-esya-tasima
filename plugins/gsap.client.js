import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger)
  // Register other plugins as needed
  
  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  }
})