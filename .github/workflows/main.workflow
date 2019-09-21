workflow "Desplegar en Heroku" {
  on = "push"
  resolves = [
    "Release"
  ]
}

action "Instalar dependencias" {
  uses = "actions/npm@1.0.0"
  args = "install"
}

action "Login en Heroku" {
  uses = "actions/heroku@master"
  args = "container:login"
  needs = ["Instalar dependencias"]
  secrets = ["HEROKU_API_KEY"]
}

action "Pushear" {
  uses = "actions/heroku@master"
  args = "container:push -a ftcappbackend web"
  needs = ["Login en Heroku"]
  secrets = ["HEROKU_API_KEY"]
}

action "Release" {
  uses = "actions/heroku@master"
  needs = "Pushear"
  args = "container:release -a ftcappbackend web"
  secrets = ["HEROKU_API_KEY"]
}
