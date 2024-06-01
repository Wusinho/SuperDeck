class CreateCardsServices
  def self.perform
    csv_file_path = 'app/assets/sheets/superdeckdiego.csv'
    CSV.foreach(csv_file_path, headers: true, col_sep: ',') do |row|
      Card.create!(name: row['NAME'])
    end
  end
end