const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod=require("zod");


/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */

const emailschema=zod.string().email();
const passwordschema=zod.string().min(6);

function signJwt(username, password) {
    const usernameResponse=emailschema.safeParse(username);
    const passwordResponse=passwordschema.safeParse(password);

    if(!usernameResponse.success || !passwordResponse.success){
        return null;
    }
    // Your code here
    const signature=jwt.sign({
        username
    },jwtPassword)
    return signature;
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    // Your code here
    // const verify=jwt.verify(token,jwtPassword);
    // if(verify){
    //     return true;
    // }else{
    //     return false;
    // }THIS IS WRONG   
    //NOTE VERIFYJWT IS A WEIRED FUNCTION AS IT IF IT CORRECT THEN IT RETURN THE VALUE IF THERE IS ANY ERROR IT BECOMES PANIC AND RETURN A ERROR NOT FALSE THATS WHY WE HAVE TO USE TRY AND CATCH
    //
    let ans=true;
    try{
        jwt.verify(token,jwtPassword);
    }catch(e){
        ans=false;
    }
    return ans;
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    // Your code here
    const decode=jwt.decode(token);
    if(decode){
        return true;
    }else{
        return false;
    }
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
