class GameActionsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_actions_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def morphed_from_hand(data)
    pc = PlayerCard.find_by(id: data['card_id'])
    p '*'*100
    p data['morphed']
    p '*'*100
    pc.update_columns(morphed: data['morphed'], zone: PlayerCard.zones[data['new_zone'].to_sym] )
    information = {
      player_id: pc.player_id,
      old_zone: data['old_zone'],
      new_zone: data['new_zone'],
      card_id: data['card_id'],
      morphed: data['morphed'],
      tapped: data['tapped'],
    }
    ActionCable.server.broadcast("game_actions_channel", information)
  end

  def change_state(data)
    pc = PlayerCard.find_by(id: data['card_id'])
    pc.update_columns(tapped: data['tapped'], morphed: data['morphed'] )

    information = {
      player_id: pc.player_id,
      old_zone: data['zone'],
      new_zone: data['zone'],
      card_id: data['card_id'],
      morphed: data['tapped'],
      tapped: data['morphed'],
    }

    ActionCable.server.broadcast("game_actions_channel", information)
  end

  def change_zone(data)
    pc = PlayerCard.find_by(id: data['card_id'])
    old_zone = pc.zone
    pc.update(zone: PlayerCard.zones[data['new_zone'].to_sym])
    information = {
      player_id: pc.player_id,
      old_zone: old_zone,
      new_zone: data['new_zone'],
      card_id: data['card_id'],
      morphed: pc.morphed,
      tapped: pc.tapped,
    }
    ActionCable.server.broadcast("game_actions_channel", information)
  end

  def data_recollected(player_card, from)
    {
      player_id: player_card.player_id,
      from: from,
      to: player_card.zone,
    }
  end

  def change_action(data)
    p '*'*100
    p "NOT IMPLEMENTED"
    p '*'*100
    # pc = PlayerCard.find_by(id: data['card_id'])
    # pc.update_column(:action, PlayerCard.actions[data['new_action'].to_sym])
    #
    # information = {
    #   player_id: pc.player_id,
    #   card_id: pc.id,
    #   action: data['new_action'],
    #   zone: data['zone']
    # }
    #
    # ActionCable.server.broadcast("game_actions_channel", information)

  end


  def update(data)
    p '*'*100
    p data
    p '*'*100
  end
end
