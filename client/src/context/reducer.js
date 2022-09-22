import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_DATAFORM_VALUES,
  CREATE_DATAFORM_BEGIN,
  CREATE_DATAFORM_SUCCESS,
  CREATE_DATAFORM_ERROR,
  GET_DATAFORMS_BEGIN,
  GET_DATAFORMS_SUCCESS,
  SET_EDIT_DATAFORM,
  DELETE_DATAFORM_BEGIN,
  EDIT_DATAFORM_BEGIN,
  EDIT_DATAFORM_SUCCESS,
  EDIT_DATAFORM_ERROR,
  SHOW_DATAFORM_STATS_BEGIN,
  SHOW_DATAFORM_STATS_SUCCESS,
  CLEAR_DATAFORM_FILTERS,
  CHANGE_PAGE,
} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: '',
    }
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    }
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    }
  }
  if (action.type === CLEAR_DATAFORM_VALUES) {
    const initialState = {
      isEditing: false,
      editDataFormId: '',
      formId: '',
      formName: '',
      formSubject: 'Applicant',
      formType: 'Personal',
      formStatus: 'Blank',
    }

    return {
      ...state,
      ...initialState,
    }
  }
  if (action.type === CREATE_DATAFORM_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === CREATE_DATAFORM_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Data Form Created!',
    }
  }
  if (action.type === CREATE_DATAFORM_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === GET_DATAFORMS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === GET_DATAFORMS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      dataForms: action.payload.dataForms,
      totalDataForms: action.payload.totalDataForms,
      numOfPages: action.payload.numOfPages,
    }
  }

  if (action.type === SET_EDIT_DATAFORM) {
    const dataForm = state.dataForms.find((dataForm) => dataForm._id === action.payload.id)
    const { _id, formId, formName, formSubject, formType, formStatus } = dataForm
    return {
      ...state,
      isEditing: true,
      editDataFormId: _id,
      formId,
      formName,
      formSubject,
      formType,
      formStatus,
    }
  }
  if (action.type === DELETE_DATAFORM_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === EDIT_DATAFORM_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === EDIT_DATAFORM_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Data Form Updated!',
    }
  }
  if (action.type === EDIT_DATAFORM_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  if (action.type === SHOW_DATAFORM_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    }
  }
  if (action.type === SHOW_DATAFORM_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      dataFormStats: action.payload.dataFormStats,
      monthlyDataFormApplications: action.payload.monthlyDataFormApplications,
    }
  }
  if (action.type === CLEAR_DATAFORM_FILTERS) {
    return {
      ...state,
      search: '',
      searchStatus: 'all',
      searchType: 'all',
      sort: 'latest',
    }
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page }
  }
  throw new Error(`no such action : ${action.type}`)
}

export default reducer
