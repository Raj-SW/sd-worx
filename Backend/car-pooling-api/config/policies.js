module.exports.policies = {
  "*": ["is-valid-app", "is-valid-user"],

  "user/login": "is-valid-app",
  "user/create": "is-valid-app",
}