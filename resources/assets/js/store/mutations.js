
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
        state.AllData.forEach( item => {
            if ( item.id == newValue.id ) {
                // console.log( item,'item' );
                // console.log(  `${item[newValue.title]}` ,'????');
                item[newValue.title] = newValue.value;
               // console.log(  ,' newValue.value' );
                // item + '.' + newValue.title  = newValue.value;
            }
            // console.log( item.id, 'item' );
        });
        // console.log( state.AllData, 'state.AllData');
    }
}