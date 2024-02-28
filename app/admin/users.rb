ActiveAdmin.register User do

  permit_params :password, :password_confirmation, :email, :nick_name

  filter :email
  filter :created_at
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at
  #
  # or
  #
  # permit_params do
  #   permitted = [:email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  form do |f|
    f.semantic_errors *f.object.errors.attribute_names

    f.inputs 'User Info' do
      f.input :email
      f.input :nick_name
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end

  
end
