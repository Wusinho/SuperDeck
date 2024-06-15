class SpecialActionsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "special_actions_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def special_action(data)
    p '*'*100
    pc = PlayerCard.find(data['card_id'])
    pc.update(zone: 'play_zone', current_holder_id: data['current_player_id'])

    information = {
      current_holder_id: data['current_holder_id'],
      current_player_id: data['current_player_id'],
      card_id: data['card_id'],
      old_zone: data['zone'],
      new_zone: 'play_zone',
    }

    ActionCable.server.broadcast("special_actions_channel", information)
  end
end
