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
      filter: "{}",
      options: '{  "sort": { "name": 1 } }'
    },
    {
      name: "<COLLECTION>_empty",
      collection: "<COLLECTION>",
      filter: '{ "_id": null }',
      find_one: true
    },
    {
      name: "<COLLECTION>_details",
      collection: "<COLLECTION>",
      find_one: true,
      filter: '{ "_id": ":<COLLECTION>Id" }',
      options: "{}"
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

    join_collection: "<JOINCOLLECTION>",
    join_fields: ["name"],
    join_container: "<JOINCOLLECTION>"
  },
  fkeyDisplay: {
    name: "<FOREIGNTABLE>.name",
    title: "<FOREIGNTABLE>",
    show_in_insert_form: false,
    show_in_update_form: false,
    exportable: true
  },
  // CRUD pages
  crud: {
    name: "<PAGE>",
    components: [
      {
        name: "view",
        type: "data_view",
        title: "<COLLECTION>",
        text_if_empty: "No <COLLECTION> :(",
        query_name: "<COLLECTION>_list",
        page_size: 20,
        insert_route: "<COLLECTION>.insert",
        edit_route: "<COLLECTION>.edit",
        edit_route_params: [{ name: "<COLLECTION>Id", value: "this._id" }],
        details_route: "<COLLECTION>.details",
        details_route_params: [{ name: "<COLLECTION>Id", value: "this._id" }]
      }
    ],

    pages: [
      {
        name: "insert",
        components: [
          {
            name: "insert_form",
            type: "form",
            mode: "insert",
            title: "New <COLLECTION>",
            query_name: "<COLLECTION>_empty",
            submit_route: "<COLLECTION>",
            cancel_route: "<COLLECTION>"
          }
        ]
      },
      {
        name: "details",
        route_params: ["<COLLECTION>Id"],
        components: [
          {
            name: "details_form",
            type: "form",
            mode: "read_only",
            title: "Details",
            query_name: "<COLLECTION>_details",
            close_route: "<COLLECTION>",
            back_route: "<COLLECTION>"
          }
        ]
      },

      {
        name: "edit",
        route_params: ["<COLLECTION>Id"],
        components: [
          {
            name: "edit_form",
            type: "form",
            mode: "update",
            title: "Edit <COLLECTION>",
            submit_route: "<COLLECTION>",
            cancel_route: "<COLLECTION>",
            query_name: "<COLLECTION>_details"
          }
        ]
      }
    ]
  },
  // The main structure
  application: {
    packages: {
      meteor: [],
      npm: []
    },
    collections: [],
    roles: ["admin", "editor", "viewer"],
    templating: "react",
    // frontend: "materialize",
    queries: [],
    public_zone: {
      pages: [
        {
          name: "home_public",
          title: "",
          components: [
            {
              name: "home_jumbotron",
              title: "<APPTITLE>",
              type: "jumbotron",
              text: "<APPDESCRIPTION>",
              button_title: "Continue &raquo;",
              button_route: "login"
            }
          ]
        },
        { name: "login", template: "login" },
        { name: "register", template: "register" },
        { name: "forgot_password", template: "forgot_password" },
        {
          name: "reset_password",
          template: "reset_password",
          route_params: ["resetPasswordToken"]
        }
      ],

      components: [
        {
          name: "left_menu",
          type: "menu",
          class: "nav navbar-nav",
          dest_selector: "#menu",
          items: [{ title: "Home", route: "home_public" }]
        },

        {
          name: "right_menu",
          type: "menu",
          class: "nav navbar-nav navbar-right",
          dest_selector: "#menu",
          items: [
            { title: "Register", route: "register" },
            { title: "Login", route: "login" }
          ]
        }
      ]
    },
    private_zone: {
      pages: [
        {
          name: "home_private",
          title: "Welcome {{userFullName}}!",
          text: "Place for dashboard here..."
        }
      ],
      // Menu items
      components: [
        {
          name: "left_menu",
          type: "menu",
          class: "nav navbar-nav",
          dest_selector: "#menu",
          items: [{ title: "Home", route: "home_private" }]
        },
        {
          name: "right_menu",
          type: "menu",
          class: "nav navbar-nav navbar-right",
          dest_selector: "#menu",
          items: [
            {
              title: "{{userEmail}}",
              items: [
                { title: "Settings", route: "user_settings" },
                { title: "Logout", route: "logout" }
              ]
            }
          ]
        }
      ]
    }
  }
};

module.exports = kitchenTemplates;
