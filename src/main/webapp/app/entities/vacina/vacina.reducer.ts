import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVacina, defaultValue } from 'app/shared/model/vacina.model';

export const ACTION_TYPES = {
  FETCH_VACINA_LIST: 'vacina/FETCH_VACINA_LIST',
  FETCH_VACINA: 'vacina/FETCH_VACINA',
  CREATE_VACINA: 'vacina/CREATE_VACINA',
  UPDATE_VACINA: 'vacina/UPDATE_VACINA',
  DELETE_VACINA: 'vacina/DELETE_VACINA',
  RESET: 'vacina/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVacina>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VacinaState = Readonly<typeof initialState>;

// Reducer

export default (state: VacinaState = initialState, action): VacinaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VACINA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VACINA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VACINA):
    case REQUEST(ACTION_TYPES.UPDATE_VACINA):
    case REQUEST(ACTION_TYPES.DELETE_VACINA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VACINA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VACINA):
    case FAILURE(ACTION_TYPES.CREATE_VACINA):
    case FAILURE(ACTION_TYPES.UPDATE_VACINA):
    case FAILURE(ACTION_TYPES.DELETE_VACINA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VACINA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VACINA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VACINA):
    case SUCCESS(ACTION_TYPES.UPDATE_VACINA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VACINA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/vacinas';

// Actions

export const getEntities: ICrudGetAllAction<IVacina> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VACINA_LIST,
  payload: axios.get<IVacina>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVacina> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VACINA,
    payload: axios.get<IVacina>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVacina> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VACINA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVacina> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VACINA,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVacina> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VACINA,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
