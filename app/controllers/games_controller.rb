class GamesController < ApplicationController
  include Crudatable

  def resource_params
    permitted_params = params.require(:game).permit(:allowed_params)
    permitted_params[:owner_id] = current_user.id
    permitted_params
  end

  def allowed_params
    [:name, :owner_id]
  end
end
