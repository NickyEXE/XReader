class AddDefaultValueToScores < ActiveRecord::Migration[5.2]
  def change
    change_column :scores, :score, :integer, :default => 0
  end
end
