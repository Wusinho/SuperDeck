class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :game_id, :life, :username, :order
  attribute :cards

  def cards
    object.player_cards.group_by(&:zone).transform_values do |cards|
      ActiveModel::SerializableResource.new(cards, each_serializer: PlayerCardsSerializer).as_json
    end
  end
end
