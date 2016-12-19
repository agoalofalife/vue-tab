import ls from 'local-storage';

export default function localstoragePlugin () {
    return store => {
        store.subscribe( (mutation, state) => {

            if (mutation.type === 'setNameTable') {
                ls.set('NameTable', mutation.payload)
            }
            else if  (mutation.type === 'setClosedColumns'){
                console.log( ls.get('ClosedСolumn'),'d' );
                let constructor = Object.assign(ls.get('ClosedСolumn') || {},{
                    [state.NameTable] : mutation.payload,
                });
                ls.set('ClosedСolumn', constructor);
            }
        })
    }
}