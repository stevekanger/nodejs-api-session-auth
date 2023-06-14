import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../../models/User'

export default async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user || !user.verified) {
      return res.status(401).json({
        success: false,
        msg: 'Unauthorized',
      })
    }

    const compared = await bcrypt.compare(password, user.password)

    if (!compared) {
      return res.status(401).json({
        success: false,
        msg: 'Unauthorized',
      })
    }

    req.session.user = {
      _id: user._id.toString(),
    }

    return res.status(200).json({
      success: true,
      msg: 'User successfully logged in',
    })
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized',
    })
  }
}
