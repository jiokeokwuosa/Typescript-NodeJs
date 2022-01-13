import {
  check,
  validationResult,
  body 
} from 'express-validator';

/**
 *Contains StarShipValidator
 *
 *
 *
 * @class StarShipValidator
 */
class StarShipValidator {
  /**
   * validate Add/Remove comment data.
   * @memberof StarShipValidator
   * @returns {null} - No response.
   */
  static validateAddStarShip() {
    return [
      check(body)
        .exists()
        .withMessage('uid is required')
        .isMongoId()
        .withMessage('uid should be a mongoID')      
    ];
  }
    
  /**
   * Validate user data.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @param {Response} next - The next parameter.
   * @memberof Login
   * @returns {JSON} - A JSON success response.
   */
   static async myValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errArr = errors.array().map(({ msg }) => msg);
      return res.status(400).json({
        status: '400 Invalid Request',
        error: 'Your request contains invalid parameters',
        errors: errArr,
      });
    }
    return next();
  } 
}
export default StarShipValidator;