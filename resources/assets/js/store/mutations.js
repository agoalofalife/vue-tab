export default {
    setAllData( state, newData ){
        state.AllData = newData;
    },
    setNameTable( state, preName ){
        state.NameTable = preName;
    },
    setTitleColumns( state , columns) {
        state.TitleColumns = columns;
    },
    setSpecificallyPlace( state , newValue){
        state.AllData.forEach( ( item ) => {
            if ( item.id == newValue.id ) {
                item[newValue.title] = newValue.value;
            }
        });
    },
    remove( state, id ){
        state.AllData =  state.AllData.filter( ( element ) => {
           return element.id != id;
        })
    }
}