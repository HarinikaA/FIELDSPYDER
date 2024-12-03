var dropdown_controller = {
    template: `<dropdown-component :name="name" :conf="dropdownConfigs" :data="data" :item-text="itemText" :item-value="itemValue" :selected="selected" :hidden="hidden" @inputchange="change"></dropdown-component>`,

    props : {
        data: {type: Array, default: []},
        hidden: {type: Array, default: []},
        selected : [Array, Object, String],
        dropdownConfigs: {type: Object, required: true},
        itemText: {type: String, default: null},
        itemValue: {type: String, default: null},
        name: {type: String, default: "list"}
    },
  
    data: () => ({}),

    methods: {
        change: function(selected) {
            this.$emit("change", selected);
        }
    },
    emits: ["change"] ,

    created: function() {}
};