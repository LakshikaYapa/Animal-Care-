import mongoose from 'mongoose'

const adopterProfileSchema = new mongoose.Schema({
  address: { type: String, required: true, maxlength: 500, trim: true },
}, { _id: false })

const volunteerProfileSchema = new mongoose.Schema({
  address: { type: String, required: true, maxlength: 500, trim: true },
}, { _id: false })

const funderProfileSchema = new mongoose.Schema({
  funderType: { type: String, required: true, enum: ['individual', 'organization'] },
  organizationName: { type: String, trim: true, maxlength: 200 },
  phone: { type: String, trim: true, maxlength: 40 },
}, { _id: false })

const staffProfileSchema = new mongoose.Schema({
  staffId: { type: String, required: true, trim: true, uppercase: true, maxlength: 50 },
}, { _id: false })

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, maxlength: 150 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  passwordHash: { type: String, required: true, select: false },
  roles: {
    type: [{ type: String, enum: ['adopter', 'volunteer', 'funder', 'staff'] }],
    required: true,
    validate: {
      validator: (roles) => roles.length > 0 && new Set(roles).size === roles.length,
      message: 'Roles must be unique and include at least one role.',
    },
  },
  profiles: {
    adopter: { type: adopterProfileSchema },
    volunteer: { type: volunteerProfileSchema },
    funder: { type: funderProfileSchema },
    staff: { type: staffProfileSchema },
  },
}, { timestamps: true })

userSchema.index({ email: 1 }, { unique: true })

export default mongoose.models.User || mongoose.model('User', userSchema)
