import ls from 'local-storage';

export default function localstoragePlugin () {
    return store => {
        store.subscribe( (mutation, state) => {

            if (mutation.type === 'setNameTable') {
                ls.set('NameTable', mutation.payload)
            }
            else if  (mutation.type === 'setClosedColumns'){
                let constructor = Object.assign(ls.get('ClosedСolumn') || {},{
                    [state.NameTable] : mutation.payload,
                });
                ls.set('ClosedСolumn', constructor);
            }
            else if ( mutation.type === 'setTitleColumnsAlias'){
                let constructor = Object.assign(ls.get('TitleColumnsAlias') || {},{
                    [state.NameTable] : mutation.payload,
                });
                ls.set('TitleColumnsAlias', constructor);
                // ls.set('TitleColumnsAlias', {
                //     [state.NameTable] : mutation.payload,
                // });
            }
        })
    }
}