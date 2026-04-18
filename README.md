# 프로젝트명 : 발달장애 케어 시스템

## 발달장애인 지원관리 시스템
 - 사용자 및 기관 정보를 관리하고, 상담 기록과 지원 계획·결과를 통합 관리하며,
   우선순위 기반의 서비스 제공을 지원하는 시스템입니다.
 - 시스템 관리자를 제외한 모든 이용자는 승인 여부에 따라 접근이 가능하며,
   사용자 권한에 따라 사용할 수 있는 기능이 다르도록 설계하였습니다.

## 프로젝트 개요
 - 기획 의도 : 사용자·기관 정보와 지원 이력을 통합 관리하고, 우선순위 기반 서비스를 제공하는 시스템 구축
 - 개발 동기 : 발달장애인에게 꼭 필요한 순간, 더 쉽게 도움을 제공하는 시스템 구축
 - 기대 효과 : 데이터 기반의 체계적인 지원 관리를 통해 발달 장애인들이 건강한 유대관계 형성 및 사회성 증진 발달장애인의 실질적인 삶의 질 향상

## 팀 구성 및 역할
 - 고동현(팀장) - 서버 배포
 - 이태호(부팀장) - GIT 관리
 - 김경환 - 개발 환경 구축
 - 김민지 - DB 관리

## 개발 기간
 - 전체 개발 기간 : 2026.03.10 ~ 2026.04.13
 - 설계 기간 : 2026.03.12 ~ 2026.03.19
 - 구현 기간 : 2026.03.20 ~ 2026.04.03
 - 배포 및 테스트 : 2026.04.07 ~ 2026.04.08
 - 발표 준비 : 2026.04.10 ~ 2026.04.12
 - 프로젝트 발표 : 2026.04.13

## 기술 스택 시각화

| 구분 | 사용 기술 |
| :--- | :--- |
| **Frontend** | <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white"> <img src="https://img.shields.io/badge/Pinia-F6D365?style=for-the-badge&logo=pinia&logoColor=black"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <br> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> |
| **Backend** | <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"> |
| **Database** | <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white"> |
| **Deployment** | <img src="https://img.shields.io/badge/NCP-03C75A?style=for-the-badge&logo=naver&logoColor=white"> <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"> <img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white"> <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"> <img src="https://img.shields.io/badge/MobaXterm-41454A?style=for-the-badge&logoColor=white"> |
| **Analysis & Design** | <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/Google_Docs-4285F4?style=for-the-badge&logo=googledocs&logoColor=white"> <img src="https://img.shields.io/badge/ERDCloud-4A90E2?style=for-the-badge&logoColor=white"> |
| **IDE / Collab** | <img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"> |

## 내가 담당한 기능
Frontend 기술과 Backend 기술을 사용해 구현했고, DB 관리를 담당하였습니다.

#### 1. 조사지
 - 일반 이용자 : 조사지 작성, 상세 조회
 - 기관 담당자 / 기관 관리자 : 조사지 조회

#### 2. 상담 기록
 - 기관 담당자 : 상담 기록 목록 조회, 상세 조회, 등록, 수정

#### 3. DB 관리 (Naver Cloud Platfrom)
 - ERD 지속적 업데이트
 - 테이블 생성 및 더미 데이터 추가
 - 테이블 변경 이력 스크립트 관리
 - Naver Cloud Platfrom에 MariaDB 서버 구축 및 설정


## 프로젝트 구조

