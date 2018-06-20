import { Factory } from 'rosie'

export const Joke = new Factory()
  .sequence('id')
  .attrs({
    joke: 'Chuck Norris crossed the road. No one has ever dared question his motives.',
  })
