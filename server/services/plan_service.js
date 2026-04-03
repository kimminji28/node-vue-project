//지원계획서 관련 service
const planMapper = require("../database/mappers/plan_mapper");

const insertPlan = async (data) => {
  const { J_ID, I_UserId, startDate, endDate, purpose, content, file, file2 } =
    data;

  //Pk 생성
  try {
    const lastPlan = await planMapper.getLastPlanId();

    let supportPlan_id;

    if (lastPlan && lastPlan.supportPlan_id) {
      const lastNum = parseInt(lastPlan.supportPlan_id.replace("PLAN", ""), 10);
      const nextNum = lastNum + 1;
      supportPlan_id = "PLAN" + String(nextNum).padStart(4, "0");
    }

    const param = [
      supportPlan_id,
      J_ID,
      I_UserId,
      startDate,
      endDate,
      purpose,
      content,
      file || null,
      file2 || null,
    ];

    const result = await planMapper.insertPlan(param);

    if (result.affectedRows > 0) {
      return {
        status: "Success",
        supportPlan_id,
        message: "지원계획서 등록 성공",
      };
    } else {
      return {
        status: "Failed",
        messge: "지원계획서 등록 실패",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: "Failed",
      message: "서버오류",
      error: err.message,
    };
  }
};

const getSurveyListByInstUser = async (I_UserId) => {
  try {
    const list = await planMapper.getSurveyListByInstUser(I_UserId);

    return {
      status: "Success",
      data: list,
    };
  } catch (err) {
    console.log(err);
    return {
      status: "Failed",
      message: "조사지 불러오기 실패",
    };
  }
};

const getSupportListByInstUser = async (
  I_UserId,
  managerName,
  guardianName,
  supportName,
  surveyId,
  startDate,
  endDate,
) => {
  try {
    const list = await planMapper.getSupportListByInstUser(
      I_UserId,
      managerName,
      guardianName,
      supportName,
      surveyId,
      startDate,
      endDate,
    );

    return {
      status: "Success",
      data: list,
    };
  } catch (err) {
    console.log(err);
    return {
      status: "Failed",
      message: "지원계획 불러오기 실패",
    };
  }
};

const deletePlan = async (supportPlan_Id) => {
  try {
    const result = await planMapper.deletePlan(supportPlan_Id);
    if (result.affectedRows > 0) {
      return {
        status: "Success",
        message: "삭제 완료",
      };
    } else {
      return {
        status: "Failed",
        message: "삭제할 데이터가 없습니다.",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: "Failed",
      message: "삭제 중 오류 발생",
    };
  }
};


// 지원계획서 상세조회
const getPlanDetail = async (supportPlanId) => {
  try {
    const result = await planMapper.getPlanDetail(supportPlanId);

    if (!result) {
      return {
        status: "Failed",
        message: "지원계획서 정보를 찾을 수 없습니다.",
      };
    }

    return {
      status: "Success",
      data: result,
    };
  } catch (err) {
    console.log("getPlanDetail service error :", err);
    return {
      status: "Failed",
      message: "지원계획서 상세조회 중 오류가 발생했습니다.",
    };
  }
};

// 지원계획서 수정
const updatePlan = async (supportPlanId, body) => {
  try {
    const {
      J_ID,
      startDate,
      endDate,
      purpose,
      content,
      file1,
      file2,
    } = body;

    if (!J_ID) {
      return {
        status: "Failed",
        message: "조사지 정보가 없습니다.",
      };
    }

    if (!startDate || !endDate) {
      return {
        status: "Failed",
        message: "지원 기간을 입력하세요.",
      };
    }

    if (!purpose || !content) {
      return {
        status: "Failed",
        message: "지원 목적과 내용을 입력하세요.",
      };
    }

    const updateData = [
      J_ID,
      startDate,
      endDate,
      purpose,
      content,
      file1 || null,
      file2 || null,
      supportPlanId,
    ];

    const result = await planMapper.updatePlan(updateData);

    if (!result || result.affectedRows < 1) {
      return {
        status: "Failed",
        message: "지원계획서 수정 실패",
      };
    }

    return {
      status: "Success",
      message: "지원계획서가 수정되었습니다.",
    };
  } catch (err) {
    console.log("updatePlan service error :", err);
    return {
      status: "Failed",
      message: "지원계획서 수정 중 오류가 발생했습니다.",
    };
  }
};

module.exports = {
  insertPlan,
  getSurveyListByInstUser,
  getSupportListByInstUser,
  deletePlan,
  updatePlan,
  getPlanDetail,
};
