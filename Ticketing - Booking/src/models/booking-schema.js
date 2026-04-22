module.exports = (mongoose) => {
    const schema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        movieName: String,
        seatNumber: String,
        price: Number,
        bookingDate: {
            type: Date,
            default: Date.now,
        },
    });

    return mongoose.model('booking', schema);
}

