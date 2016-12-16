export default {
    setAllData( state, newData ){
        state.AllData = newData;
    },
    setNameTable( state, preName ){
        state.NameTable = preName;
    },
    setTitleColumns( state , columns) {

        state.TitleColumns = columns.concat(state.ActionColumn);
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
    },
    /**
     * Колонки для закрытия
     * @param state
     * @param newValue
     */
    setClosedColumn( state, newValue){
        state.ClosedСolumn.push(newValue);
    },
    /**
     * Список колокок закрытия
     * @param state
     * @param collection
     */
    setClosedColumns( state, collection ){
        state.ClosedСolumn = collection;
    },
    deleteClosedColumn( state, oldValue){

    }
}