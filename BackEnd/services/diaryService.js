const Diary = require('../models/Diary');

exports.createDiaryEntry = async (data) => {
  const diary = new Diary(data);
  return await diary.save();
};

exports.getFarmerDiaries = async (farmerId) => {
  return await Diary.find({ farmerId }).sort({ actionDate: -1, recordedAt: -1 });
};
