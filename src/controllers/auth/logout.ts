import { Request, Response } from 'express'
import User from '../../models/User'

export default async function logout(req: Request, res: Response) {
  try {
    const _id = req.session.user?._id

    const user = await User.findOne({ _id })

    if (!user)
      return res.status(400).json({
        success: false,
        msg: 'Bad request',
      })

    req.session.destroy(() => {})

    return res.status(200).json({
      success: true,
      msg: 'You have been successfully logged out',
    })
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: 'Bad request',
    })
  }
}
