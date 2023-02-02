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
      await post.save()
      res.status(200).send({
        response_type: 'in_channel',
        text: 'TIL is saved successfully!',
      })
    } else if (req.method === 'GET') {
      const { page, limit } = req.query
      const totalCount = await Posts.count({})
      const posts = await Posts.find(
        {},
        {},
        { skip: (Number(page) - 1) * limit, limit: Number(limit) }
      )
      res.status(200).send({ data: posts, totalCount })
    }
  } catch (err) {
    console.error(err)
    res.status(400).send('Error with api' + err)
  }
}

export default connectDB(handler)
