# frozen_string_literal: true

module Api
  module V1
    class PetsController < ApplicationController

      def index
        pets = Pet.all
        render json: pets, status: :ok
      end

    end
  end
end
