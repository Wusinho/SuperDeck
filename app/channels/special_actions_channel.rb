class SpecialActionsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "special_actions_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def return_to_owner_hand(data)

    # ActionCable.server.broadcast("special_actions_channel", information)
  end

  def player_actions(data)
    player_card_id = data['player_card_id']
    current_player_id = data['current_player_id']
    former_holder_id = data['current_holder_id']

    player_card = PlayerCard.find(player_card_id)

    player_card.update!(current_holder_id: current_player_id)

    information = {
      current_holder_id: player_card.current_holder_id,
      former_holder_id: former_holder_id,
      owner_id: player_card.owner_id,
      player_card_id: player_card.id,
      old_zone: data['old_zone'] || player_card.zone,
      new_zone: player_card.zone,
    }

    ActionCable.server.broadcast("special_actions_channel", information)
  end
end
