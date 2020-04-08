const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	phone: {
		type: String,
		require: false
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	}
})

UserSchema.pre('save', function(next) {
	if (this.isNew) {
		this.createdAt = this.updatedAt = Date.now()
	} else {
		this.updatedAt = Date.now()
	}
	next()
})

module.exports = mongoose.model('User', UserSchema)
