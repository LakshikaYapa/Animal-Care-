import mongoose from 'mongoose'

const approvedStaffIdSchema = new mongoose.Schema({
  staffId: { type: String, required: true, unique: true, trim: true, uppercase: true, maxlength: 50 },
  active: { type: Boolean, default: true },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true, collection: 'approvedstaffids' })

export default mongoose.models.ApprovedStaffId || mongoose.model('ApprovedStaffId', approvedStaffIdSchema)
