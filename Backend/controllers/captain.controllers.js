const captainSchema = require('../models/captain.model');
const captainService = require('../services/captain.service');
const blacklistTokenModel = require('../models/blacklistToken.model');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {fullname, email, password, vehicle} = req.body;
  
  const isCapatainAlreadyRegistered = await captainSchema.findOne({ email });
  if (isCapatainAlreadyRegistered) {
    return res.status(400).json({errors: [{msg: 'Captain already registered with this email'}]});
  }

  const hashedPassword = await captainSchema.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname : fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType
  });

  const token = captain.generateAuthToken();

  res.status(201).json({token, captain});
}   

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const { email, password } = req.body;

  const captain = await captainSchema.findOne({ email }).select('+password');
  if (!captain ||!(await captain.comparePassword(password, captain.password))) {
    return res.status(400).json({errors: [{msg: 'Invalid email or password'}]});
  }

  const isMatch = await captain.comparePassword(password);

  if(!isMatch) {
    return res.status(401).json({message: 'Invalid email or password'});
  }

  const token = captain.generateAuthToken();
  
  res.cookie('token', token);

  res.status(200).json({token, captain});

}
  
module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
}


module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token|| req.headers.authorization?.split(' ')[1];
  
  await blacklistTokenModel.create({ token }); 

  res.clearCookie('token');
  res.status(200).json({message: 'Logged out successfully'});
}

 