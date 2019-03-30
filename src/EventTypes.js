export const eventTypes = {
    "flow.activated": {
        "name": "Flow activated",
        "description": "A flow version was set as the active one"
    },
    // "flow.deactivated": {
    //   "name": "",
    //   "description": ""
    // },
    "flow.initialized": {
        "name": "Flow initialized",
        "description": "A flow was initialized, probably also creating a new state unless an initialization error occurred"
    },
    // "flow.loaded": {
    //   "name": "",
    //   "description": ""
    // },
    // "flow.package.exported": {
    //   "name": "",
    //   "description": ""
    // },
    // "flow.package.imported": {
    //   "name": "",
    //   "description": ""
    // },
    // "flow.package.shared": {
    //   "name": "",
    //   "description": ""
    // },
    // "flow.restriction.denied": {
    //   "name": "",
    //   "description": ""
    // },
    "flow.saved": {
      "name": "Flow saved",
      "description": "A flow was saved"
    },
    // "modelling.culture.deleted": {
    //   "name": "",
    //   "description": ""
    // },
    // "modelling.culture.loaded": {
    //   "name": "",
    //   "description": ""
    // },
    // "modelling.culture.saved": {
    //   "name": "",
    //   "description": ""
    // },
    // "modelling.element.created": {
    //   "name": "",
    //   "description": ""
    // },
    // "modelling.element.deleted": {
    //   "name": "",
    //   "description": ""
    // },
    "modelling.element.loaded": {
        "name": "Element loaded",
        "description": "An element was loaded, either via the API or from inside a running flow"
    },
    // "modelling.element.reverted": {
    //   "name": "",
    //   "description": ""
    // },
    // "modelling.element.saved": {
    //   "name": "",
    //   "description": ""
    // },
    // "modelling.element.snapshotted": {
    //   "name": "",
    //   "description": ""
    // },
    // "modelling.player.deleted": {
    //   "name": "",
    //   "description": ""
    // },
    // "modelling.player.loaded": {
    //   "name": "",
    //   "description": ""
    // },
    // "modelling.player.saved": {
    //   "name": "",
    //   "description": ""
    // },
    // "modelling.translations.loaded": {
    //   "name": "",
    //   "description": ""
    // },
    // "modelling.translations.saved": {
    //   "name": "",
    //   "description": ""
    // },
    // "serviceinvoker.failure": {
    //   "name": "",
    //   "description": ""
    // },
    "serviceinvoker.request": {
      "name": "Service invoker request",
      "description": "A request was made to an external service"
    },
    // "serviceinvoker.request.loaded": {
    //   "name": "",
    //   "description": ""
    // },
    "serviceinvoker.response": {
      "name": "Service invoker response",
      "description": "A response was received from an external service"
    },
    "state.created": {
        "name": "State created",
        "description": "A new state was created"
    },
    // "state.deleted": {
    //   "name": "",
    //   "description": ""
    // },
    // "state.expired": {
    //   "name": "",
    //   "description": ""
    // },
    "state.finished": {
      "name": "State finished",
      "description": "A state reached the final element in a branch"
    },
    "state.loaded": {
        "name": "State loaded",
        "description": "A state was loaded, either via the API or by accessing a running flow"
    },
    "state.updated": {
        "name": "State updated",
        "description": "A state was updated, meaning some kind of user interaction happened with it"
    },
    "state.value.changed": {
        "name": "State value changed",
        "description": "An existing value in a state was changed"
    },
    "state.value.created": {
        "name": "State value created",
        "description": "A new value was created in a state, meaning some data was assigned to it inside a running flow"
    },
    // "tenant.clearing.applied": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.clearing.requested": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.created": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.deletion.applied": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.deletion.requested": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.loaded": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.notification.loaded": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.saved": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.store.deleted": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.store.loaded": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.store.migration.requested": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.store.saved": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.user.added": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.user.denied": {
    //   "name": "",
    //   "description": ""
    // },
    "tenant.user.loaded": {
      "name": "Tenant user loaded",
      "description": "A user profile was loaded"
    },
    // "tenant.user.permissions.saved": {
    //   "name": "",
    //   "description": ""
    // },
    // "tenant.user.removed": {
    //   "name": "",
    //   "description": ""
    // },
    // "user.password.reset": {
    //   "name": "",
    //   "description": ""
    // },
    // "user.password.reset.applied": {
    //   "name": "",
    //   "description": ""
    // },
    // "user.login.draw": {
    //   "name": "",
    //   "description": ""
    // },
    // "user.login.draw.denied": {
    //   "name": "",
    //   "description": ""
    // },
    // "user.login.run": {
    //   "name": "",
    //   "description": ""
    // },
    // "user.login.run.denied": {
    //   "name": "",
    //   "description": ""
    // }
};

export function getEventType(type) {
    if (type in eventTypes) {
        return eventTypes[type];
    }

    console.warn(`No name could be found for the ${ type } event type`);

    return {
        "name": type,
        "description": ""
    };
}
