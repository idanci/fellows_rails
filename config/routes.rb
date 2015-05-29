Rails.application.routes.draw do
  resources :todos
  root 'dashboards#index'

  scope constraints: ->(request) { request.get? && request.headers['X-Requested-With'].nil? } do
    get "/(*params)" => 'dashboards#index'
  end
end
