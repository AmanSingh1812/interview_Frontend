const BASE_URL = "https://unencroached-kori-debasingly.ngrok-free.dev/api";

export const API = {
  REGISTER: `${BASE_URL}/register/`,
  LOGIN: `${BASE_URL}/login/`,
  PROFILE: `${BASE_URL}/profile/`,
  DASHBOARD: `${BASE_URL}/dashboard/`,

  ROLES: `${BASE_URL}/roles/`,
  SKILLS: `${BASE_URL}/skills/`,
  GET_QUESTION: `${BASE_URL}/get_question/`,
  EVALUATE: `${BASE_URL}/evaluate/`,

  ANALYZE_RESUME: `${BASE_URL}/analyze_resume/`,

  ADMIN_ADD_QUESTION: `${BASE_URL}/admin/add-question/`,
  ADMIN_LIST_QUESTIONS: `${BASE_URL}/admin/list-questions/`,
  ADMIN_LIST_USERS: `${BASE_URL}/admin/list-users/`,

  SESSION_QUESTIONS: `${BASE_URL}/session/questions/`,
};
