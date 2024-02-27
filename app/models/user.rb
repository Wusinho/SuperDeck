class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def self.ransackable_attributes(auth_object = nil)
    # List of all attributes you want to be searchable
    super - %w[encrypted_password reset_password_token password_reset_token owner]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
