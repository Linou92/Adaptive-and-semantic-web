const mongoose= require('mongoose');

const author = mongoose.Schema({
  name:{type: String},
  room_temp:{type:String},
  fruit_temp:{type:String}
});

module.exports = mongoose.model('cluster_points', author, 'cluster_points');
