class SpecialActionsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "special_actions_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def special_action(data)
    pc = PlayerCard.find(data['player_card_id'])
    pc.update(zone: PlayerCard.zones['play_zone'.to_sym],
              current_holder_id: data['current_player_id'])
    pc = PlayerCard.find(data['player_card_id'])

    information = {
      current_holder_id: pc.current_holder_id,
      former_holder_id: data['current_holder_id'],
      owner_id: pc.owner_id,
      player_card_id: pc.id,
      old_zone: data['zone'],
      new_zone: 'play_zone',
    }

    ActionCable.server.broadcast("special_actions_channel", information)
  end
end
