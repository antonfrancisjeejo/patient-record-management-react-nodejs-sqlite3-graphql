const formatData = (data) => {
  return data.map((item) => ({
    ...item,
    treatment: {
      disease: item.disease,
      category: item.category,
      prescriptions: item.prescriptions,
    },
  }));
};

module.exports = formatData;
