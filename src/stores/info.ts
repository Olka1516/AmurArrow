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
      text: "I didn't believe that I would be able to find my soulmate online, but this platform impressed me! Here I met fun and interesting people, and one of them became my lover. Thank you for changing my life!",
      id: 1
    },
    {
      text: 'I was looking for a relationship for a long time, but I did not find what I was looking for. Thanks to this platform, I met a beautiful woman with whom we share many interests. Now my heart belongs to her.',
      id: 2
    },
    {
      text: 'Everything started naturally, but it turned out unexpectedly cool! I met my girlfriend here, and now we are planning a future together. Thank you for being you and helping people find love.',
      id: 3
    }
  ])

  const accordion = ref([
    {
      title: 'Is this platform safe to use?',
      text: 'Yes, our site uses advanced technologies to protect personal information and ensure the safety of users.',
      id: 1
    },
    {
      title: 'Are there real questionnaires here?',
      text: 'Yes, we do a thorough background check to ensure the authenticity and seriousness of our users.',
      id: 2
    },
    {
      title: 'What features make our platform unique?',
      text: 'We offer innovative tools to facilitate dating and facilitate deeper communication between users.',
      id: 3
    },
    {
      title: 'How to get support if needed?',
      text: 'Our support team is available 24/7. Contact us and we are ready to help you at any time.',
      id: 4
    }
  ])

  return { info, review, accordion }
})
