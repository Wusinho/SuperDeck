class GamesController < ApplicationController
  include Crudatable
  include ActionView::RecordIdentifier

  def show
    unless @resource.user_in_game?(current_user)
      players = @resource.game_configuration.players - 1
      positions = Array(0..players) - @resource.players.pluck(:order)

      Player.create(user_id: current_user.id, game_id: @resource.id, order: positions.sample)
    end
  end

  def new
    @resource = Game.new
    @resource.build_game_configuration
  end

  def resource_params
    params.require(:game).permit(*allowed_params).merge(owner_id: current_user.id)
  end

  def allowed_params
    [
      :name,
      :owner_id,
      game_configuration_attributes: [:players, :deck_size]
    ]
  end
end
