# frozen_string_literal: true
module Api
  module V1
    class PetsController < ApplicationController

      def index
        @pets = Pet.filter(filtering_params).order(:featured, :name)
        render json: @pets, status: :ok
      end

      private

      def filtering_params
        params.permit(:species, :page)
      end
    end
  end
end
