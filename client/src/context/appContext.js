import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
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

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  showSidebar: false,
  isEditing: false,
  editDataFormId: '',
  formId: '',
  formName: '',
  formTypeOptions: ['Personal', 'Company', 'Financial', 'Ownership', 'Government'],
  formType: 'Personal',
  formStatusOptions: ['Blank', 'Incomplete', 'Review', 'Complete'],
  formStatus: 'Blank',
  formSubjectOptions: ['Applicant', 'Owner', 'Lender', '3rd Party', 'Company'],
  formSubject: 'Applicant',
  dataForms: [],
  totalDataForms: 0,
  numOfPages: 1,
  page: 1,
  dataFormStats: {},
  monthlyDataFormApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('location')
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token, location } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)

      const { user, location, token } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      })
      addUserToLocalStorage({ user, location, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
  
  const clearDataFormValues = () => {
    dispatch({ type: CLEAR_DATAFORM_VALUES })
  }
  const createDataForm = async () => {
    dispatch({ type: CREATE_DATAFORM_BEGIN })
    try {      
      const { formId, formName, formSubject, formType, formStatus } = state
      await authFetch.post('/dataForms', {
        formName,
        formId,
        formStatus,
        formType,
        formSubject,
      })
      dispatch({ type: CREATE_DATAFORM_SUCCESS })
      dispatch({ type: CLEAR_DATAFORM_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_DATAFORM_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getDataForms = async () => {
    const { page, search, searchStatus, searchType, sort } = state

    let url = `/dataForms?page=${page}&status=${searchStatus}&formType=${searchType}&sort=${sort}`
    if (search) {
      url = url + `&search=${search}`
    }
    
    dispatch({ type: GET_DATAFORMS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { dataForms, totalDataForms, numOfPages } = data
      dispatch({
        type: GET_DATAFORMS_SUCCESS,
        payload: {
          dataForms,
          totalDataForms,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const setEditDataForm = (id) => {
    dispatch({ type: SET_EDIT_DATAFORM, payload: { id } })
  }
  const editDataForm = async () => {
    dispatch({ type: EDIT_DATAFORM_BEGIN })

    try {
      const { formId, formName, formStatus, formType, formSubject } = state
      await authFetch.patch(`/dataForms/${state.editDataFormId}`, {
        formName,
        formId,
        formSubject,
        formType,
        formStatus,
      })
      dispatch({ type: EDIT_DATAFORM_SUCCESS })
      dispatch({ type: CLEAR_DATAFORM_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_DATAFORM_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const deleteDataForm = async (dataFormId) => {
    dispatch({ type: DELETE_DATAFORM_BEGIN })
    try {
      await authFetch.delete(`/dataForms/${dataFormId}`)
      getDataForms()
    } catch (error) {
      logoutUser()
    }
  }
  const showDataFormStats = async () => {
    dispatch({ type: SHOW_DATAFORM_STATS_BEGIN })
    try {
      const { data } = await authFetch('/dataForms/dataFormStats')
      dispatch({
        type: SHOW_DATAFORM_STATS_SUCCESS,
        payload: {
          dataFormStats: data.defaultDataFormStats,
          monthlyDataFormApplications: data.monthlyDataFormApplications,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }
  const clearDataFormFilters = () => {
    dispatch({ type: CLEAR_DATAFORM_FILTERS })
  }
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearDataFormValues,
        createDataForm,
        getDataForms,
        setEditDataForm,
        deleteDataForm,
        editDataForm,
        showDataFormStats,
        clearDataFormFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
