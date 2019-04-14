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
      name: "<LC1_COLLECTION>_list",
      collection: "<LC_COLLECTION>",
      filter: "{}",
      options: '{  "sort": { "name": 1 } }'
    },
    {
      name: "<LC1_COLLECTION>_empty",
      collection: "<LC_COLLECTION>",
      filter: '{ "_id": null }',
      find_one: true
    },
    {
      name: "<LC1_COLLECTION>_details",
      collection: "<LC_COLLECTION>",
      find_one: true,
      filter: '{ "_id": ":<LC1_COLLECTION>Id" }',
      options: "{}"
    }
  ],
  fkeys: {
    input: "select",
    lookup_query_name: "<LC1_JOINCOLLECTION>_list",
    lookup_field: "name",
    lookup_key: "_id",
    show_in_dataview: false,
    show_in_read_only_form: false,
    exportable: false,

    join_collection: "<LC_JOINCOLLECTION>",
    join_fields: ["name"],
    join_container: "<LC1_JOINCOLLECTION>"
  },
  fkeyDisplay: {
    name: "<LC1_FOREIGNTABLE>.name",
    title: "<1_FOREIGNTABLE>",
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
        text_if_empty: "I'm sorry, there are no <LC_COLLECTION> :(",
        query_name: "<LC1_COLLECTION>_list",
        page_size: 20,
        insert_route: "<LC_COLLECTION>.insert",
        edit_route: "<LC_COLLECTION>.edit",
        edit_route_params: [{ name: "<LC1_COLLECTION>Id", value: "this._id" }],
        details_route: "<LC_COLLECTION>.details",
        details_route_params: [
          { name: "<LC1_COLLECTION>Id", value: "this._id" }
        ]
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
            query_name: "<LC1_COLLECTION>_empty",
            submit_route: "<COLLECTION>",
            cancel_route: "<COLLECTION>"
          }
        ]
      },
      {
        name: "details",
        route_params: ["<LC1_COLLECTION>Id"],
        components: [
          {
            name: "details_form",
            type: "form",
            mode: "read_only",
            title: "Details",
            query_name: "<LC1_COLLECTION>_details",
            close_route: "<COLLECTION>",
            back_route: "<COLLECTION>"
          }
        ]
      },

      {
        name: "edit",
        route_params: ["<LC1_COLLECTION>Id"],
        components: [
          {
            name: "edit_form",
            type: "form",
            mode: "update",
            title: "Edit <COLLECTION>",
            submit_route: "<COLLECTION>",
            cancel_route: "<COLLECTION>",
            query_name: "<LC1_COLLECTION>_details"
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
    login_with_github: true,
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
