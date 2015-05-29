json.array!(@todos) do |todo|
  json.extract! todo, :id, :name, :hours, :comment, :urgent
  json.url todo_url(todo, format: :json)
end
