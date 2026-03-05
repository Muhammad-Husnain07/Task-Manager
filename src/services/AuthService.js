const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

class AuthService {
  static async login(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await this.comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      user,
      accessToken,
      refreshToken
    };
  }

  static async register(userData) {
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const hashedPassword = await this.hashPassword(userData.password);
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });

    await Permission.createDefaultPermissions(user.id, userData.role);

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      user,
      accessToken,
      refreshToken
    };
  }

  static generateAccessToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
    );
  }

  static async generateRefreshToken(userId) {
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );

    const expiresAt = new Date(Date.now() + 
      (process.env.JWT_REFRESH_EXPIRES_IN ? 
        parseInt(process.env.JWT_REFRESH_EXPIRES_IN) * 60000 :
        7 * 24 * 60 * 60 * 1000
      )
    );

    await db('refresh_tokens').insert({
      token,
      userId,
      expiresAt
    });

    return token;
  }

  static async refreshAccessToken(refreshToken) {
    const tokenData = jwt.verify(refreshToken, process.env.JWT_SECRET);
    
    const storedToken = await db('refresh_tokens')
      .where({ token: refreshToken })
      .first();

    if (!storedToken || storedToken.userId !== tokenData.userId) {
      throw new Error('Invalid refresh token');
    }

    if (new Date(storedToken.expiresAt) < new Date()) {
      throw new Error('Refresh token expired');
    }

    const accessToken = this.generateAccessToken(tokenData.userId);
    return { accessToken };
  }

  static async logout(userId) {
    await db('refresh_tokens')
      .where({ userId })
      .del();
    return { success: true };
  }

  static hashPassword(password) {
    const bcrypt = require('bcryptjs');
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    return bcrypt.hash(password, saltRounds);
  }

  static comparePassword(password, hashedPassword) {
    const bcrypt = require('bcryptjs');
    return bcrypt.compare(password, hashedPassword);
  }

  static verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

module.exports = AuthService;