```
node-vue-project/
├── client/
│   ├── public/
│   │   ├──favicon.ico
│   │   ├──favicon.png
│   │   ├──index.html
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── examples/
│   │   │   ├──Cards/
│   │   │   ├──Charts/
│   │   │   ├──Navbars/
│   │   │   ├──PageLayout/
│   │   │   └──Sidenav/
│   │   ├── router/
│   │   ├── store/
│   │   ├── stores/
│   │   ├── views/
│   │   │   ├──componts/
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── vue.config.js
│
├── server/
│   ├── database/
│   │   ├── mappers/
│   │   ├── sql/
│   │   └── DAO.js
│   ├── middlewares/
│   ├── public/
│   │   ├──css/
│   │   ├──fonts/
│   │   ├──img/
│   │   ├──js/
│   │   ├──favicon.ico
│   │   ├──index.html
│   ├── routers/
│   ├── services/
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

## 프로그램 흐름도
<img width="920" height="480" alt="Image" src="https://github.com/user-attachments/assets/f2c536c3-b2c6-48a6-8bf7-bae713ddd4fc" />

## DB구성도
<img width="920" height="480" alt="Image" src="https://github.com/user-attachments/assets/183fd569-01e2-47ed-b948-48dab221e903" />

## 메인 화면
### 일반 이용자 메인 페이지
<img width="920" height="480" alt="Image" src="https://github.com/user-attachments/assets/54bef53f-b931-4bd2-bb0c-95ac3fccb992" />

### 일반 이용자 조사지 등록
<img width="920" height="480" alt="Image" src="https://github.com/user-attachments/assets/4fd2f735-51fe-4f05-afd1-ac6b61fc1502" />

### 기관 관리자의 기관 담당자 배정
<img width="920" height="480" alt="Image" src="https://github.com/user-attachments/assets/ef806d97-4801-4a3a-a315-3419747e54ae" />

### 기관 담당자 우선 순위 요청
<img width="920" height="480" alt="Image" src="https://github.com/user-attachments/assets/58e995b8-8597-4b7f-ab35-9b7731267408" />

### 기관 담당자 상담 기록
<img width="920" height="480" alt="Image" src="https://github.com/user-attachments/assets/417c20ff-2c3d-4855-a4a0-474d529693d8" />

### 기관 담당자 지원 계획서 승인 요청
<img width="920" height="480" alt="Image" src="https://github.com/user-attachments/assets/3ac20977-5f71-48c2-9f10-9cf3dd0504ed" />

### 기관 담당자 지원 결과서 승인 요청
<img width="920" height="480" alt="Image" src="https://github.com/user-attachments/assets/dae02ba8-fc83-4ed7-828c-42284e2c9d46" />

### 시스템 관리자 공지사항
<img width="920" height="480" alt="Image" src="https://github.com/user-attachments/assets/554ff1f8-8a46-4526-82b1-c73e3bcb7ae2" />

## 전체 주요 기능
### 일반 이용자 (지원 대상자의 보호자)
 - 마이페이지 내 정보 수정 및 지원 대상자 등록 가능
 - 조사지 등록 및 조회
 - 지원 계획서 열람 가능
 - 지원 결과서 열람 가능
 - 공지사항 조회

### 기관 담당자
 - 우선 순위 승인 요청
 - 상담 기록 관리 (등록, 조회, 수정)
 - 지원 계획서 작성 및 승인 요청
 - 지원 결과서 작성 및 승인 요청
 - 공지사항 조회

### 기관 관리자
 - 기관 담당자 배정 및 정보 조회 가능
 - 우선 순위 승인 및 반려
 - 지원 계획서 승인 및 반려
 - 지원 결과서 승인 및 반려
 - 공지사항 관리 (등록, 조회, 수정, 삭제)

### 시스템관리자
 - 기관 관리 (목록 조회, 등록, 수정, 삭제)
 - 조사지 관리 (초기 버전 등록 및 업데이트 가능)
 - 기관 관리자 관리 (회원 가입 승인)
 - 공지사항 관리 (등록, 조회, 수정, 삭제)

## 업무 흐름
 - 일반 이용자 / 기관 담당자 / 기관 관리자 → 회원 가입 요청
 - 일반 이용자 → 기관 관리자가 승인 / 기관 관리자 → 시스템 관리자가 승인
 - 일반 이용자 / 기관 담당자 / 기관 관리자 / 시스템 관리자 로그인 가능
 - 일반 이용자 → 마이페이지에서 지원 대상자 등록 → 조사지 등록
 - 기관 관리자 → 조사지 참고해서 기관 담당자 배정
 - 기관 담당자 → 배정된 지원 대상자의 조사지 참고해서 우선 순위(계획/중점/긴급) 선택 후 기관 관리자에게 승인 요청
 - 기관 관리자 → 우선 순위 승인/반려 가능
 - 기관 담당자 → 우선 승인되면 상담 진행 후 상담 기록
 - 기관 담당자 → 조사지와 상담 기록을 바탕으로 지원 계획서 작성 후 기관 관리자에게 승인 요청
 - 기관 관리자 → 지원 계획서 승인/반려 가능
 - 기관 담당자 → 지원 계획서 승인 받으면 지원 결과서 승인 요청
 - 일반 이용자 → 지원 계획서 열람 가능
 - 기관 관리자 → 지원 결과서 승인/반려 가능
 - 일반 이용자 → 지원 결과서 열람 가능
