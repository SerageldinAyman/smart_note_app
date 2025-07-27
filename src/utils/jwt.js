import jwt from 'jsonwebtoken';

/**
 * JWT utility functions for asymmetric signing and verification
 */

/**
 * Generate JWT token using private key
 * @param {Object} payload - Data to encode in token
 * @param {string} expiresIn - Token expiration time
 * @returns {string} - Signed JWT token
 */
export const generateToken = (payload, expiresIn = '24h') => {
  const privateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/gm, '\n');
  
  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn
  });
};

/**
 * Verify JWT token using public key
 * @param {string} token - JWT token to verify
 * @returns {Object} - Decoded token payload
 */
export const verifyToken = (token) => {
  const publicKey = process.env.JWT_PUBLIC_KEY.replace(/\\n/gm, '\n');
  
  return jwt.verify(token, publicKey, {
    algorithms: ['RS256']
  });
};

/**
 * Decode JWT token without verification (for extracting payload)
 * @param {string} token - JWT token to decode
 * @returns {Object} - Decoded token payload
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};

