require "kemal"
require "./data_generator"

get "/" do |env|
  env.redirect "/50"
end

get "/:number" do |env|
  number = env.params.url["number"].to_i?
  ideas_JSON = number ? generator1(number) : [] of Idea
  render "views/ideas.ecr"
end

get "/data/fake:number" do |env|
  env.response.content_type = "application/json"
  number = env.params.url["number"].to_i?
  number ? generator1(number) : [] of Idea
end

Kemal.run