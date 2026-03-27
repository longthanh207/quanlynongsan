const diaryService = require('../services/diaryService');

exports.addDiary = async (req, res) => {
  try {
    const { farmerId, activityTitle, cropLabel, description, actionDate } = req.body;
    
    if (!farmerId || !activityTitle || !cropLabel || !description || !actionDate) {
      return res.status(400).json({ status: 'error', message: 'Vui lòng cung cấp đầy đủ thông tin' });
    }

    const diary = await diaryService.createDiaryEntry({
      farmerId,
      activityTitle,
      cropLabel,
      description,
      actionDate: new Date(actionDate)
    });

    res.status(201).json({ status: 'success', data: diary });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

exports.getDiaries = async (req, res) => {
  try {
    const { farmerId } = req.query;
    if (!farmerId) {
      return res.status(400).json({ status: 'error', message: 'Thiếu farmerId' });
    }

    const diaries = await diaryService.getFarmerDiaries(farmerId);
    res.status(200).json({ status: 'success', data: diaries });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
