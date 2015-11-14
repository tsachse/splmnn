class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.string :name
      t.float :start
      t.float :stop
      t.integer :medium_id
    end
  end
end
