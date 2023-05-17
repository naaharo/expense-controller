const USEFUL_DATAS = {
  isEditing: false,
  id: 0,
};

const usefulDatas = (state = USEFUL_DATAS, action) => {
  switch (action.type) {
  case 'EDIT':
    return { ...state, isEditing: action.bool, id: action.id };
  default:
    return state;
  }
};

export default usefulDatas;
