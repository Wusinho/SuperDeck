class GameActionsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_actions_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def morphed_from_hand(data)
    pc = PlayerCard.find_by(id: data['card_id'])
    old_zone = pc.zone
    pc.update(morphed: data['morphed'], zone: PlayerCard.zones[data['new_zone'].to_sym] )
    pc = PlayerCard.find_by(id: data['card_id'])

    information = {
      current_holder_id: pc.current_holder_id,
      old_zone: old_zone,
      new_zone: pc.zone,
      player_card_id: pc.id,
      morphed: pc.morphed,
      tapped: pc.tapped,
    }
    ActionCable.server.broadcast("game_actions_channel", information)
  end

  def change_state(data)
    pc = PlayerCard.find_by(id: data['card_id'])
    olc_zone = pc.zone
    pc.update(tapped: data['tapped'], morphed: data['morphed'] )

    pc = PlayerCard.find_by(id: data['card_id'])

    information = {
      current_holder_id: pc.current_holder_id,
      old_zone: olc_zone,
      new_zone: pc.zone,
      player_card_id: pc.id,
      morphed: pc.morphed,
      tapped: pc.tapped,
    }

    ActionCable.server.broadcast("game_actions_channel", information)
  end

  def change_zone(data)
    pc = PlayerCard.find_by(id: data['card_id'])
    old_zone = pc.zone
    pc.update(zone: PlayerCard.zones[data['new_zone'].to_sym], current_holder_id:  data['current_holder_id'])
    pc = PlayerCard.find_by(id: data['card_id'])

    information = {
      current_holder_id: pc.current_holder_id,
      old_zone: old_zone,
      new_zone: pc.zone,
      player_card_id: pc.id,
      morphed: pc.morphed,
      tapped: pc.tapped,
    }

    ActionCable.server.broadcast("game_actions_channel", information)
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
