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
    },
    /**
     * Колонку для закрытия
     * @param state
     * @param newValue
     */
    setClosedColumn( state, newValue ){
        state.ClosedСolumn.push(newValue);
    },
    /**
     * Insert all close columns
     * @param state
     * @param collection
     */
    setClosedColumns( state, collection = [] ){
        state.ClosedСolumn = collection;
    },
    setTitleColumnsAlias( state, Alias ){
        if (Alias !== undefined)
        {
            state.TitleColumnsAlias = Alias.concat(state.ActionColumn);
        }
    },
    setListAllTables( state, list ) {
        state.AllTables = list;
    }

}