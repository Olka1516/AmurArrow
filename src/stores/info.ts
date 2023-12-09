import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', () => {
  const info = ref([
    {
      title: 'Wide selection of profiles',
      text: 'We have a variety of user profiles from different parts of the world. There is a place for everyone looking for love or just having fun.',
      id: 1
    },
    {
      title: 'Security and Privacy',
      text: 'We care about your security and privacy. Your data is protected and will not be passed on to third parties. Thus, you can enjoy the dating process without any extra worries.',
      id: 2
    },
    {
      title: 'Intelligent selection of partners',
      text: 'Our algorithms take into account your interests, hobbies, and personality, so that each acquaintance is as successful and pleasant as possible.',
      id: 3
    }
  ])

  const review = ref([
    {
      text: 'AmurArrow’s prompts really made the difference—I felt like I got a good sense of a guy’s vibe from his answers, and it was easy to jump right into a real conversation.',
      id: 1
    },
    {
      text: 'Thank you AmurArrow! We’re getting married in a few months!',
      id: 2
    },
    {
      text: 'Other dating apps were like shooting fish in a barrel. But my girlfriend and I clicked right away on AmurArrow, and the conversation was effortless. We’ve been together for over a year.',
      id: 3
    }
  ])

  return { info, review }
})
