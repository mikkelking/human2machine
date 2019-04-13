// app-template.js
const kitchenTemplates = {
  // Use this when creating a new collection
  collection: {
    fields: [],
    owner_field: "ownerId",
    roles_allowed_to_read: ["admin", "viewer", "editor"],
    roles_allowed_to_update: ["admin", "editor"],
    roles_allowed_to_delete: ["admin"]
  },
  queries: [
    {
      name: "<COLLECTION>_list",
      collection: "<COLLECTION>",
      filter: {},
      options: { sort: { name: 1 } }
    },
    {
      name: "<COLLECTION>_empty",
      collection: "<COLLECTION>",
      filter: { _id: null },
      find_one: true
    },
    {
      name: "<COLLECTION>_details",
      collection: "<COLLECTION>",
      find_one: true,
      filter: '{ _id: ":<COLLECTION>Id" }',
      options: {}
    }
  ],
  fkeys: {
    input: "select",
    lookup_query_name: "<COLLECTION>_list",
    lookup_field: "name",
    lookup_key: "_id",
    show_in_dataview: false,
    show_in_read_only_form: false,
    exportable: false,

    join_collection: "<COLLECTION>",
    join_fields: ["name"],
    join_container: "<COLLECTION>"
  },
  // The main structure
  application: {
    packages: {
      meteor: [],
      npm: []
    },
    collections: [],
    queries: [],
    public_zone: {
      pages: [],
      // Menu items
      components: [
        {
          name: "main_menu",
          type: "menu",
          class: "nav navbar-nav",
          items: []
        }
      ]
    },
    private_zone: {
      pages: [],
      // Menu items
      components: [
        {
          name: "main_menu",
          type: "menu",
          class: "nav navbar-nav",
          items: []
        }
      ]
    }
  }
};

module.exports = kitchenTemplates;
