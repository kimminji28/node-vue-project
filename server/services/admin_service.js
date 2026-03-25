//sysadmin service
const adminMapper = require("../database/mappers/admin_mapper.js");

//조사지생성 Inser
const SurveyInsert = async (surveyObj) => {
  try {
    const {
      Sys_Id,
      version,
      description,
      created_at,
      items
    } = surveyObj;

    let Ver_Id;
    const lastFormRows = await adminMapper.getLastSurveyFormId();

    if (!lastFormRows) {
      Ver_Id = "FORM0001";
    } else {
      const lastVerId = lastFormRows.Ver_Id;
      const num = parseInt(lastVerId.substring(4), 10);
      Ver_Id = "FORM" + String(num + 1).padStart(4, "0");
    };

    let currentNum = 0;
    const lastItemRows = await adminMapper.getLastSurveyItemId();

    if (lastItemRows) {
      const lastQuestionId = lastItemRows.question_id;
      currentNum = parseInt(lastQuestionId.substring(4), 10);
    };

    const FormData = [
      Ver_Id,
      Sys_Id,
      version,
      description,
      created_at
    ];

    const itemDataList = [];
    for (const item of items) {
      currentNum += 1;
      const question_id = "ITEM" + String(currentNum).padStart(4, "0");

      itemDataList.push([
        question_id,
        Ver_Id,
        item.titleCode,
        item.question_no,
        item.question_text,
        item.answer_type
      ]);
    };
    const result = await adminMapper.insertSurveyAll(FormData, itemDataList);
    if (result.status !== "Success") {
      return result;
    }
    return {
      status: "Success",
      Ver_Id
    };

  } catch (err) {
    return {
      status: "Failed",
      message: err.message
    };
  }
};


module.exports = {
  SurveyInsert,
};
