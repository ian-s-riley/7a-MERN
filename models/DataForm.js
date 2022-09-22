import mongoose from 'mongoose'

const DataFormSchema = new mongoose.Schema(
  {
    formName: {
      type: String,
      required: [true, 'Please provide a form name'],
      maxlength: 100,
    },
    formId: {
      type: String,
      required: [true, 'Please provide a form ID'],
      maxlength: 50,
    },
    formStatus: {
      type: String,
      enum: ['Blank', 'Incomplete', 'Review', 'Complete'],
      default: 'Blank',
    },
    formType: {
      type: String,
      enum: ['Personal', 'Company', 'Financial', 'Ownership', 'Government'],
      default: 'Personal',
    },
    formSubject: {
      type: String,
      enum: ['Applicant', 'Owner', 'Lender', '3rd Party', 'Company'],
      default: 'Applicant',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('DataForm', DataFormSchema)
