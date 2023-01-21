import connectDB from '../../middleware/connectDb'
import Posts from '../../models/postModel'

const handler = async (req: any, res: any) => {
  try {
    if (req.method === 'POST') {
      const { text, user_name } = req.body
      const post = new Posts({
        content: text,
        user: user_name,
      })
      const userCreated = await post.save()
      console.log(userCreated)
      res.status(200).send({
        response_type: 'in_channel',
        text: 'TIL is saved successfully!',
      })
    } else if (req.method === 'GET') {
      const posts = await Posts.find({})
      res.status(200).send({ data: posts })
    }
  } catch (err) {
    console.error(err)
    res.status(400).send('Error with api' + err)
  }
}

export default connectDB(handler)
