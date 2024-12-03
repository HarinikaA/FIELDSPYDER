var dropdown_component = {
    template:`
    <div :class="[conf.rootCls?conf.rootCls:'', {active : showDropdownElement}]" :id="conf.rootID?conf.rootID:''" @click="showDropdown(true)" :tabindex="conf.showDropdownOnClick ? -1 :''"  @focus="stopHide" @blur="startHide">
        <i :class="conf.leftIconCls?conf.leftIconCls:''" :id="conf.leftIconID?conf.leftIconID:''"></i>
        <span :class="conf.txtCls?conf.txtCls:''" :id="conf.txtID?conf.txtID:''" v-show="showTitle">{{ getTitle }}</span>
        <span :class="conf.txtCls?conf.txtCls:''" v-if="showSelected">{{ getSelected }}</span>
        <span :class="conf.numberCls?conf.numberCls:''" :id="conf.numberID?conf.numberID:''" v-if="conf.isMultiSelect">{{ userSelected.length-hidden.length }}</span>
        <i :class="conf.rightIconCls?conf.rightIconCls:''" :id="conf.rightIconID?conf.rightIconID:''"></i>
        <div 
        :class="conf.dropdownMenuCls?conf.dropdownMenuCls:''" 
        :id="conf.dropdownMenuID?conf.dropdownMenuID:''">
            <label v-if="conf.isMultiSelect && !conf.hideSelectAll" v-show="!(conf.enableMinSelection && data.length === 1)" :class="conf.listItemCls?conf.listItemCls:''" :id="conf.listItemID?conf.listItemID:''" :key="name+'showall'">
                <input class="" type="checkbox" :checked="userSelected.length == data.length" @change="selectAll($event.currentTarget.checked)">
                <span>Select All</span>
            </label>
            <label 
            :class="(conf.listItemCls?conf.listItemCls:'')+(hidden.indexOf(listItem) > -1?' hidden': '')" 
            :id="conf.listItemID?conf.listItemID:''" 
            v-for="(listItem, index) in data" 
            :key="name+''+index">
                <input 
                :class="!conf.isMultiSelect ? 'invisible' : ''" 
                :type="!conf.isMultiSelect ? 'radio' : 'checkbox'" 
                :name="!conf.isMultiSelect ? 'invisible'+name : ''" 
                v-model="userSelected" 
                :value="(itemValue ? listItem[itemValue] : listItem)"
                :disabled="conf.isMultiSelect && conf.enableMinSelection && data.length === 1"
                @change="change">
                <span>{{ (itemText ? listItem[itemText] : listItem) }}</span>
            </label>
        </div>
    </div>
    `,
    props: {
        conf : { type: Object, 
            default: {
                "rootCls": "",
                "rootID": "",
                "leftIconCls": "",
                "leftIconID": "",
                "txtCls": "",
                "txtID": "",
                "numberCls": "",
                "numberID": "",
                "rightIconCls": "",
                "rightIconID": "",
                "dropdownMenuCls": "",
                "dropdownMenuID": "",
                "listItemCls": "",
                "listItemID": "",
                "isMultiSelect": false,
                "defaultTitle": "",
                "title": ""
            }
        },
        data : { type: Array, default: [] },
        hidden : { type: Array, default: [] },
        selected : [Array, Object, String],
        itemText : {type: String, default: null },
        itemValue : {type: String, default: null },
        name: {type: String, default: "list"}
    },
  
    data: () => ({
        userSelected: undefined,
        showTitle : true,
        showSelected : false,
        showDropdownElement :false
    }),
    methods: {
        change: function() {
            this.$emit('inputchange', this.userSelected);
            this.showDropdownElement = false;
        },
        selectAll: function(isChecked) {
            if(isChecked) {
                this.userSelected = this.data;
            } else {
                this.userSelected = this.hidden;
            }
            this.change();
        },
        showDropdown(flag){
            this.showDropdownElement = flag;
        },
        stopHide(){
            this.showDropdown(true);
            if(this.timer) {
                clearTimeout(this.timer);
            }
        },  
        startHide(){
            if(this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.showDropdown(false);
            }, 250);
        }
    },
    watch: {
        selected() {
            this.userSelected = this.selected;
            if(this.conf.showSelected && this.selected[0].length){
                this.showTitle = false;
                this.showSelected = true; 
            }
            else{
                this.showTitle = true;
                this.showSelected = false;
            } 
        }
    },
    created(){
        this.userSelected = this.selected;
        if(this.conf.showSelected && this.selected[0].length){
            this.showTitle = false;
            this.showSelected = true; 
        }
        else{
            this.showTitle = true;
            // this.showSelected = false;
        }
    },
    emits: ["inputchange"] ,
    computed: {
        getTitle: function() {
            this.userSelected = this.userSelected == undefined ? (this.conf.isMultiSelect ? [] : {}) : this.userSelected; 
            if((this.conf.isMultiSelect && this.userSelected.length == 0) || (!this.conf.isMultiSelect && Object.keys(this.userSelected).length == 0)) {
                return this.conf.defaultTitle;
            }
            return (this.conf.title && this.conf.title != "" ? this.conf.title : (!this.conf.isMultiSelect ? (this.itemText ? this.userSelected[this.itemText] : this.userSelected) : ""));
        },
        getSelected: function(){
            // this.userSelected = this.userSelected == undefined 
            if(!this.showTitle){
                return (!this.conf.isMultiSelect) ? this.userSelected :""
            }
        }
    }	
  
};
