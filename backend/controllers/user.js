import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from "../models/user.js";

const secret = "test"

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await UserModel.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User not found with this email." })

        const correctPassword = await bcrypt.compare(password, oldUser.password);
        if (!correctPassword) return res.status(400).json({ message: "Invalid password." })

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ oldUser, token });
    } catch (error) {
        res.status(400).json({ message: "Something went wrong while signing in" });
        console.log(error);
    }

}

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            res.status(400).json({ message: "User already exists." })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = {
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        }

        const result = await UserModel.create(user);

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(400).json({ message: "Something went wrong while signing up" });
        console.log(error);
    }
}