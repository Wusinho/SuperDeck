class CardServices
  API_ENDPOINT = ENV['MAGIC']

  def self.perform
    Card.where(image_url: nil).limit(500).each do |card|
      response = Faraday.get(API_ENDPOINT, { name: card.name })
      if response.status == 200
        data = JSON.parse(response.body)
        cards = data['cards']
        if cards.any?
          card_data = cards[0]

          if card_data['imageUrl'].present?
            cloudinary_response = Cloudinary::Uploader.upload(card_data['imageUrl'])

            # Update card with Cloudinary URL and image ID
            card.update_columns(
              types: card_data['type'],
              text: card_data['text'],
              mana_cost: card_data['manaCost'],
              rarity: card_data['rarity'],
              image_url: cloudinary_response['secure_url'],
              img_id: cloudinary_response['public_id']  # Use 'public_id' instead of 'id'
            )
            puts "#{card.name} saved!."
          else
            puts "No image URL found for #{card.name}."
          end
        else
          puts "No cards found for #{card.name}."
        end
      else
        puts "Error fetching data: #{response.status}"
      end

      # Delay of 1 second between each request
      sleep 1
    end
  end
end
