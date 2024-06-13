class PlayerCardsSerializer < ActiveModel::Serializer
  attributes :id, :player_id, :card_id, :morphed, :tapped, :zone, :current_holder_id, :card_attached_id
  attribute :image_url

  def image_url
    object.card.image_url
  end
end
