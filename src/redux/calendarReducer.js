const initialState = {
    notes: {}, // 用來儲存每天的備註事項
  };
  
  const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_NOTE':
        return {
          ...state,
          notes: {
            ...state.notes,
            [action.payload.date]: action.payload.note,
          },
        };
      default:
        return state;
    }
  };
  
  export default calendarReducer;