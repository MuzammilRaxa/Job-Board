import { Request, Response } from "express";
import User, { IUser } from "../models/Users";
import {
  hashPassword,
  comparePasswords,
  generateToken,
} from "../shared/utils/authUtils";
import UserDTO from "../shared/dtos/dtos";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    // Hash the password
    const hashedPassword = await hashPassword(password);
    // Create a new user
    let newUser: IUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    newUser = (newUser as any)._doc
    const token = generateToken({email: newUser.email})
    res.status(201).json({ message: "User registered successfully", user: new UserDTO({...newUser, token})});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    console.log('amail->',email)
    let existingUser: IUser | null = await User.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      console.log('existinguser->',existingUser)
      return;
    }
    existingUser = (existingUser as any)._doc
    // Compare passwords
    const isMatch = await comparePasswords(password, existingUser?.password as string);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    // Generate and send the token
    const token = generateToken({ email });
    res.status(200).json({ message: "User logged in successfully", user: new UserDTO({...existingUser, token}) });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // Clear the JWT token
    res.status(200).json({ token: "" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
