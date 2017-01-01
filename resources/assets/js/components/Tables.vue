<template>
    <div>
        <sidebar v-on:filterChange="filterChange" v-on:renameColumnTitle="renameColumnTitle"></sidebar>

        <!--change column -->
        <transition name="tablesList"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
        <div class="col-md-2 centering titleCoumnnAlias" v-show="renameColumn">
        <input v-for="title in TitleColumnsAlias" class="form-control form-group inputColumnAlias" :value="title" v-if="ActionColumn.indexOf(title) == -1">
            <button class="btn btn-primary btn-xs" @click="saveColumnAlias">Save</button>
        </div>
        </transition>


        <transition name="tablesList"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
        <div class="filter-list" v-show="filterState">
            <div class="list-group">
                <a href="#" class="list-group-item active">
                  Hide columns
                </a>
                <a href="#" class="list-group-item" v-for="column in AllColumns" :data-name="column" v-if="ActionColumn.indexOf(column) == -1">
                    <label><input type="checkbox" :checked="ClosedСolumn.indexOf(column) != -1">  {{ column }}</label></a>
                <button type="button" class="btn btn-primary btn-lg active filter-btn" @click="saveFilter($event)">Save</button>
            </div>
        </div>
        </transition>

        <div class="search col-md-2 ">
            <input type="text" class="form-control"  placeholder="Enter name table please..." @change="handlerNameTable($event.target.value)" ref="enterNameTable">
        </div>

        <div class="row"></div>
        <!--<span class="badge pull-right">42</span>-->
     <div class="all_tables">
         <button type="button" class="btn btn-primary button_show_tables" @click="changeStateListTables">Show all tables</button>

         <transition name="tablesList"
                     enter-active-class="animated flipInX"
                     leave-active-class="animated flipOutX">

         <ul class="nav nav-pills nav-stacked " v-show="stateListAllTables">
             <li class="label label-info col-md-2" v-for="table in ListTables" @click="selectedTable($event.target.textContent)">{{ table.Tables_in_vuetable }}</li>
         </ul>
         </transition>
     </div>

        <div class="col-lg-11 col-md-11 centering">
            <div class="table-responsive ">
                <table class="table table-bordered" v-if="state" >
                    <thead>
                    <tr>
                        <th  class="active" v-for="title in TitleColumnsAlias" v-if="ClosedСolumn.indexOf(title) == -1">{{ title }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="value in AllData" @dblclick="rename($event)"  v-on:keyup.enter="enter($event)" :data-id="value.id" >
                        <td v-for="(column, property) in value"  :data-id="value.id" :data-title="property" v-if="ClosedСolumn.indexOf(property) == -1">{{ column }}</td>
                        <td>
                            <button class="btn btn-danger btn-xs">delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <p v-else> <img class="preloader" src="/images/preloader.gif"></p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import sidebar from './sidebar.vue';
    import ls from 'local-storage';

    export default {
        computed: {
            ...mapGetters([
                'AllData',
                'AllColumns',
                'ClosedСolumn',
                'ActionColumn',
                'TitleColumnsAlias',
                'ListTables'
            ]),
        },
        data(){
          return {
              state              : false,
              NameTable          : null,
              filterState        : false,
              renameColumn       : false,
              stateListAllTables : false,
          }
        },
        methods : {
            // insert name table in input
            handlerNameTable(val){
                this.state = false;
                this.$store.commit( 'setNameTable', val );

                this.$store.dispatch('AllData').then( () => {
                    this.state = this.$store.getters.AllData;
                });
                this.$store.commit( 'setClosedColumns',  ls.get('ClosedСolumn') !== null ? ls.get('ClosedСolumn')[ls.get('NameTable')] : []);
                this.$store.commit( 'setTitleColumnsAlias', ls.get('TitleColumnsAlias') !== null ? ls.get('TitleColumnsAlias')[ls.get('NameTable')] : this.$store.getters.AllColumns )
            },
            rename(e) {
                this.resetInput(e.target);
                let input            = document.createElement('input');
                input.dataset.id     = e.target.dataset.id;
                input.dataset.title  = e.target.dataset.title;
                input.className      = 'form-control';
                input.value          = e.target.textContent;
                e.target.replaceWith(input);
            },
            enter(e) {
                this.$store.dispatch('changeValue',{
                    id    : e.target.dataset.id,
                    title : e.target.dataset.title,
                    value : e.target.value
                }).then( () => {
                 this.resetInput();
                })
            },
            resetInput(){
                let currentInput = document.querySelector('.table input');

                if ( currentInput !== null )
                {
                    let td           = document.createElement('td');
                    td.innerHTML     = currentInput.value;
                    this.assignAttributes(td, currentInput);
                    currentInput.replaceWith(td);
                }
            },
            assignAttributes(elem, target){
                elem.dataset.id    = target.dataset.id,
                elem.dataset.title = target.dataset.title
            },
            remove(e){
                let id =  e.target.closest('tr').dataset.id;
                this.$store.dispatch('removeRow', {
                    id : id
                });
            },
            filterChange(){
                this.filterState = !this.filterState;
            },
            renameColumnTitle(){
                this.renameColumn = !this.renameColumn;
            },
            // save filter column , example something hide
            saveFilter(event){
                var filterOn   = event.target.parentElement.querySelectorAll('input[type=checkbox]:checked'),
                    casheArray = [];

                filterOn.forEach( checkbox => {
                    casheArray.push( checkbox.closest('a').dataset.name );
                });

                this.$store.commit('setClosedColumns', casheArray);

                this.filterState = false;
            },
            // save new name columns
            saveColumnAlias(){
                let cacheAlias = [];
                Array.prototype.slice.call(document.getElementsByClassName('inputColumnAlias')).forEach( value => {
                    cacheAlias.push(value.value);
                });
                this.$store.commit( 'setTitleColumnsAlias', cacheAlias );
                this.renameColumn = false;
            },
            // change state all show tables
            changeStateListTables(){
                this.$store.dispatch('AllTables').then( list => {
                    this.stateListAllTables = !this.stateListAllTables;
                });
            },
            // the selected table in placeholder
            selectedTable(table){
                this.$refs.enterNameTable.value = table;
                this.handlerNameTable(table);
            }
        },
        created(){
            // install NameTable
            this.$store.commit( 'setNameTable', ls.get('NameTable') ||  this.$store.getters.NameTable);

            this.$store.dispatch('AllData').then( () => {

                this.state = this.$store.getters.AllData;
                this.$store.commit( 'setClosedColumns',  ls.get('ClosedСolumn') !== null ? ls.get('ClosedСolumn')[ls.get('NameTable')] : []);

                // ActionColumn
                this.$store.commit( 'setTitleColumnsAlias', ls.get('TitleColumnsAlias')[ls.get('NameTable')] !== undefined ? ls.get('TitleColumnsAlias')[ls.get('NameTable')] : this.$store.getters.AllColumns )
            });

        },
        components:{
            sidebar
        }
    }
</script>
<style scoped>
    .search {
        margin: 2% 4%;
    }
    .preloader{
        width: 20%;
        display: block;
        margin: 0 auto;
    }

    .filter-list{
        z-index: 1000;
        margin-left: 40%;
        width: 40%;
    }
    .filter-btn{
        z-index: 1000;
        margin-left: 40%;
        margin-top: 1%;
        position: relative;
    }
    .centering{
        margin: 0 auto;
        float: none;
    }
    .titleCoumnnAlias{
        margin-top: 50px;
    }
    .table-responsive{
        float: left;
    }
    .all_tables{
        margin: 1% 5%;
    }
    .button_show_tables{
        margin-bottom: 1%;
    }

    /* Transition css for animation */

    /*.tablesList-enter-active, .tablesList-leave-active {*/
        /*transition: opacity .5s*/
    /*}*/
    /*.tablesList-enter, .tablesList-leave-active {*/
        /*opacity: 0*/
    /*}*/

    /* Анимации появления и исчезновения могут иметь */
    /* различные продолжительности и динамику.      */
    /*.tablesList-enter-active {*/
        /*transition: all .3s ease;*/
    /*}*/
    /*.tablesList-leave-active {*/
        /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    /*}*/
    /*.tablesList-enter, .tablesList-leave-active {*/
        /*transform: translateX(10px);*/
        /*opacity: 0;*/
    /*}*/
</style>