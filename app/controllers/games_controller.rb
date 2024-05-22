class GamesController < ApplicationController
  include Crudatable
  include ActionView::RecordIdentifier

  def show
    if !@resource.user_in_game?(current_user.id)
      players = @resource.game_configuration.players - 1
      positions = Array(0..players) - @resource.players.pluck(:order)

      Player.create(user_id: current_user.id, game_id: @resource.id, order: positions.sample)
    else
      redirect_to games_path
    end
  end

  def new
    @resource = Game.new
    @resource.build_game_configuration
  end

  def resource_params
    permitted_params = params.require(:game).permit(*allowed_params)
    permitted_params[:owner_id] = current_user.id
    permitted_params
  end

  def allowed_params
    [
      :name,
      :owner_id,
      game_configuration_attributes: [:players, :deck_size]
    ]
  end
end
