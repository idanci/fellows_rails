class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :name
      t.decimal :hours
      t.text :comment
      t.boolean :urgent

      t.timestamps null: false
    end
  end
end
