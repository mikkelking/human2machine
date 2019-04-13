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
  // The main structure
  application: {
    packages: {
      meteor: [],
      npm: []
    },
    collections: [],
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
