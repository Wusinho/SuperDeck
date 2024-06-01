class CleanCardNameServices
  def self.perform
    Card.find_each do |card|
      cleaned_name = clean_name(card.name)
      if cleaned_name != card.name
        card.update(name: cleaned_name)
        puts "Updated card name from '#{card.name}' to '#{cleaned_name}'"
      end
    end
  end

  private

  def self.clean_name(name)
    name.gsub(/\u00A0/, '').gsub(/\s*\.\s*$/, '').strip
  end
end
